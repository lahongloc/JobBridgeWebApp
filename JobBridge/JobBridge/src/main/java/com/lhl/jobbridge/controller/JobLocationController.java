package com.lhl.jobbridge.controller;


import com.lhl.jobbridge.dto.request.ApiResponse;
import com.lhl.jobbridge.dto.response.JobLocationResponse;
import com.lhl.jobbridge.service.JobLocationService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/jobLocations")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class JobLocationController {
    JobLocationService jobLocationService;

    @GetMapping
    ApiResponse<List<JobLocationResponse>> getAll() {
        return ApiResponse.<List<JobLocationResponse>>builder()
                .result(this.jobLocationService.getAll())
                .build();
    }

}
