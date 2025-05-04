## 🧩 UML Class Diagram:

                 +---------------------------+
                 |         <<interface>>     |
                 |            Job            |
                 +---------------------------+
                 | + id: string              |
                 | + type: JobType           |
                 | + run(): Promise<JobRes>  |
                 +---------------------------+
                           /_\\
                            |
        ----------------------------------------
        |                                      |
+---------------------+        +---------------------------+
|    SendEmailJob     |        |   GenerateReportJob       |
+---------------------+        +---------------------------+
| + data: EmailData   |        | + data: ReportRequest     |
| + run(): Promise<>  |        | + run(): Promise<>        |
+---------------------+        +---------------------------+


                 +----------------------------+
                 |        JobFactory          |
                 +----------------------------+
                 | + createJob(type, data):   |
                 |         Job                |
                 +----------------------------+

                 +----------------------------+
                 |       SubmitJobUseCase     |
                 +----------------------------+
                 | - queue: IQueue            |
                 | - database: IDatabase      |
                 | + execute(job): Promise<>  |
                 +----------------------------+

           +--------------------+     +----------------------+
           |    <<interface>>   |     |     <<interface>>     |
           |       IQueue       |     |       IDatabase       |
           +--------------------+     +----------------------+
           | + add(job: Job)    |     | + save(job: Job)      |
           +--------------------+     +----------------------+


### ✅ How to Read This

- **`Job` interface**: The core abstraction for all jobs.
- **Concrete Jobs**: `SendEmailJob`, `GenerateReportJob` implement the `Job` interface.
- **`JobFactory`**: Creates jobs dynamically.
- **`SubmitJobUseCase`**: Application service that adds jobs to the queue and stores metadata.
- **`IQueue` / `IDatabase`**: Abstractions for infrastructure components.
