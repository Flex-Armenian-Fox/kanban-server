**Register**
----
  Register a new account

* **URL**

  /register

* **Method:**

  `POST`
  
*  **URL Params**

* **Data Params**

    **Required:**<br />
    **Body:** `{email: [email], password: [password]}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message: "User Registered", email:[email]}`
 
* **Error Response:**

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{message: "email is already taken"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{message: "Please use proper email format"}`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Password must be between 4 to 32 characters" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please Fill Email and Password" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
----

**Login**
----
  Log in to existing account

* **URL**

  /login

* **Method:**

  `POST`
  
*  **URL Params**

* **Data Params**

    **Required:**<br />
    **Body:** `{email: [email], password: [password]}`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{message: "login successful", access_token: [token]}`
 
* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:** `{message: "Email not found"}`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Wrong Password" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Please Fill Email and Password" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
----
**Get Task**
----
  Get all tasks

* **URL**

  /task

* **Method:**

  `GET`
  
*  **URL Params**

* **Data Params**

    **Required:**<br />
    **Headers:** `{access_token: [token]}` <br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
    ```json
    [
        {
            "id": [id],
            "name": [name],
            "description": [description],
            "deadline": [deadline],
            "category": [category],
            "UserId": [uid],
            "updatedAt": [Update Date],
            "createdAt": [Create Date]
        },
        {
            "id": [id],
            "name": [name],
            "description": [description],
            "deadline": [deadline],
            "category": [category],
            "UserId": [uid],
            "updatedAt": [Update Date],
            "createdAt": [Create Date]
        }
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Login Error" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
----

**Post Task**
----
  Post a new Task

* **URL**

  /task

* **Method:**

  `POST`
  
*  **URL Params**

* **Data Params**

    **Required:**<br />
    **Body:** `{name: [name], category: [category]}` <br />
    **Headers:** `{access_token: [token]}` <br />

    **Optional:**<br />
    **Body:** `{deadline: [deadline], description: [description]}` <br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```json
    {
        "id": [id],
        "name": [name],
        "description": [description],
        "deadline": [deadline],
        "category": [category],
        "UserId": [uid],
        "updatedAt": [Update Date],
        "createdAt": [Create Date]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Login Error" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Task name may not be empty" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Deadline must be after today" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Invalid Category" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
----

**Put Task**
----
  edit existing task

* **URL**

  /task

* **Method:**

  `PUT`
  
*  **URL Params**
    **Required:** id<br />
    
* **Data Params**

    **Required:**<br />
    **Headers:** `{access_token: [token]}` <br />

    **Optional:**<br />
    **Body:** `{name: [name], category: [category], deadline: [deadline], description: [description]}` <br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```json
    {
        "id": [id],
        "name": [name],
        "description": [description],
        "deadline": [deadline],
        "category": [category],
        "UserId": [uid],
        "updatedAt": [Update Date],
        "createdAt": [Create Date]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Login Error" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "User does not have permission" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Invalid Category" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
----

**Patch Task**
----
  Change existing task's category

* **URL**

  /task

* **Method:**

  `Patch`
  
*  **URL Params**
    **Required:** id<br />
    
* **Data Params**

    **Required:**<br />
    **Headers:** `{access_token: [token]}` <br />

    **Optional:**<br />
    **Body:** `{name: [name], category: [category], deadline: [deadline], description: [description]}` <br />

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 

    ```json
    {
        "id": [id],
        "name": [name],
        "description": [description],
        "deadline": [deadline],
        "category": [category],
        "UserId": [uid],
        "updatedAt": [Update Date],
        "createdAt": [Create Date]
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "Login Error" }`

  OR

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message: "User does not have permission" }`

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `{ message: "Invalid Category" }`

  OR

  * **Code:** 500 SERVER ERROR <br />
----
