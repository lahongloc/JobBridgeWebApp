package com.lhl.jobbridge.controller;

import com.lhl.jobbridge.dto.request.ApiResponse;
import com.lhl.jobbridge.dto.response.WorkTypeResponse;
import com.lhl.jobbridge.service.WorkTypeService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/workTypes")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WorkTypeController {
    WorkTypeService workTypeService;

    @GetMapping
    ApiResponse<List<WorkTypeResponse>> getAll() {
        return ApiResponse.<List<WorkTypeResponse>>builder()
                .result(this.workTypeService.getAllWorkTypes())
                .build();
    }
}
