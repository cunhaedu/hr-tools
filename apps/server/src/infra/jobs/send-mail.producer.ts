import { render } from '@react-email/render';
import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import {
  MailProvider,
  MailTemplate,
  MailTemplateData,
  MailTemplateName,
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

  async retrieveParsedEmailHtmlBasedOnTemplate<T extends MailTemplate>(
    template: T,
    data: MailTemplateData[T],
  ): Promise<string> {
    const templates: Record<MailTemplateName, Promise<any>> = {
      welcome: import('./templates/account-verification').then(
        (m) => m.default,
      ),
      'reset-password': import('./templates/account-verification').then(
        (m) => m.default,
      ),
      'account-verification': import('./templates/account-verification').then(
        (m) => m.default,
      ),
    };

    const selectedTemplate = await templates[template];

    return render(selectedTemplate(data));
  }
}
