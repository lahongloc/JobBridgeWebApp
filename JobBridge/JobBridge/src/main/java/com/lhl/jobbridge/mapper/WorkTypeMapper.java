package com.lhl.jobbridge.mapper;

import com.lhl.jobbridge.dto.response.WorkTypeResponse;
import com.lhl.jobbridge.entity.WorkType;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface WorkTypeMapper {
    WorkTypeResponse toWorkTypeResponse(WorkType workType);
}
