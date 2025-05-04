# Job Queue Management Platform

## Features

- Asynchronous background job handling with BullMQ and Redis
- Scalable API & worker infrastructure using Docker
- Job lifecycle management with PostgreSQL for persistence
- Easily extendable job types (e.g., SendEmail, GenerateReport)

## Setup

1. Clone the repo
2. Install dependencies

   ```bash
   npm install
   ```

3. Start the services using Docker

   ```bash
   docker-compose up --build
   ```

4. The API server runs on http://localhost:3000

- POST `/api/jobs` to submit a job

- GET `/api/jobs/:id` to view job status
