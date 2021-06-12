# NEWS HUB-server

​
List of available endpoints:
​
- `POST /users/register`
- `POST /users/login`
- `POST /users/login-google`
- `POST /users/login-captcha`

- `GET /tasks`

And routes below need authentication
- `POST /tasks`
- `DELETE /tasks/:id`

### POST /users/register

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 201
- body:
  ​

```json
{
  "id": "integer",
  "email": "string"
}
```

Error Response:

- status: 400
- body:
  ​

```json
{
  "message": "string"
}
```

OR 

- status: 500
- body:
  ​

```json
{
  "message": "string"
}
```

### POST /users/login

Request:

- data:

```json
{
  "email": "string",
  "password": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "access_token": "string"
}
```

Error Response:

- status: 401
- body:
  ​

```json
{
  "message": "string"
}
```

OR 

- status: 500
- body:

```json
{
  "message": "string"
}
```

### POST /users/login-google

Request:

- data:

```json
{
  "id_token_google": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "access_token": "string"
}
```
Error Response:

- status: 401
- body:
  ​

```json
{
  "message": "string"
}
```

OR 

- status: 500
- body:

```json
{
  "message": "string"
}
```

### POST /users/login-captcha

Request:

- data:

```json
{
  "response": "string"
}
```

Response:

- status: 200
- body:
  ​

```json
{
  "success": "true|false",
  "challenge_ts": "timestamp",  // timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  "hostname": "string",         // the hostname of the site where the reCAPTCHA was solved
  "error-codes": "[...]"        // optional
}
```

Error Response:

- status: 401
- body:
  ​

```json
{
  "message": "string"
}
```

OR 

- status: 500
- body:

```json
{
  "message": "string"
}
```

### GET /tasks

Description: Get all tasks from any user

Request:

- headers:
  - access_token: string

Response:

- status: 200
- body:
  ​

```json
[
    {
        "id": 1,
        "title": "Test Title",
        "description": "Test description",
        "url": "http://testurl.com",
        "imageUrl": "http://testurl.com/abc",
        "publishedAt": "2021-06-09T17:00:00.000Z",
        "userid": 1,
        "updatedAt": "2021-06-09T19:23:41.351Z",
        "createdAt": "2021-06-09T19:23:41.351Z"
    }
]
```

Error Response:

- status: 401
- body:
  ​

```json
{
  "message": "string"
}
```

OR 

- status: 500
- body:

```json
{
  "message": "string"
}
```

### POST /tasks
Request:

- headers: access_token

- data:

```json
{
    "title":"Test Title",
    "category": "Test category"
}
```

​Response:

- status: 201
- body:
  ​

```json
{
    "id": 1,
    "title": "Test Title",
    "category": "Test category",
    "userid": 1,
    "updatedAt": "2021-06-09T19:23:41.351Z",
    "createdAt": "2021-06-09T19:23:41.351Z"
}
```

Error Response:

- status: 401
- body:
  ​

```json
{
  "message": "string"
}
```

OR 

- status: 500
- body:

```json
{
  "message": "string"
}
```

### DELETE /tasks/:id

description: 
  Delete one of the current logged in user task. (cannot delete another user task)

Request:

- headers: access_token
- params: 
  - id: integer (required)

Response:

- status: 200
- body:

```json
{
    "message": "task success to delete"
}
```

Error Response:

- status: 401
- body:
  ​

```json
{
  "message": "string"
}
```

OR 

- status: 500
- body:

```json
{
  "message": "string"
}
```