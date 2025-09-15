package com.talentai.controller;

import com.talentai.model.chat.ChatRequest;
import com.talentai.model.chat.ChatResponse;
import com.talentai.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatService chatService;

    @PostMapping
    public ChatResponse chat(@RequestBody ChatRequest request) {
        String reply = chatService.getChatResponse(request.getMessage());
        return new ChatResponse(reply);
    }
}
