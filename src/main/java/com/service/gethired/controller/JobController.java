package com.service.gethired.controller;

import com.service.gethired.model.*;
import com.service.gethired.payload.*;
import com.service.gethired.security.CurrentUser;
import com.service.gethired.security.UserPrincipal;
import com.service.gethired.service.JobService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import javax.validation.Valid;
import java.net.URI;

@RestController
@RequestMapping("/api/jobs")
public class JobController {

    @Autowired
    private JobService jobService;

    private static final Logger logger = LoggerFactory.getLogger(JobController.class);

    @PostMapping
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> createJob(@Valid @RequestBody JobRequest jobRequest,
                                       @CurrentUser UserPrincipal currentUser) {
        Job job = jobService.createJob(jobRequest, currentUser);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/{jobId}")
                .buildAndExpand(job.getId()).toUri();

        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Job Created Succesfully"));
    }

    @GetMapping("/{jobId}")
    @PreAuthorize("hasRole('USER')")
    public JobResponse getJobById(@PathVariable Long jobId,
                                  @CurrentUser UserPrincipal currentUser) {
        return jobService.getJobById(jobId, currentUser);
    }

    @PutMapping("/{jobId}")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<?> updateJob(@Valid @RequestBody JobRequest updateRequest,
                                       @PathVariable Long jobId) {
        Job updatedJob = jobService.updateJob(updateRequest, jobId);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest().path("/update/{jobId}")
                .buildAndExpand(updatedJob.getId()).toUri();
        return ResponseEntity.created(location)
                .body(new ApiResponse(true, "Job updated Successfully"));
    }

    @DeleteMapping("/{jobId}")
    @PreAuthorize("hasRole('USER')")
    public void deleteJob(@PathVariable Long jobId) {
        jobService.deleteJob(jobId);
    }
}
