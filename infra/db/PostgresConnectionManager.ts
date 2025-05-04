import { Pool } from 'pg';

export default class PostgresConnectionManager {
  private static instance: Pool;

  private constructor() {}

  public static getInstance(connectionString: string): Pool {
    if (!PostgresConnectionManager.instance) {
      PostgresConnectionManager.instance = new Pool({ connectionString });
    }
    return PostgresConnectionManager.instance;
  }
}
