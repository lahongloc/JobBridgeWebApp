package com.lhl.jobbridge.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;
import java.util.Set;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobPost {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    String id;
    String jobTitle;
    Integer hiringQuantity;
    String requiredExperience;
    Date createdDate;
    Date applicationDueDate;
    String jobDescription;
    String requirements;
    String benefits;
    String detailedWorkplace;
    String requiredGender;
    String salaryRange;
    @ManyToOne
    WorkType workType;
    @ManyToOne
    JobLocation jobLocation;
    @ManyToOne
    JobField jobField;
    @ManyToOne
    User user;
}
