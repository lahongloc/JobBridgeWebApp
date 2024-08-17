package com.lhl.jobbridge.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lhl.jobbridge.entity.JobField;
import com.lhl.jobbridge.entity.JobLocation;
import com.lhl.jobbridge.entity.User;
import com.lhl.jobbridge.entity.WorkType;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.Date;
import java.util.Set;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class JobPostResponse {
    String jobTitle;
    Integer hiringQuantity;
    String requiredExperience;
    Date applicationDueDate;
    String jobDescription;
    Date createdDate;
    String requirements;
    String salaryRange;
    String benefits;
    String detailedWorkplace;
    String requiredGender;
    WorkType workType;
    JobLocation jobLocation;
    JobField jobField;
    UserResponse user;
}
