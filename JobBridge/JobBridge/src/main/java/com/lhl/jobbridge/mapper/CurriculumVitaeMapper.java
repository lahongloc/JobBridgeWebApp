package com.lhl.jobbridge.mapper;

import com.lhl.jobbridge.dto.response.CurriculumVitaeResponse;
import com.lhl.jobbridge.dto.response.JobFieldResponse;
import com.lhl.jobbridge.entity.CurriculumVitae;
import com.lhl.jobbridge.entity.JobField;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CurriculumVitaeMapper {
    CurriculumVitaeResponse toCurriculumVitaeResponse(CurriculumVitae curriculumVitae);
}
