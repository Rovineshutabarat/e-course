package com.lerneon.backend.services;

import com.lerneon.backend.models.event.OneTimePasswordEvent;

public interface MailService {
    void sendMail(OneTimePasswordEvent oneTimePasswordEvent);
}
