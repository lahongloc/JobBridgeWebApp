package com.lhl.jobbridge.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobRecommendation {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    Double matchingPossibility;
    @ManyToOne
    CurriculumVitae curriculumVitae;
    @ManyToOne
    JobPost jobPost;
}
