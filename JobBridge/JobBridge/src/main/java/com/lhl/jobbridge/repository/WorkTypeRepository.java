package com.lhl.jobbridge.repository;

import com.lhl.jobbridge.entity.WorkType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkTypeRepository extends JpaRepository<WorkType, String> {
}
