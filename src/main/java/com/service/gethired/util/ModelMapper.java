package com.service.gethired.util;

import com.service.gethired.model.Job;
import com.service.gethired.model.User;
import com.service.gethired.payload.UserSummary;
import com.service.gethired.payload.JobResponse;

import java.time.Instant;

public class ModelMapper {
    public static JobResponse mapJobToJobResponse(Job job, User creator) {
        JobResponse jobResponse = new JobResponse();
        jobResponse.setId(job.getId());
        jobResponse.setJobListingName(job.getJobListingName());
        jobResponse.setLink(job.getLink());
        jobResponse.setCompany(job.getCompany());
        jobResponse.setReferral(job.getReferral());
        jobResponse.setStatus(job.getStatus());
        jobResponse.setTags(job.getTags());
        jobResponse.setCreationDateTime(job.getCreatedAt());
        Instant now = Instant.now();
        jobResponse.setExpired(job.getExpirationDate().isBefore(now));
        jobResponse.setExpirationDateTime(job.getExpirationDate());
        System.out.println(creator.getEmail());
        UserSummary creatorSummary = new UserSummary(creator.getId(), creator.getUsername(), creator.getName());
        jobResponse.setCreatedBy(creatorSummary);

        return jobResponse;
    }
}
