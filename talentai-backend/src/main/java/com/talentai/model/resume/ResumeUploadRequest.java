package com.talentai.model.resume;

import lombok.Data;

@Data
public class ResumeUploadRequest {
    private String candidateName;
    private String email;

    public String getCandidateName() {
        return candidateName;
    }

    public void setCandidateName(String candidateName) {
        this.candidateName = candidateName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
