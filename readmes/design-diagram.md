## 🧭 System Architecture

                        +--------------------+
                        |      Client        |
                        | (Web App / Postman)|
                        +--------------------+
                                 |
                                 | HTTP Request
                                 v
                        +--------------------+
                        |     API Server     |
                        |  (Express/Fastify) |
                        +--------------------+
                         |               |
     Write Job Metadata  |               |  Enqueue Job
                         v               v
               +----------------+   +----------------+
               | PostgreSQL DB  |   |   Redis (Queue)|
               +----------------+   +----------------+
                                           |
                                           | Fetch Job
                                           v
                                +------------------------+
                                |     Worker Service     |
                                |  (BullMQ Job Handlers) |
                                +------------------------+
                                           |
                                           | Executes Logic
                                           v
                                +------------------------+
                                |   External Services    |
                                | (e.g., Email Sender)   |
                                +------------------------+

Optional:
                        +---------------------+
                        |     Dashboard UI    |
                        |     (React App)     |
                        +---------------------+
                           |              |
             API Queries   |              | Reads Status
                           v              v
                     +---------+     +-----------+
                     |   API   |     | PostgreSQL|
                     +---------+     +-----------+
