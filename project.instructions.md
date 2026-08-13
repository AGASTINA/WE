# Project Instructions

## Tech Stack
- Frontend: Angular
- Language: TypeScript
- Backend: Java Spring Boot
- Database: MySQL
- ORM: Spring Data JPA / Hibernate
- Authentication: Spring Security + JWT
- API: REST

## Architecture
Follow this architecture:
Angular → REST API → Controller → Service → Repository → MySQL

Keep each layer responsible for its own concern. Do not skip layers.

## Angular
- Use Angular and TypeScript conventions.
- Use standalone components where supported by the existing project.
- Use Reactive Forms for Sign Up and Login.
- Keep HTTP calls inside Angular services.
- Use HttpClient for API communication.
- Use Angular Router for navigation.
- Use route guards for protected routes.
- Use an HTTP interceptor for JWT requests.
- Keep business logic out of components.
- Reuse existing components and services when appropriate.

## Spring Boot
- Follow Controller → Service → Repository → Entity layering.
- Controllers handle HTTP requests and responses only.
- Business logic belongs in services.
- Repositories handle database access only.
- Use Spring Data JPA for persistence.
- Use DTOs for API request/response models where appropriate.
- Use meaningful names and maintainable code.

## Database
- Use MySQL with JPA/Hibernate.
- User data must include appropriate fields such as id, name, email and password.
- Email must be unique.
- Never store plaintext passwords.
- Hash passwords using BCrypt.
- Never return passwords in API responses.
- Never log passwords or secrets.
- Never hard-code database credentials or other secrets.

## Authentication
- Use Spring Security with JWT.
- Authenticate credentials on the backend.
- Generate JWT only after successful authentication.
- Validate JWTs on protected backend requests.
- The backend is the final authority for authorization.
- Never rely only on frontend authentication or route guards for security.

## Validation
Validate input on both frontend and backend.
Check required fields, email format, password requirements, duplicate users and invalid credentials.
Frontend validation improves user experience; backend validation is mandatory.

## REST API
- Use clear RESTful endpoint names.
- Use appropriate HTTP methods and status codes.
- Return consistent error responses.
- Do not expose stack traces, credentials or internal implementation details.

## Error Handling
- Use centralized exception handling where appropriate.
- Return useful, safe error messages.
- Handle validation, authentication, authorization and database errors properly.

## Security
Never:
- Store plaintext passwords.
- Hard-code secrets.
- Expose credentials.
- Trust frontend authorization.
- Disable security to bypass errors.
- Return sensitive information.

Use environment/configuration management for secrets.

## Testing
Add tests for important functionality, including:
- Successful Sign Up
- Duplicate email
- Invalid Sign Up data
- Successful Login
- Invalid Login credentials
- Unauthorized access
- Protected resource access

## Code Changes
Before changing code:
1. Inspect the existing project.
2. Understand the current architecture.
3. Reuse existing code where possible.
4. Modify only the files required for the task.
5. Do not rewrite unrelated code.
6. Do not introduce unnecessary dependencies.
7. Preserve existing functionality.

When implementing a feature, identify the files created and modified.

## Copilot Behavior
- Follow these instructions for all generated code.
- Inspect relevant existing files before generating implementation.
- Ask for clarification when requirements are genuinely ambiguous.
- Do not invent APIs, database tables or project architecture without evidence.
- Keep implementations simple, secure, testable and maintainable.
- Verify generated code against the requested requirements before considering the feature complete.

## Feature Completion
A feature is complete only when:
1. The frontend works.
2. The backend API works.
3. Database interaction works where required.
4. Validation works.
5. Security requirements are satisfied.
6. Relevant tests are implemented.
7. Existing functionality remains intact.
