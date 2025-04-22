# Project Title

A brief description of your project.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
  - [POST /user/register](#post-userregister)
  - [POST /user/login](#post-userlogin)
- [Contributing](#contributing)
- [License](#license)

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd Backend
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:
```
npm start
```
The application will be running on `http://localhost:3000`.

## API Endpoints

### POST `/user/register`

**Description**: Registers a new user.

**Request Body**:
```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response**:
- **201 Created**: Returns the created user and a JWT token.
- **400 Bad Request**: Validation errors or missing fields.

---

### POST `/user/login`

**Description**: Logs in an existing user.

**Request Body**:
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response**:
- **200 OK**: Returns a JWT token and user details.
  ```json
  {
    "token": "your-jwt-token",
    "user": {
      "_id": "user-id",
      "email": "johndoe@example.com",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      }
    }
  }
  ```
- **400 Bad Request**: Validation errors.
- **401 Unauthorized**: Invalid email or password.

---

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.