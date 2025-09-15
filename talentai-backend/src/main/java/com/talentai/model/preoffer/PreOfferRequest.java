package com.talentai.model.preoffer;

import lombok.Data;

@Data
public class PreOfferRequest {
    private String candidateId;
    private String message;

    public String getCandidateId() {
        return candidateId;
    }

    public void setCandidateId(String candidateId) {
        this.candidateId = candidateId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
