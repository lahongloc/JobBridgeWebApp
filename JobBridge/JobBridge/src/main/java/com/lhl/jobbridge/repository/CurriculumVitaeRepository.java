package com.lhl.jobbridge.repository;

import com.lhl.jobbridge.entity.CurriculumVitae;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CurriculumVitaeRepository extends JpaRepository<CurriculumVitae, String> {
}
