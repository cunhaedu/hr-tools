import { render } from '@react-email/render';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import {
  MailProvider,
  MailTemplate,
  SendEmailData,
} from '@core/domain/providers/MailProvider';

@Injectable()
export class SendMailProducer implements MailProvider {
  constructor(
    @InjectQueue('send-mail-queue')
    private queue: Queue,
  ) {}

  async sendMail(data: SendEmailData): Promise<void> {
    this.queue.add('send-mail-job', data);
  }

  async retrieveParsedEmailHtmlBasedOnTemplate(
    template: MailTemplate,
    data: any,
  ): Promise<string> {
    const templates = {
      welcome: import('./templates/verification').then((m) => m.default),
      resetPassword: import('./templates/verification').then((m) => m.default),
      verification: import('./templates/verification').then((m) => m.default),
    };

    const selectedTemplate = await templates[template];

    return render(selectedTemplate(data));
  }
}
