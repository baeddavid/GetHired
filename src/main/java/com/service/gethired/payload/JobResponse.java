package com.service.gethired.payload;

import com.service.gethired.model.Status;
import com.service.gethired.model.Tag;

import java.time.Instant;
import java.util.List;

public class JobResponse {
    private Long id;
    private String jobListingName;
    private String link;
    private String company;
    private Boolean referral;
    private Status status;
    private List<Tag> tags;
    private UserSummary createdBy;
    private Instant creationDateTime;
    private Instant expirationDateTime;
    private Boolean isExpired;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public Boolean getReferral() {
        return referral;
    }

    public void setReferral(Boolean referral) {
        this.referral = referral;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public UserSummary getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(UserSummary createdBy) {
        this.createdBy = createdBy;
    }

    public Instant getCreationDateTime() {
        return creationDateTime;
    }

    public void setCreationDateTime(Instant creationDateTime) {
        this.creationDateTime = creationDateTime;
    }

    public Instant getExpirationDateTime() {
        return expirationDateTime;
    }

    public void setExpirationDateTime(Instant expirationDateTime) {
        this.expirationDateTime = expirationDateTime;
    }

    public Boolean getExpired() {
        return isExpired;
    }

    public void setExpired(Boolean expired) {
        isExpired = expired;
    }
}
