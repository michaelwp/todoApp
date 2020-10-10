## TODO APP SERVER DOCUMENTATION
#### Version: 1
- ```API-BASE-URL: http://127.0.0.1:8090/api/v1```

-------

#### Error response format:
 - `status`: `4xx`,`5xx`
 - ```json 
   {
       "code": 0,
       "message": "...",
       "data": null
   }
   ```

### List of available endpoints:

## 1. Auth
- Header parameter

  | Parameter       | Type   | Description                   | Required |
  |-----------------|--------|-------------------------------|----------|
  | Accept-Language | string | id = Indonesian, en = English | Optional |

#### POST /auth/register
  
- Body Parameter

  | Parameter | Type   | Description                                                                                   | Required |
  |-----------|--------|-----------------------------------------------------------------------------------------------|----------|
  | name      | string | Name of user, Max 30 characters.                                                              | required |
  | email     | string | email of user                                                                                 | required |
  | password  | string | Password of user, Min 8 char, Must have at least 1 Number, 1 Uppercase, 1 Symbol, 1 Lowercase | required |
                        
- Example request:
   ```json
    {
        "name": "tes",
        "email": "tes@mail.com",
        "password": "P@ssw0rd"
    }
   ```
       
- Response:
  `status`: `201`
  
  | Parameter | Type   | Description                   |
  |-----------|--------|-------------------------------|
  | code      | number | 0: Error, 1: Success          |
  | Message   | string | title/ description            |
  | data      | object | the parameters explained next |      
  
  data parameter:
    
  | Parameter | Type   | Description   |
  |-----------|--------|---------------|
  | id        | string | user id       |
  | name      | string | name of user  |
  | email     | string | email of user |
    
- Example response:
  ```json
     {
         "code": 1,
         "message": "Berhasil terdaftar",
         "data": {
             "id": "5f7fbf3fcac0d20b1019dd7f",
             "name": "tes",
             "email": "tesstes@mail.com"
         }
     }
    ```
#### POST /auth/login
- Body Parameter

  | Parameter | Type   | Description                                                                                   | Required |
  |-----------|--------|-----------------------------------------------------------------------------------------------|----------|
  | email     | string | email of user                                                                                 | required |
  | password  | string | Password of user, Min 8 char, Must have at least 1 Number, 1 Uppercase, 1 Symbol, 1 Lowercase | required |
                        
- Example request:
   ```json
    {
        "email": "tes@mail.com",
        "password": "P@ssw0rd"
    }
   ```
       
- Response:
   `status`: `200`
   
  | Parameter | Type   | Description                   |
  |-----------|--------|-------------------------------|
  | code      | number | 0: Error, 1: Success          |
  | Message   | string | title/ description            |
  | data      | object | the parameters explained next |      
  
  data parameter:
    
  | Parameter | Type   | Description   |
  |-----------|--------|---------------|
  | token     | string | token of user |
    
