# Security Spec

1. Data Invariants:
- Access Admin Panel: A user must be an admin to access the dashboard data. Admin is verified by the existence of a corresponding document in the `/admins/$(request.auth.uid)` collection.
- `projects`: Anyone can read. Only admins can write or delete.
- `services`: Anyone can read. Only admins can write or delete.
- `messages`: Anyone can create (contact form). Only admins can read, update, or delete.
- `admins`: Only admins can read. No one can write from client. `email` must match the auth email.

2. The "Dirty Dozen" Payloads:
- Unauthenticated user attempting to write a new project.
- Unauthenticated user attempting to modify an existing service.
- Unauthenticated user reading messages.
- Authenticated non-admin attempting to write a new project.
- Authenticated non-admin attempting to read messages.
- Admin attempting to create a project with a malicious 1.5MB title string.
- Admin attempting to update a project, leaving out required schema keys.
- User attempting to create a message with a 1.5MB message string.
- User attempting to assign themselves the 'admin' role directly in `/admins`.
- Admin attempting to delete another admin.
- Admin updating a service but submitting an invalid data type for price.
- User providing an object instead of string for name in contact form.

3. The Test Runner:
Tests are implemented in `firestore.rules.test.ts`.
