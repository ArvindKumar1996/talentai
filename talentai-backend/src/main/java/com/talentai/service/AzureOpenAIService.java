package com.talentai.service;

import com.talentai.config.AzureOpenAIConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class AzureOpenAIService {

    @Autowired
    private AzureOpenAIConfig azureConfig;

    private final RestTemplate restTemplate = new RestTemplate();

    // Chat completion
    public String getChatCompletion(String message) {
        String url = azureConfig.getChatEndpoint() + "/openai/deployments/" +
                azureConfig.getChatDeployment() + "/chat/completions?api-version=" +
                azureConfig.getChatApiVersion();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", azureConfig.getChatKey());

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("messages", List.of(Map.of("role", "user", "content", message)));
        requestBody.put("temperature", 1); // Fixed: Use supported value

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            Map response = restTemplate.postForObject(url, entity, Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.get("choices");
            if (choices != null && !choices.isEmpty()) {
                Map<String, Object> messageObj = (Map<String, Object>) choices.get(0).get("message");
                return (String) messageObj.get("content");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error calling Azure OpenAI: " + e.getMessage();
        }
        return "No response from model.";
    }

    // Embedding generation
    public List<Double> getEmbedding(String input) {
        String url = azureConfig.getEmbeddingEndpoint() + "/openai/deployments/" +
                azureConfig.getEmbeddingDeployment() + "/embeddings?api-version=" +
                azureConfig.getEmbeddingApiVersion();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("api-key", azureConfig.getEmbeddingKey());

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("input", input);

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            Map response = restTemplate.postForObject(url, entity, Map.class);
            List<Map<String, Object>> data = (List<Map<String, Object>>) response.get("data");
            if (data != null && !data.isEmpty()) {
                return (List<Double>) data.get(0).get("embedding");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
        return Collections.emptyList();
    }
}
