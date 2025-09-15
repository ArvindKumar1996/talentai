package com.talentai.model.resume;

import lombok.Data;

@Data
public class ResumeUploadResponse {
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
