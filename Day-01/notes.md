# Day 01: Core Full Stack Concepts & Cheat Sheet

## 1. Full Stack Architecture
A Full Stack application comprises three core layers:
1. **Client / Presentation Layer (Frontend):** Runs on user devices (browser/mobile). Handles presentation, user interactions, layout, and sends asynchronous network requests to the server.
2. **Application / Business Logic Layer (Backend):** Runs on the server environment (e.g. Python/FastAPI, Node.js). Handles business logic, validation, authentication, authorization, and interfaces with the database.
3. **Database / Persistence Layer:** Safely stores and indexes persistent application data (relational like PostgreSQL, or document-based like MongoDB).

```
[ Browser / Client ] <--- HTTP / HTTPS / JSON ---> [ FastAPI Backend ] <--- SQL / ORM ---> [ PostgreSQL Database ]
```

---

## 2. HTTP Protocol Essentials

### Request Structure
- **Request Line:** Method (`GET`, `POST`, `PUT`, `DELETE`, etc.) + Request URI + HTTP Version
- **Headers:** Key-value metadata (e.g., `Content-Type: application/json`, `Authorization: Bearer <token>`)
- **Body:** Payload sent with methods like `POST`, `PUT`, `PATCH`.

### Common HTTP Methods
| Method | Purpose | Idempotent |
|---|---|---|
| `GET` | Retrieve data from server | Yes |
| `POST` | Create new resource on server | No |
| `PUT` | Replace existing resource completely | Yes |
| `PATCH` | Partially update existing resource | No |
| `DELETE` | Remove existing resource | Yes |

### HTTP Status Codes
- **1xx (Informational):** Request received, continuing process.
- **2xx (Success):** 
  - `200 OK`: Standard successful response.
  - `201 Created`: Resource created successfully.
  - `204 No Content`: Successful action with no return body.
- **3xx (Redirection):**
  - `301 Moved Permanently`: Resource relocated permanently.
  - `304 Not Modified`: Cached version still valid.
- **4xx (Client Error):**
  - `400 Bad Request`: Invalid request syntax or validation error.
  - `401 Unauthorized`: Authentication missing or invalid.
  - `403 Forbidden`: Authenticated, but user lacks necessary permissions.
  - `404 Not Found`: Requested resource does not exist.
  - `422 Unprocessable Entity`: Validation failed (e.g. FastAPI / Pydantic error).
- **5xx (Server Error):**
  - `500 Internal Server Error`: Unhandled crash or exception on server.
  - `502 Bad Gateway`: Invalid response from upstream server.
  - `503 Service Unavailable`: Server down or overloaded.

---

## 3. JSON (JavaScript Object Notation)
JSON is the universal lightweight data interchange format between client and server.

```json
{
  "intern": {
    "name": "Safal Shrestha",
    "role": "Full Stack Developer Intern",
    "skills": ["React", "FastAPI", "GraphQL", "PostgreSQL", "Docker"],
    "isActive": true,
    "completedDays": 1
  }
}
```

- **JSON Rules:** Keys must be enclosed in double quotes `"key"`, values can be strings, numbers, booleans, objects, arrays, or `null`.

---

## 4. REST vs GraphQL

| Feature | REST (Representational State Transfer) | GraphQL |
|---|---|---|
| **Endpoint Structure** | Multiple endpoints (`/api/users`, `/api/tasks`) | Single endpoint (typically `/graphql`) |
| **Data Fetching** | Fixed response structure determined by server | Flexible; client asks for precisely the fields it needs |
| **Over-fetching** | Common (downloads unneeded fields) | Eliminated |
| **Under-fetching** | Common (requires multiple round trips to fetch related resources) | Eliminated (nested queries fetch related data in one request) |
| **Operations** | HTTP verbs: `GET`, `POST`, `PUT`, `DELETE` | Queries (read), Mutations (write), Subscriptions (realtime) |
| **Typing & Schema** | Implicit or OpenAPI/Swagger documentation | Strongly typed schema (`schema.graphql`) |

---

## 5. Git Version Control Cheatsheet

```bash
# Check remote configuration
git remote -v

# Stage changes
git add .

# Commit with a clean message
git commit -m "Day 01: Full stack overview and git setup"

# Push to remote branch
git push origin main
```
