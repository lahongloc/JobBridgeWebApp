package com.lhl.jobbridge.mapper;

import com.lhl.jobbridge.dto.response.JobFieldResponse;
import com.lhl.jobbridge.entity.JobField;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface JobFieldMapper {
    JobFieldResponse toJobFieldResponse(JobField jobField);
}
