package com.talentai.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AzureOpenAIConfig {

    @Value("${azure.openai.chat.endpoint}")
    private String chatEndpoint;

    @Value("${azure.openai.chat.key}")
    private String chatKey;

    @Value("${azure.openai.chat.deployment}")
    private String chatDeployment;

    @Value("${azure.openai.chat.api-version}")
    private String chatApiVersion;

    @Value("${azure.openai.embedding.endpoint}")
    private String embeddingEndpoint;

    @Value("${azure.openai.embedding.key}")
    private String embeddingKey;

    @Value("${azure.openai.embedding.deployment}")
    private String embeddingDeployment;

    @Value("${azure.openai.embedding.api-version}")
    private String embeddingApiVersion;

    public String getChatEndpoint() { return chatEndpoint; }
    public String getChatKey() { return chatKey; }
    public String getChatDeployment() { return chatDeployment; }
    public String getChatApiVersion() { return chatApiVersion; }

    public String getEmbeddingEndpoint() { return embeddingEndpoint; }
    public String getEmbeddingKey() { return embeddingKey; }
    public String getEmbeddingDeployment() { return embeddingDeployment; }
    public String getEmbeddingApiVersion() { return embeddingApiVersion; }
}
