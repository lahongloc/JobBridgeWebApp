package com.lhl.jobbridge.helper;

import com.lhl.jobbridge.entity.JobPost;
import org.springframework.data.jpa.domain.Specification;

public class JobPostSpecifications {

    public static Specification<JobPost> jobTitleContains(String jobTitle) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.like(criteriaBuilder.lower(root.get("jobTitle")), "%" + jobTitle.toLowerCase() + "%");
    }

    public static Specification<JobPost> jobLocationEquals(String jobLocation) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(criteriaBuilder.lower(root.get("jobLocation").get("name")), jobLocation.toLowerCase());
    }

    public static Specification<JobPost> workTypeEquals(String workType) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(criteriaBuilder.lower(root.get("workType").get("name")), workType.toLowerCase());
    }

    public static Specification<JobPost> jobFieldEquals(String jobField) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(criteriaBuilder.lower(root.get("jobField").get("name")), jobField.toLowerCase());
    }
}
