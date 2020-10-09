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
  
  | Parameter | Type   | Description                                      |
  |-----------|--------|--------------------------------------------------|
  | code      | number | 0: Error, 1: Success, 2: Duplicate, 3: Not found |
  | Message   | string | title/ description                               |
  | data      | object | the parameters explained next                    |      
  
  data parameter:
    
  | Parameter | Type   | Description                 |
  |-----------|--------|-----------------------------|
  | id        | string | user id (mongodb object id) |
  | name      | string | name of user                |
  | email     | string | email of user               |
    
- Example response:
  `status`: `201`
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
  
  | Parameter | Type   | Description                                      |
  |-----------|--------|--------------------------------------------------|
  | code      | number | 0: Error, 1: Success, 2: Duplicate, 3: Not found |
  | Message   | string | title/ description                               |
  | data      | object | the parameters explained next                    |      
  
  data parameter:
    
  | Parameter | Type   | Description   |
  |-----------|--------|---------------|
  | token     | string | token of user |
    
- Example response:
  `status`: `200`
  ```json
     {
         "code": 1,
         "message": "Login Berhasil",
         "data": {
             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoiNWY3ZTZkYmM3Nzc0NTM1MjgwOTlhN2I3IiwiaWF0IjoxNjAyMjA3OTMxLCJleHAiOjE2MDI4MTI3MzF9.rwetXUrLmxQoaEF7LJxBgBc-p_isD1Tk8HRrKSK_-LY"
         }
     }
    ```