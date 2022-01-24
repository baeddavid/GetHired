package com.service.gethired.model;

import com.service.gethired.model.audit.UserDateAudit;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "jobs")
public class Job extends UserDateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String jobListingName;

    @NotBlank
    private String link;

    @NotBlank
    private String company;

    private boolean referral;

    @NotNull
    private Status status;

    @OneToMany(
            mappedBy = "job",
            cascade = CascadeType.ALL,
            fetch = FetchType.EAGER,
            orphanRemoval = true
    )
    @Size(max = 6)
    @Fetch(FetchMode.SELECT)
    @BatchSize(size = 30)
    private List<Tag> tags = new ArrayList<>();

    @NotNull
    private Instant expirationDate;

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

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public Instant getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Instant expirationDate) {
        this.expirationDate = expirationDate;
    }

    public void addTag(Tag tag) {
        tags.add(tag);
        tag.setJob(this);
    }

    public void removeTag(Tag tag) {
        tags.remove(tag);
        tag.setJob(this);
    }
}
