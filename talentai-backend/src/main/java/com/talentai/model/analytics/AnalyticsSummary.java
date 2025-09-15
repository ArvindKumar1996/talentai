package com.talentai.model.analytics;

import java.util.List;

public class AnalyticsSummary {
    private int totalResumes;
    private int shortlisted;
    private int rejected;
    private double averageScore;
    private List<ReportRow> topCandidates;

    public int getTotalResumes() {
        return totalResumes;
    }

    public void setTotalResumes(int totalResumes) {
        this.totalResumes = totalResumes;
    }

    public int getShortlisted() {
        return shortlisted;
    }

    public void setShortlisted(int shortlisted) {
        this.shortlisted = shortlisted;
    }

    public int getRejected() {
        return rejected;
    }

    public void setRejected(int rejected) {
        this.rejected = rejected;
    }

    public double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(double averageScore) {
        this.averageScore = averageScore;
    }

    public List<ReportRow> getTopCandidates() {
        return topCandidates;
    }

    public void setTopCandidates(List<ReportRow> topCandidates) {
        this.topCandidates = topCandidates;
    }
}
