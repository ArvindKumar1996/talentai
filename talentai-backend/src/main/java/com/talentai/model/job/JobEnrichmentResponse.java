package com.talentai.model.job;

import java.util.List;

public class JobEnrichmentResponse {

    private String jobTitle;
    private String enrichedDescription;
    private List<String> skills;
    private List<String> responsibilities;

    public String getJobTitle() {
        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {
        this.jobTitle = jobTitle;
    }

    public String getEnrichedDescription() {
        return enrichedDescription;
    }

    public void setEnrichedDescription(String enrichedDescription) {
        this.enrichedDescription = enrichedDescription;
    }

    public List<String> getSkills() {
        return skills;
    }

    public void setSkills(List<String> skills) {
        this.skills = skills;
    }

    public List<String> getResponsibilities() {
        return responsibilities;
    }

    public void setResponsibilities(List<String> responsibilities) {
        this.responsibilities = responsibilities;
    }
}
