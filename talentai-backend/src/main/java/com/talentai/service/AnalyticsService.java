package com.talentai.service;

import com.talentai.model.analytics.AnalyticsSummary;
import com.talentai.model.analytics.ReportRow;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AnalyticsService {

    public AnalyticsSummary getAnalyticsSummary() {
        AnalyticsSummary summary = new AnalyticsSummary();
        summary.setTotalResumes(120);
        summary.setShortlisted(45);
        summary.setRejected(30);
        summary.setAverageScore(78.5);

        List<ReportRow> topCandidates = new ArrayList<>();
        ReportRow candidate = new ReportRow();
        candidate.setCandidateId("C101");
        candidate.setCandidateName("Alice");
        candidate.setScore(92.5);
        candidate.setStatus("Shortlisted");
        candidate.setInterviewDate("2025-09-15");
        topCandidates.add(candidate);

        summary.setTopCandidates(topCandidates);
        return summary;
    }

    public List<ReportRow> getReportRows() {
        return getAnalyticsSummary().getTopCandidates();
    }
}
