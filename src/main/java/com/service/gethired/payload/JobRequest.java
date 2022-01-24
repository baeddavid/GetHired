package com.service.gethired.payload;

import com.service.gethired.model.Status;

import javax.validation.Valid;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.List;

public class JobRequest {
    @NotBlank
    private String jobListingName;

    @NotBlank
    private String link;

    @NotBlank
    private String company;

    private boolean referral;

    @NotNull
    private Status status;

    @Valid
    @Size(max = 6)
    private List<TagRequest> tags;

    @NotNull
    @Valid
    private JobLength jobLength;

    public String getJobListingName() {
        return jobListingName;
    }

    public void setJobListingName(String jobListingName) {
        this.jobListingName = jobListingName;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getCompany() {
        return company;
    }

    public void setCompany(String company) {
        this.company = company;
    }

    public boolean getReferral() {
        return referral;
    }

    public void setReferral(boolean referral) {
        this.referral = referral;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<TagRequest> getTags() {
        return tags;
    }

    public void setTags(List<TagRequest> tags) {
        this.tags = tags;
    }

    public JobLength getJobLength() {
        return jobLength;
    }

    public void setJobLength(JobLength jobLength) {
        this.jobLength = jobLength;
    }
}
