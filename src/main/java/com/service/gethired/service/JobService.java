package com.service.gethired.service;

import com.service.gethired.exception.BadRequestException;
import com.service.gethired.exception.ResourceNotFoundException;
import com.service.gethired.model.*;
import com.service.gethired.payload.PagedResponse;
import com.service.gethired.payload.JobRequest;
import com.service.gethired.payload.JobResponse;
import com.service.gethired.repository.UserRepository;
import com.service.gethired.repository.JobRepository;
import com.service.gethired.security.UserPrincipal;
import com.service.gethired.util.AppConstants;

import com.service.gethired.util.ModelMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import java.time.Duration;
import java.time.Instant;
import java.util.Collections;
import java.util.List;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private UserRepository userRepository;

    private static final Logger logger = LoggerFactory.getLogger(JobService.class);

    public PagedResponse<JobResponse> getJobsCreatedBy(String username, int page, int size) {
        validatePageNumberAndSize(page, size);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User", "username", username));

        Pageable pageable = PageRequest.of(page, size, Sort.Direction.DESC, "createdAt");
        Page<Job> jobs = jobRepository.findByCreatedBy(user.getId(), pageable);

        if(jobs.getNumberOfElements() == 0) {
            return new PagedResponse<>(Collections.emptyList(), jobs.getNumber(), jobs.getSize(),
                    jobs.getTotalElements(), jobs.getTotalPages(), jobs.isLast());
        }

        List<JobResponse> jobResponses = jobs.map(job -> ModelMapper.mapJobToJobResponse(job, user)).getContent();

        return new PagedResponse<>(jobResponses, jobs.getNumber(), jobs.getSize(),
                jobs.getTotalElements(), jobs.getTotalPages(), jobs.isLast());
    }

    public Job createJob(JobRequest jobRequest, UserPrincipal currentUser) {
        Job job = new Job();
        job.setJobListingName(jobRequest.getJobListingName());
        job.setLink((jobRequest.getLink()));
        job.setCompany(jobRequest.getCompany());
        job.setStatus((jobRequest.getStatus()));
        job.setReferral(jobRequest.getReferral());
        job.setCreatedBy(currentUser.getId());

        jobRequest.getTags().forEach(tagRequest -> job.addTag(new Tag(tagRequest.getTag())));

        Instant now = Instant.now();
        Instant expirationDateTime = now.plus(Duration.ofDays(jobRequest.getJobLength().getDays()))
                .plus(Duration.ofHours(jobRequest.getJobLength().getHours()));
        job.setExpirationDate(expirationDateTime);
        return jobRepository.save(job);
    }

    public JobResponse getJobById(Long jobId, UserPrincipal currentUser) {
        Job job = jobRepository.findById(jobId).orElseThrow(
                () -> new ResourceNotFoundException("Job", "id", jobId)
        );

        User creator = userRepository.findById(job.getCreatedBy())
                .orElseThrow(() -> new ResourceNotFoundException("User", "id", job.getCreatedBy()));

        return ModelMapper.mapJobToJobResponse(job, creator);
    }

    public Job updateJob(JobRequest updatedJob, Long id) {
        return jobRepository.findById(id)
                .map(job -> {
                    job.setJobListingName(updatedJob.getJobListingName());
                    job.setCompany(updatedJob.getCompany());
                    job.setReferral(updatedJob.getReferral());
                    job.setStatus(updatedJob.getStatus());
                    job.setLink(updatedJob.getLink());
                    return jobRepository.save(job);
                }).orElseThrow(() -> new ResourceNotFoundException("Job", "id", id));
    }

    public void deleteJob(Long id) {
        jobRepository.deleteById(id);
    }

    private void validatePageNumberAndSize(int page, int size) {
        if(page < 0) {
            throw new BadRequestException("Page number cannot be less than zero.");
        }

        if(size > AppConstants.MAX_PAGE_SIZE) {
            throw new BadRequestException("Page size must not be greater than " + AppConstants.MAX_PAGE_SIZE);
        }
    }
}
