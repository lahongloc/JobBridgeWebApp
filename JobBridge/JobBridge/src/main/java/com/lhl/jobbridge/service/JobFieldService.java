package com.lhl.jobbridge.service;

import com.lhl.jobbridge.dto.response.JobFieldResponse;
import com.lhl.jobbridge.entity.JobField;
import com.lhl.jobbridge.entity.JobPost;
import com.lhl.jobbridge.entity.WorkType;
import com.lhl.jobbridge.mapper.JobFieldMapper;
import com.lhl.jobbridge.repository.JobFieldRepository;
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
public class JobFieldService {
    JobFieldRepository jobFieldRepository;
    JobFieldMapper jobFieldMapper;

    public void saveJobFieldIfNotExists(JobField jobField) {
        if (!jobFieldRepository.existsByName(jobField.getName())) {
            jobFieldRepository.save(jobField);
        }
    }

    public void saveAllJobFieldsIfNotExists(List<JobField> jobFields) {
        jobFields.forEach(this::saveJobFieldIfNotExists);
    }

    public List<JobFieldResponse> getAll() {
        return this.jobFieldRepository.findAll().stream().map(this.jobFieldMapper::toJobFieldResponse).toList();
    }
}
