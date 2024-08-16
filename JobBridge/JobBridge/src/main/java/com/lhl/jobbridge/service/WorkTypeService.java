package com.lhl.jobbridge.service;

import com.lhl.jobbridge.dto.response.WorkTypeResponse;
import com.lhl.jobbridge.entity.WorkType;
import com.lhl.jobbridge.mapper.WorkTypeMapper;
import com.lhl.jobbridge.repository.WorkTypeRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class WorkTypeService {
    WorkTypeRepository workTypeRepository;
    WorkTypeMapper workTypeMapper;

    public void saveWorkTypeIfNotExists(WorkType workType) {
        if (!workTypeRepository.existsByName(workType.getName())) {
            workTypeRepository.save(workType);
        }
    }

    public void saveAllWorkTypesIfNotExists(List<WorkType> workTypes) {
        workTypes.forEach(this::saveWorkTypeIfNotExists);
    }

    public List<WorkTypeResponse> getAllWorkTypes() {
        return this.workTypeRepository.findAll().stream().map(workTypeMapper::toWorkTypeResponse).toList();
    }

}
