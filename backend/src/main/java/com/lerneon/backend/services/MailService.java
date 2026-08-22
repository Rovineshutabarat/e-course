package com.lerneon.backend.services;

import com.lerneon.backend.models.event.MailEvent;

public interface MailService {
    void sendMail(MailEvent mailEvent);
}
