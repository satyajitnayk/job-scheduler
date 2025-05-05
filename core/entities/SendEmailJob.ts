import { JobInfo } from './Job';

export interface EmailPayload {
  to: string;
  subject: string;
  body: string;
}

export class SendEmailJob implements JobInfo {
  constructor(public id: string, public data: EmailPayload) {}
  type: string = 'send_email';

  async run(): Promise<any> {
    // todo: Logic to send email
    console.log(`Sending Email to: ${this.data.to}`);
    return { status: 'success', email: this.data.to };
  }
}
