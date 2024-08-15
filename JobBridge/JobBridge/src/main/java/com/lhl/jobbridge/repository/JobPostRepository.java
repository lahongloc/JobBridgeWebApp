package com.lhl.jobbridge.repository;

import com.lhl.jobbridge.entity.JobPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, String> {
}
