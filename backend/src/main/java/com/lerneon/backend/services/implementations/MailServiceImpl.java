package com.lerneon.backend.services.implementations;

import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import com.lerneon.backend.models.event.MailEvent;
import com.lerneon.backend.models.exceptions.MailDeliveryException;
import com.lerneon.backend.services.MailService;
import jakarta.mail.internet.MimeMessage;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@AllArgsConstructor
@Slf4j
public class MailServiceImpl implements MailService {
    private final JavaMailSender mailSender;

    @Override
    public void sendMail(MailEvent mailEvent) {
        try {
            MimeMessage mimeMessage = mailSender.createMimeMessage();
            MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, true);

            mimeMessageHelper.setTo(mailEvent.getTo());
            mimeMessageHelper.setSubject(mailEvent.getSubject());
            mimeMessageHelper.setText(mailEvent.getContent(), true);

            mailSender.send(mimeMessage);

            log.info("Email berhasil dikirim ke {}", mailEvent.getTo());
        } catch (Exception exception) {
            log.error("Gagal kirim email ke {}", mailEvent.getTo(), exception);
            throw new MailDeliveryException("Gagal mengirim email ke " + mailEvent.getTo(),
                    exception);
        }
    }
}
