package com.talentai.controller;

import com.talentai.model.analytics.AnalyticsSummary;
import com.talentai.model.analytics.ReportRow;
import com.talentai.service.AnalyticsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/summary")
    public AnalyticsSummary getSummary() {
        return analyticsService.getAnalyticsSummary();
    }

    @GetMapping("/report")
    public List<ReportRow> getReport() {
        return analyticsService.getReportRows();
    }
}
