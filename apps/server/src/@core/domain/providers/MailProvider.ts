export interface SendEmailData {
  recipients: Array<{ name: string; email: string }>;
  subject: string;
  html: string;
  text: string;
}

export interface MailProvider {
  sendMail(data: SendEmailData): Promise<void>;
}
