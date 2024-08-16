package com.lhl.jobbridge.mapper;

import com.lhl.jobbridge.dto.response.JobLocationResponse;
import com.lhl.jobbridge.entity.JobLocation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface JobLocationMapper {
    JobLocationResponse toJobLocationResponse(JobLocation jobLocation);
}
