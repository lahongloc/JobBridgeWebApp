package com.lhl.jobbridge.controller;


import com.lhl.jobbridge.dto.request.ApiResponse;
import com.lhl.jobbridge.dto.request.CurriculumVitaeRequest;
import com.lhl.jobbridge.dto.request.JobPostRequest;
import com.lhl.jobbridge.dto.request.JobPostSearchRequest;
import com.lhl.jobbridge.dto.response.CurriculumVitaeResponse;
import com.lhl.jobbridge.dto.response.JobPostResponse;
import com.lhl.jobbridge.service.CurriculumVitaeService;
import com.lhl.jobbridge.service.JobPostService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/curriculumVitaes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CurriculumVitaeController {
    CurriculumVitaeService curriculumVitaeService;

    @PostMapping("/upload")
    ApiResponse<CurriculumVitaeResponse> upload(@ModelAttribute CurriculumVitaeRequest request) throws IOException {
        return ApiResponse.<CurriculumVitaeResponse>builder()
                .result(this.curriculumVitaeService.uploadCV(request))
                .build();
    }
}
