import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

import {
  MailProvider,
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
}
