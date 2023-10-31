export interface SendEmailData {
  recipients: Array<{ name: string; email: string }>;
  subject: string;
  html: string;
}

export type MailTemplateName =
  | 'welcome'
  | 'reset-password'
  | 'account-verification';

export type MailTemplateData = {
  welcome: {
    userName: string;
    websiteUrl: string;
  };
  'reset-password': {
    resetPasswordUrl: string;
    userName: string;
  };
  'account-verification': {
    verificationUrl: string;
    userName: string;
  };
};

export type MailTemplate = keyof MailTemplateData;

export interface MailProvider {
  sendMail(data: SendEmailData): Promise<void>;
  retrieveParsedEmailHtmlBasedOnTemplate<T extends MailTemplate>(
    template: T,
    data: MailTemplateData[T],
  ): Promise<string>;
}