- Example response:
  ```json
     {
         "code": 1,
         "message": "Login Berhasil",
         "data": {
             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWY3ZTZkYmM3Nzc0NTM1MjgwOTlhN2I3IiwiaWF0IjoxNjAyMjA3OTMxLCJleHAiOjE2MDI4MTI3MzF9.rwetXUrLmxQoaEF7LJxBgBc-p_isD1Tk8HRrKSK_-LY"
         }
     }
    ```
  
  ## 2. Todo
  - Header parameter
  
    | Parameter       | Type   | Description                                           | Required |
    |-----------------|--------|-------------------------------------------------------|----------|
    | Accept-Language | string | id = Indonesian, en = English                         | Optional |
    | Authorization   | string | users token, (ex : "token eyJhbGciOiJIUzI1NiIsInR5c") | Required |
  
  #### POST /todo
  - Body Parameter
  
    | Parameter | Type   | Description | Required |
    |-----------|--------|-------------|----------|
    | title     | string | todo title  | required |
                          
  - Example request:
     ```json
      {
          "title": "todo example"
      }
     ```
         
  - Response:
     `status`: `201`
     
    | Parameter | Type   | Description                   |
    |-----------|--------|-------------------------------|
    | code      | number | 0: Error, 1: Success          |
    | Message   | string | title/ description            |
    | data      | object | the parameters explained next |      
    
    data parameter:
      
    | Parameter | Type   | Description  |
    |-----------|--------|--------------|
    | id        | string | todos id     |
    | title     | string | todos title  |
    | status    | string | todos status |
      
  - Example response:
    ```json
       {
           "code": 1,
           "message": "Berhasil dibuat",
           "data": {
               "id": "5f7fe0970abdc80f3c2662cc",
               "title": "todo example",
               "status": "undone"
           }
       }
    ```
  
  #### GET /todo/user
    
  - Query Parameter
  
    | Parameter | Type   | Description                       | Required |
    |-----------|--------|-----------------------------------|----------|
    | q         | string | todo title                        | required |
    | filter    | string | todo status (ex: done,undone,all) | Optional |
                          
  - Example request:
     
     ```/todo/user?q=todo&filter=undone```
         
  - Response:
    `status`: `200`
    
    | Parameter | Type   | Description                   |
    |-----------|--------|-------------------------------|
    | code      | number | 0: Error, 1: Success          |
    | Message   | string | title/ description            |
    | data      | Array  | the parameters explained next |      
    
    data parameter:
      
    | Parameter | Type   | Description  |
    |-----------|--------|--------------|
    | status    | string | todos status |
    | _id       | string | todos id     |
    | title     | string | todos title  |
    | user      | object | user details |
    
    user parameter:
    
    | Parameter | Type   | Description   |
    |-----------|--------|---------------|
    | id        | string | user id       |
    | name      | string | name of user  |
    | email     | string | email of user |
      
  - Example response:
    ```json
       {
           "code": 1,
           "message": "todo",
           "data": [
               {
                   "status": "undone",
                   "_id": "5f7fdfe070c4c80f0c201225",
                   "title": "todo3 example",
                   "user": {
                       "_id": "5f7e6dbc777453528099a7b7",
                       "name": "Michael",
                       "email": "michael@mail.com"
                   },
                   "created_at": "2020-10-09T03:58:24.311Z",
                   "updated_at": "2020-10-09T03:58:24.311Z",
                   "__v": 0
               }
           ]
       }
    ```

  #### GET /todo/:id
  
  - Url Parameter
    
      | Parameter | Type   | Description | Required |
      |-----------|--------|-------------|----------|
      | :id       | string | todo id     | required |
                         
  - Example request:
     
     ```/todo/5f7fdfe070c4c80f0c201225```
         
  - Response:
    `status`: `200`
    
    | Parameter | Type   | Description                   |
    |-----------|--------|-------------------------------|
    | code      | number | 0: Error, 1: Success          |
    | Message   | string | title/ description            |
    | data      | object  | the parameters explained next |      
    
    data parameter:
      
    | Parameter | Type   | Description  |
    |-----------|--------|--------------|
    | status    | string | todos status |
    | _id       | string | todos id     |
    | title     | string | todos title  |
    | user      | object | user details |
    
    user parameter:
    
    | Parameter | Type   | Description   |
    |-----------|--------|---------------|
    | _id       | string | user id       |
    | name      | string | name of user  |
    | email     | string | email of user |
      
  - Example response:
    ```json
       {
           "code": 1,
           "message": "Todo",
           "data": {
               "status": "undone",
               "_id": "5f7fdfe070c4c80f0c201225",
               "title": "todo3 example",
               "user": {
                   "_id": "5f7e6dbc777453528099a7b7",
                   "name": "Michael",
                   "email": "michael@mail.com"
               }
           }
       }
    ```  

  #### PUT /todo/:id
  
  - Url Parameter
    
      | Parameter | Type   | Description | Required |
      |-----------|--------|-------------|----------|
      | :id       | string | todo id     | required |
                         
  - Example request:
     
     ```/todo/5f7fdfe070c4c80f0c201225```
         
  - Response:
    `status`: `200`
    
    | Parameter | Type    | Description                   |
    |-----------|---------|-------------------------------|
    | code      | number  | 0: Error, 1: Success          |
    | Message   | string  | title/ description            |
    | data      | object  | the parameters explained next |      
    
    data parameter:
      
    | Parameter | Type   | Description  |
    |-----------|--------|--------------|
    | status    | string | todos status |
    | _id       | string | todos id     |
    | title     | string | todos title  |
    | user      | object | user details |
    
    user parameter:
    
    | Parameter | Type   | Description   |
    |-----------|--------|---------------|
    | _id       | string | user id       |
    | name      | string | name of user  |
    | email     | string | email of user |
      
  - Example response:
    ```json
       {
           "code": 1,
           "message": "Berhasil diperbaharui",
           "data": {
               "status": "done",
               "_id": "5f7fdfe070c4c80f0c201225",
               "title": "todo 21",
               "user": {
                   "_id": "5f7e6dbc777453528099a7b7",
                   "name": "Michael",
                   "email": "michael@mail.com"
               }
           }
       }
    ```      
    
  #### DELETE /todo/:id
  
  - Url Parameter
    
      | Parameter | Type   | Description | Required |
      |-----------|--------|-------------|----------|
      | :id       | string | todo id     | required |
                         
  - Example request:
     
     ```/todo/5f7fdfe070c4c80f0c201225```
         
  - Response:
    `status`: `200`
    
    | Parameter | Type    | Description                   |
    |-----------|---------|-------------------------------|
    | code      | number  | 0: Error, 1: Success          |
    | Message   | string  | title/ description            |
    | data      | object  | the parameters explained next |      
    
    data parameter:
      
    | Parameter | Type   | Description  |
    |-----------|--------|--------------|
    | status    | string | todos status |
    | _id       | string | todos id     |
    | title     | string | todos title  |
    | user      | object | user details |
    
    user parameter:
    
    | Parameter | Type   | Description   |
    |-----------|--------|---------------|
    | _id       | string | user id       |
    | name      | string | name of user  |
    | email     | string | email of user |
      
  - Example response:
    ```json
       {
           "code": 1,
           "message": "Berhasil dihapus",
           "data": {
               "status": "undone",
               "_id": "5f7fdbe8f6d1150e3d9210a8",
               "title": "todo example"
           }
       }
    ``` 