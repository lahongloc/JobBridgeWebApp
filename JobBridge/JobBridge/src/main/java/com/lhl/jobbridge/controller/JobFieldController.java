package com.lhl.jobbridge.controller;


import com.lhl.jobbridge.dto.request.ApiResponse;
import com.lhl.jobbridge.dto.response.JobFieldResponse;
import com.lhl.jobbridge.service.JobFieldService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/jobFields")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class JobFieldController {
    JobFieldService jobFieldService;

    @GetMapping
    ApiResponse<List<JobFieldResponse>> getAll() {
        return ApiResponse.<List<JobFieldResponse>>builder()
                .result(this.jobFieldService.getAll())
                .build();
    }

}
