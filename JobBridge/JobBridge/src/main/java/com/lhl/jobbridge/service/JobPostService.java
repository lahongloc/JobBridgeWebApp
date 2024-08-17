package com.lhl.jobbridge.service;

import com.lhl.jobbridge.dto.request.JobPostRequest;
import com.lhl.jobbridge.dto.response.JobPostResponse;
import com.lhl.jobbridge.entity.*;
import com.lhl.jobbridge.exception.AppException;
import com.lhl.jobbridge.exception.ErrorCode;
import com.lhl.jobbridge.mapper.JobPostMapper;
import com.lhl.jobbridge.repository.*;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.data.domain.Pageable;


import java.util.Date;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class JobPostService {
    JobPostRepository jobPostRepository;
    WorkTypeRepository workTypeRepository;
    JobLocationRepositoty jobLocationRepositoty;
    JobFieldRepository jobFieldRepository;
    JobPostMapper jobPostMapper;
    UserRepository userRepository;

    @PreAuthorize("hasRole('RECRUITER')")
    public JobPostResponse createJobPost(JobPostRequest request) {
        var workType = this.workTypeRepository.
                findById(request.getWorkType())
                .orElseThrow(() -> new AppException(ErrorCode.WORKTYPE_NOT_FOUND));

        var jobLocation = this.jobLocationRepositoty
                .findById(request.getJobLocation())
                .orElseThrow(() -> new AppException(ErrorCode.JOBLOCATION_NOT_FOUND));

        var jobField = this.jobFieldRepository
                .findById(request.getJobField())
                .orElseThrow(() -> new AppException(ErrorCode.JOBFIELD_NOT_FOUND));

        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = this.userRepository.findByEmail(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        JobPost jobPost = this.jobPostMapper.toJobPost(request);
        jobPost.setWorkType(workType);
        jobPost.setJobLocation(jobLocation);
        jobPost.setJobField(jobField);
        jobPost.setUser(user);
        jobPost.setCreatedDate(new Date());
        this.jobPostRepository.save(jobPost);

        return this.jobPostMapper.toJobPostResponse(jobPost);
    }

    @PreAuthorize("hasRole('RECRUITER')")
    public Page<JobPostResponse> getJobPostsByRecruiter(int pageNumber, int pageSize) {
        var context = SecurityContextHolder.getContext();
        String name = context.getAuthentication().getName();

        User user = this.userRepository.findByEmail(name)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // Điều chỉnh pageNumber để bắt đầu từ 0
        Pageable pageable = PageRequest.of(pageNumber - 1, pageSize);
        return this.jobPostRepository.findByUser(user, pageable)
                .map(this.jobPostMapper::toJobPostResponse);
    }
}
