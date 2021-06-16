# API Documentation: KANBAN

## **USERS / TASKS**

| Method | Route                 | Description                                            |
| ------ | ----------------------| ------------------------------------------------------ |
| POST   | /users/register       | Add a new `User`                                       |
| POST   | /users/login          | Log a `User` in manually                               |
| POST   | /users/googleLogin    | Log a `User` in through Google's credentials           |
| GET    | /tasks/               | Display all `Task` available                           |
| POST   | /tasks/               | Create a new `Task`                                    |
| PUT    | /tasks/:id            | Update all fields/columns of a `Task` based on its ID  |
| PATCH  | /tasks/:id            | Update the category field of `Task` based on its ID    |
| DELETE | /tasks/:id            | Delete a `Task` based on its ID                        |

<br>
============

### **USERS > REGISTER**
Add a new `User`.

* **URL**  `/users/register`
* **METHOD**  `POST`
* **URL PARAMS**  none
* **DATA PARAMS**

```json
  {
    "email": "<user email> required",
    "password": "<user password> required"
  }
```

* **SUCCESS RESPONSE**

    - Code: `201`<br/>
    Content:

    ```json
        {
            "message": "User with email user6@email.com successfully created"
        }
    ```

* **ERROR RESPONSE**

    - Code: `400`<br/>
    Content:

    ```json

        {
            "message": "Email already registered"
        }

    ```
    
    - Code: `400`<br/>
    Content:

    ```json

        {
            "message": "Validation error: Must be in email format,\nValidation error: Email cannot be empty,\nValidation error: Password must be between 5-40 characters"
        }

    ```
    
    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **USERS > LOGIN**
Log a `User` in manually .

* **URL**  `/users/login`
* **METHOD**  `POST`
* **URL PARAMS**  none
* **DATA PARAMS**

```json
  {
    "email": "<user email> required",
    "password": "<user password> required"
  }
```

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBlbWFpbC5jb20iLCJpYXQiOjE2MjM4MTcwMTZ9.sU2L6-jUNnftuN5RBAloD7z7zQQLZoByQxKZ4lOpHr0"
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "message": "Email/password incorrect"
        }

    ```
    
    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **USERS > GOOGLE LOGIN**
Log a `User` in through Google's credentials.

* **URL**  `/users/googleLogin`
* **METHOD**  `POST`
* **URL PARAMS**  none
* **DATA PARAMS** none

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "accesstoken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiZW1haWwiOiJ1c2VyMkBlbWFpbC5jb20iLCJpYXQiOjE2MjM4MTcwMTZ9.sU2L6-jUNnftuN5RBAloD7z7zQQLZoByQxKZ4lOpHr0"
        }
    ```

* **ERROR RESPONSE**

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **TASKS > DISPLAY ALL TASKS**
Display all `Task` available.

* **URL**  `/tasks/`
* **METHOD**  `GET`
* **URL PARAMS**  none
* **DATA PARAMS** none

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "tasks": [
                {
                    "id": 1,
                    "title": "Bayar invoice",
                    "description": "internet, credit card",
                    "due_date": "2021-07-20 00:00:00.000 +00:00",
                    "category": "backlog",
                    "UserId": 1,
                    "createdAt": "2021-06-15T10:45:56.955Z",
                    "updatedAt": "2021-06-15T12:46:31.148Z"
                },
                {
                    "id": 2,
                    "title": "Write story",
                    "description": "",
                    "due_date": "2001-11-10 17:00:00.000 +00:00",
                    "category": "todo",
                    "UserId": 1,
                    "createdAt": "2021-06-15T10:46:31.050Z",
                    "updatedAt": "2021-06-15T10:46:31.050Z"
                },
                {
                    "id": 3,
                    "title": "Clean up sketches",
                    "description": "",
                    "due_date": "2021-12-08 00:00:00.000 +00:00",
                    "category": "backlog",
                    "UserId": 1,
                    "createdAt": "2021-06-15T10:50:31.699Z",
                    "updatedAt": "2021-06-15T10:50:31.699Z"
                },
                {
                    "id": 5,
                    "title": "Beli hadiah ultah mama",
                    "description": "tanaman",
                    "due_date": "2021-08-08 00:00:00.000 +00:00",
                    "category": "backlog",
                    "UserId": 2,
                    "createdAt": "2021-06-15T12:47:59.174Z",
                    "updatedAt": "2021-06-15T13:38:19.404Z"
                },
                {
                    "id": 6,
                    "title": "Beli beras",
                    "description": "",
                    "due_date": null,
                    "category": "todo",
                    "UserId": 2,
                    "createdAt": "2021-06-15T14:48:20.375Z",
                    "updatedAt": "2021-06-15T14:48:20.375Z"
                }
            ]
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "message": "jwt must be provided"
        }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **TASKS > CREATE NEW TASK**
