import { Pool } from 'pg';
import { IDatabase } from '../../core/interfaces/IDatabase';
import { JobEntity } from '../../core/entities/JobEntity';
import PostgresConnectionManager from './PostgresConnectionManager';

export class PostgresAdapter implements IDatabase {
  private pool: Pool;

  constructor(connectionString: string) {
    this.pool = PostgresConnectionManager.getInstance(connectionString);
  }

  async save(job: JobEntity): Promise<void> {
    await this.pool.query(
        `INSERT INTO jobs (id, type, status, payload, created_at, updated_at)
         VALUES ($1, $2, $3, $4, NOW(), NOW())`,
        [job.id, job.type, job.status, JSON.stringify(job.payload)]
    );
  }

  async getStatus(id: string): Promise<string> {
    const result = await this.pool.query(
        `SELECT status FROM jobs 
      WHERE id = $1`,
        [id]
    );
    if (result.rows.length === 0) return '';
    return result.rows[0];
  }

  async updateStatus(id: string, status: JobEntity['status']): Promise<void> {
    await this.pool.query(
        `UPDATE jobs SET status = $1, updated_at = NOW() WHERE id = $2`,
        [status, id]
    );
  }
  async findById(id: string): Promise<JobEntity | null> {
    const res = await this.pool.query(`SELECT * FROM jobs WHERE id = $1`, [id]);
    if (res.rows.length === 0) return null;

    const row = res.rows[0];
    return {
      id: row.id,
      type: row.type,
      status: row.status,
      payload: row.payload,
      created_at: row.created_at,
      updated_at: row.updated_at,
    };
  }
}
