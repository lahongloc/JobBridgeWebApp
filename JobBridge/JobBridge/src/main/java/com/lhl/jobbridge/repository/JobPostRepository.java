package com.lhl.jobbridge.repository;

import com.lhl.jobbridge.entity.JobPost;
import com.lhl.jobbridge.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.domain.Pageable;

import java.util.List;

@Repository
public interface JobPostRepository extends JpaRepository<JobPost, String> {
//    List<JobPost> findByUser(User user);

    Page<JobPost> findByUser(User user, Pageable pageable);
}
