package com.lhl.jobbridge.repository;

import com.lhl.jobbridge.entity.WorkType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface WorkTypeRepository extends JpaRepository<WorkType, String> {
    boolean existsByName(String name);
}