Create a new `Task`.

* **URL**  `/tasks/`
* **METHOD**  `POST`
* **URL PARAMS**  none
* **DATA PARAMS**

```json
  {
    "title": "<task name> required",
    "description": "<task description> not required",
    "due_date": "<task due date> not required",
    "category": "<task category> required"
  }
```

* **SUCCESS RESPONSE**

    - Code: `201`<br/>
    Content:

    ```json
        {
            "task": {
                "id": 8,
                "title": "Beli kopi",
                "description": "pakai voucher diskon",
                "due_date": null,
                "category": "backlog",
                "UserId": 2,
                "updatedAt": "2021-06-16T05:21:04.388Z",
                "createdAt": "2021-06-16T05:21:04.388Z"
            }
        }
    ```

* **ERROR RESPONSE**

    - Code: `400`<br/>
    Content:

    ```json

        {
            "message": "Validation error: Title cannot be empty"
        }
        
    ```

    - Code: `400`<br/>
    Content:

    ```json

        {
            "message": "Validation error: Category must be either \"backlog\", \"todo\", \"doing\", or \"done\""
        }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **TASKS > EDIT ALL COLUMNS OF A TASK**
Update all fields/columns of a `Task` based on its ID.

* **URL**  `/tasks/`
* **METHOD**  `PUT`
* **URL PARAMS** Required: `id=[integer]`
* **DATA PARAMS**

```json
  {
    "title": "<task name> required",
    "description": "<task description> not required",
    "due_date": "<task due date> not required",
    "category": "<task category> required"
  }
```

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "message": "Task with ID 7 has been successfully updated",
            "updated_task": [
                {
                    "id": 7,
                    "title": "Tidur siang",
                    "description": "2 jam",
                    "due_date": "2021-07-20 00:00:00.000 +00:00",
                    "category": "done",
                    "UserId": 2,
                    "createdAt": "2021-06-16T03:34:54.656Z",
                    "updatedAt": "2021-06-16T05:27:25.808Z"
                }
            ]
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "message": "User 2 does not have permission"
        }
        
    ```

    - Code: `404`<br/>
    Content:

    ```json

        {
            "message": "Task with ID 20 not found"
        }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **TASKS > EDIT CATEGORY OF A TASK**
Update the category field of `Task` based on its ID.

* **URL**  `/tasks/`
* **METHOD**  `PATCH`
* **URL PARAMS** Required: `id=[integer]`
* **DATA PARAMS**

```json
  {
    "category": "<task category> required"
  }
```

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "message": "Task with ID 5 has been successfully updated",
            "updated_task": [
                {
                    "id": 5,
                    "title": "Beli hadiah ultah mama",
                    "description": "tanaman",
                    "due_date": "2021-08-08 00:00:00.000 +00:00",
                    "category": "backlog",
                    "UserId": 2,
                    "createdAt": "2021-06-15T12:47:59.174Z",
                    "updatedAt": "2021-06-16T05:38:55.843Z"
                }
            ]
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "message": "User 2 does not have permission"
        }
        
    ```

    - Code: `404`<br/>
    Content:

    ```json

        {
            "message": "Task with ID 20 not found"
        }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============

### **TASKS > DELETE A TASK**
Delete a `Task` based on its ID.

* **URL**  `/tasks/`
* **METHOD**  `DELETE`
* **URL PARAMS** Required: `id=[integer]`
* **DATA PARAMS** none

* **SUCCESS RESPONSE**

    - Code: `200`<br/>
    Content:

    ```json
        {
            "message": "Task with ID 8 has been successfully deleted"
        }
    ```

* **ERROR RESPONSE**

    - Code: `401`<br/>
    Content:

    ```json

        {
            "message": "User 2 does not have permission"
        }
        
    ```

    - Code: `404`<br/>
    Content:

    ```json

        {
            "message": "Task with ID 20 not found"
        }

    ```

    - Code: `500`<br/>
    Content:

    ```json

        {
            "message": "Internal server error"
        }

    ```
<br>
============
