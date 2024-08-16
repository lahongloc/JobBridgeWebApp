package com.lhl.jobbridge.service;

import com.lhl.jobbridge.dto.response.JobLocationResponse;
import com.lhl.jobbridge.entity.JobLocation;
import com.lhl.jobbridge.entity.WorkType;
import com.lhl.jobbridge.mapper.JobLocationMapper;
import com.lhl.jobbridge.repository.JobLocationRepositoty;
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
public class JobLocationService {
    JobLocationRepositoty jobLocationRepositoty;
    JobLocationMapper jobLocationMapper;

    public void saveJobLocationIfNotExists(JobLocation jobLocation) {
        if (!jobLocationRepositoty.existsByName(jobLocation.getName())) {
            jobLocationRepositoty.save(jobLocation);
        }
    }

    public void saveAllJobLocationsIfNotExists(List<JobLocation> jobLocations) {
        jobLocations.forEach(this::saveJobLocationIfNotExists);
    }

    public List<JobLocationResponse> getAll() {
        return this.jobLocationRepositoty.findAll().stream()
                .map(this.jobLocationMapper::toJobLocationResponse).toList();
    }
}
