package com.lhl.jobbridge.dto.request;

import com.lhl.jobbridge.entity.JobField;
import com.lhl.jobbridge.entity.JobLocation;
import com.lhl.jobbridge.entity.User;
import com.lhl.jobbridge.entity.WorkType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class JobPostRequest {
    String jobTitle;
    Integer hiringQuantity;
    String requiredExperience;
    Date applicationDueDate;
    String jobDescription;
    String requirements;
    String benefits;
    String detailedWorkplace;
    String requiredGender;
    String workType;
    String jobLocation;
    String jobField;
}
