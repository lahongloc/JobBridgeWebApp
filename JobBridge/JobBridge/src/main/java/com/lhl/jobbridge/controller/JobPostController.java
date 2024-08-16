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

}
