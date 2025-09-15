package com.talentai.model.interview;

import lombok.Data;

@Data
public class InterviewResponse {
    private String candidateId;
    private String status;

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
