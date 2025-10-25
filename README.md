# Collaborative Real-Time Code Editor

A Google Docs–like real-time collaborative code editor where multiple users can edit the same file simultaneously.
It includes syntax highlighting, live cursors, inbuilt chat, version history, and user authentication, powered by Socket.IO, React, and Node.js.

## Features

* Real-time multi-user collaboration
* Live chat per document
* Syntax highlighting (Monaco Editor – VS Code-like)
* Version history and rollback
* Authentication (Google or GitHub OAuth)
* Conflict resolution using Operational Transformation (OT)
* Backend built with Express.js, MongoDB, Redis, and Socket.IO
* Fully containerized with Docker
* Ready for cloud deployment on AWS or GCP

## Tech Stack

Frontend

* React.js with Vite
* Monaco Editor for the code editor
* Socket.IO Client for real-time communication
* TailwindCSS for styling
* React Query or Redux for state management

Backend

* Node.js with Express.js
* Socket.IO for WebSocket connections
* MongoDB for storage
* Redis for pub/sub and caching

Infrastructure

* Docker for containerization
* Docker Compose for multi-container setup
* NGINX or Load Balancer for production deployment

## Project Structure

collab-code-editor/
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml
└── README.md

## Setup Instructions

1. Clone the Repository

```
git clone https://github.com/your-username/collab-code-editor.git
cd collab-code-editor
```

2. Run with Docker (Recommended)
   Make sure Docker Desktop is installed and running.

```
docker-compose up --build
```

If everything works correctly, you will see something like:

```
[+] Running 3/3
Container mongo started
Container collaborative_backend started
Container collaborative_frontend started
```

Then open:
Frontend: [http://localhost:5173](http://localhost:5173)
Backend API: [http://localhost:5000](http://localhost:5000)

3. Verify Containers

```
docker ps
```

Expected output:

```
CONTAINER ID   IMAGE                      STATUS         PORTS
abcd1234       collaborative_backend      Up 2 minutes   0.0.0.0:5000->5000/tcp
efgh5678       collaborative_frontend     Up 2 minutes   0.0.0.0:5173->5173/tcp
ijkl9101       mongo:6                    Up 2 minutes   0.0.0.0:27017->27017/tcp
```

## How It Works

1. User connects to a document through the frontend using WebSockets.
2. Socket.IO syncs text changes in real-time.
3. The backend applies Operational Transformation (OT) to merge edits.
4. MongoDB stores documents and version history.
5. Redis handles pub/sub for cross-instance synchronization.

## API Endpoints

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | /document             | Create a new document |
| GET    | /document/:id         | Fetch a document      |
| GET    | /document/:id/history | Get version history   |

## Data Models

User

```
{
  "id": "UUID",
  "name": "string",
  "email": "string",
  "authProvider": "google/github"
}
```

Document

```
{
  "id": "UUID",
  "title": "string",
  "content": "string",
  "ownerId": "userId",
  "collaborators": ["userId"]
}
```

Version

```
{
  "documentId": "docId",
  "content": "string",
  "timestamp": "Date",
  "createdBy": "userId"
}
```

## Testing

Backend

```
cd backend
npm test
```

Frontend

```
cd frontend
npm run test
```

Load testing

```
npx k6 run tests/load.js
```

## Deployment

You can deploy this project to:

* AWS ECS or EKS
* Google Cloud Run or GKE
* Render or Railway
* Vercel for frontend and Render for backend

## Future Enhancements

* AI-powered code suggestions
* Multiple file or project-level collaboration
* Offline editing with CRDT sync
* Improved authentication and permissions

## Contributing

Contributions are welcome.
To contribute, fork the repository and submit a pull request.

```
git checkout -b feature/your-feature
git commit -m "Add your feature"
git push origin feature/your-feature
```

## License

This project is licensed under the MIT License.

## Author

Nizamuddin
LinkedIn: [https://linkedin.com/in/nizamuddin12](https://linkedin.com/in/nizamuddin12)
Email: [nizamuddin00128@gmail.com](mailto:nizamuddin00128@gmail.com)
