package com.talentai.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ChatService {

    @Autowired
    private AzureOpenAIService azureOpenAIService;

    public String getChatResponse(String message) {
        return azureOpenAIService.getChatCompletion(message);
    }
}
