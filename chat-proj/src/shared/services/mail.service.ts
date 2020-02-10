import { Injectable, Logger } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Email } from '../dto-models/interfaces/email.interface';
import { EmailDTO } from '../dto-models/dto/email-DTO';
import { ConfigurationService } from '../configuration/configuration.service';
import { Configuration } from '../configuration/configuration.enum';

@Injectable()
export class MailService {

    private readonly logger = new Logger(MailService.name);
    transporter;

    constructor(
        private readonly configurationService: ConfigurationService,
    ) {
        this.logger.log(`Creating email transport...`);
        const transportOptions = {
            host: this.configurationService.get(Configuration.EMAIL_HOST),
            port: +this.configurationService.get(Configuration.EMAIL_PORT),
            // secure: EMAIL_TLS === 'true', // use TLS
            auth: {
                user: this.configurationService.get(Configuration.EMAIL_USER),
                pass: this.configurationService.get(Configuration.EMAIL_PASSWORD),
            },
            tls: {
                ciphers: 'SSLv3',
            },
        };
        this.logger.log(`transport options: ${JSON.stringify(transportOptions)}`);
        this.transporter = nodemailer.createTransport(transportOptions);
        // verify connection configuration
        this.transporter.verify((error, success) => {
            if (error) {
                this.logger.error(`Email transport failed`, error.toString());
            } else {
                this.logger.log(`Email transport ready to send emails`);
            }
        });
    }

    sendEmail(email: Email) {
        this.logger.log(`Sending email to ${email.to[0]}`);
        return new Promise((resolve, reject) => {
            this.transporter.sendMail(email)
                .then(info => {
                    this.logger.log(`email sended ${info}`);
                    resolve();
                })
                .catch(error => {
                    this.logger.error(`Email transport failed`, error.toString());
                    reject(new Error(error.toString()));
                });
        });
    }

    sendTemplateEmail(infoEmail: EmailDTO) {
        const fs = require('fs');
        let template: string = fs.readFileSync(`${__dirname}/../templates/email-templates/${infoEmail.body.template}`, 'utf8');
        for (const key of Object.keys(infoEmail.body.data)) {
            template = template.replace(`{{${key.toUpperCase()}}}`, infoEmail.body.data[key]);
        }

        const email: Email = {
            from: [this.configurationService.get(Configuration.EMAIL_USER)],
            to: [infoEmail.to],
            subject: infoEmail.subject,
            html: template,
        };
        return this.sendEmail(email);
    }
}
