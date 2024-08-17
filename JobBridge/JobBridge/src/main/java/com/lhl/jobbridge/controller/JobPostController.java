package com.lhl.jobbridge.controller;


import com.lhl.jobbridge.dto.request.ApiResponse;
import com.lhl.jobbridge.dto.request.JobPostRequest;
import com.lhl.jobbridge.dto.response.JobFieldResponse;
import com.lhl.jobbridge.dto.response.JobPostResponse;
import com.lhl.jobbridge.service.JobFieldService;
import com.lhl.jobbridge.service.JobPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/jobPosts")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class JobPostController {
    JobPostService jobPostService;

    @PostMapping
    ApiResponse<JobPostResponse> createJobPost(@RequestBody JobPostRequest request) {
        return ApiResponse.<JobPostResponse>builder()
                .result(this.jobPostService.createJobPost(request))
                .build();
    }

//    @GetMapping("/get-by-user/page={pageNumber}")
//    ApiResponse<List<JobPostResponse>> getByUser(@PathVariable int pageNumber) {
//        return ApiResponse.<List<JobPostResponse>>builder()
//                .result(this.jobPostService.getJobPostsByRecruiter())
//                .build();
//    }

    @GetMapping("/get-by-user/page={pageNumber}&size={pageSize}")
    ApiResponse<Page<JobPostResponse>> getByUser(
            @PathVariable int pageNumber,
            @PathVariable int pageSize) {
        return ApiResponse.<Page<JobPostResponse>>builder()
                .result(this.jobPostService.getJobPostsByRecruiter(pageNumber, pageSize))
                .build();
    }

}
