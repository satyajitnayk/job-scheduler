import { JobInfo } from '../entities/Job';
import { SendEmailJob } from '../entities/SendEmailJob';

export class JobFactory {
  static createJob(type: string, id: string, data: any): JobInfo {
    switch (type) {
      case 'send_email':
        return new SendEmailJob(id, data);
      // todo: add more jobs
      default:
        throw new Error(`Unsupported job type: ${type}`);
    }
  }
}
