export interface SendEmailData {
  recipients: Array<{ name: string; email: string }>;
  subject: string;
  html: string;
}

export type MailTemplate = 'welcome' | 'reset-password' | 'verification';

export interface MailProvider {
  sendMail(data: SendEmailData): Promise<void>;
  retrieveParsedEmailHtmlBasedOnTemplate(
    template: MailTemplate,
    data: unknown,
  ): Promise<string>;
}
