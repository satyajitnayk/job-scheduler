export interface JobEntity {
  id: string;
  type: string;
  status: 'queued' | 'in_progress' | 'completed' | 'failed';
  payload: any;
  created_at: Date;
  updated_at: Date;
}
