package com.lhl.jobbridge.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.lhl.jobbridge.entity.JobField;
import com.lhl.jobbridge.entity.JobLocation;
import com.lhl.jobbridge.entity.WorkType;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WorkTypeResponse {
    String id;
    String name;
}
