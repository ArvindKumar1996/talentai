package com.talentai.model.resume;

public class ScreeningResponse {
    private String candidateId;
    private double fitScore; // 0.0 to 1.0
    private String summary;

    public String getCandidateId() { return candidateId; }
    public void setCandidateId(String candidateId) { this.candidateId = candidateId; }

    public double getFitScore() { return fitScore; }
    public void setFitScore(double fitScore) { this.fitScore = fitScore; }

    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
}
