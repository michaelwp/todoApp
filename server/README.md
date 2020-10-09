## API-PAYMENT-SERVICE 
#### Version: 1
- ```API-BASE-URL: http://0.0.0.0:8093/api/v1```

-------

### List of available endpoints:

#### invoices
- `POST /invoices`
- `GET /invoices`

#### Error response format:
 - `status`: `4xx`,`5xx`
 - ```json 
   {
       "code": 0,
       "message": "...",
       "data": null
   }
   ```
   
#### POST /invoices
- Body Parameter

  | Parameter         | Type    | Description                                                                                                       | Required | Default |
  |-------------------|---------|-------------------------------------------------------------------------------------------------------------------|----------|---------|
  | project_id        | number  | ID of your project                                                                                                | required |         |
  | external_id       | string  | ID of your choice (typically the unique identifier of an invoice in your system)                                  | required |         |
  | payer_email       | string  | Email of the end user you're charging                                                                             | required |         |
  | description       | string  | Description of the invoice                                                                                        | required |         |
  | amount            | number  | Amount on the invoice. The minimum amount to create an invoice is 1 IDR or PHP                                    | required |         |
  | should_send_email | boolean | Specify whether you want us to email the end customer when an invoice is created, paid, or expired                | optional | false   |
  | invoice_duration  | number  | Duration of time that the end customer is given to pay the invoice before expiration (in seconds, since creation) | optional | 21600   |
  | payment_methods   | string  | Choice of payment channels that is available in your account. example :"BCA"                                      | required |         |  
                        
- Example request:
   ```json
    {
       "project_id": 12345,
       "external_id": "KG_12172019155557_228",
       "payer_email": "payer@mail.com",
       "description": "Deposit Kanggo",
       "amount": 9900000,
       "should_send_email": true,
       "invoice_duration": 7200,
       "payment_methods": "BCA"
    }
    ```
       
- Response:
  
  | Parameter | Type   | Description                                      |
  |-----------|--------|--------------------------------------------------|
  | code      | number | 0: Error, 1: Success, 2: Duplicate, 3: Not found |
  | Message   | string | title/ description                               |
  | data      | object | the parameters explained next                    |      
  
  data parameter:
    
  | Parameter    | Type    | Description                                               |
  |--------------|---------|-----------------------------------------------------------|
  | id           | string  | ID of your invoice                                        |
  | project_id   | number  | ID of your project                                        |
  | xendit       | object  | An object of original xendit create invoice response      |
  | is_deleted   | boolean | false: document active, true: document not active         |
  | created_date | date    | An ISO timestamp that tracks when the invoice was created |
  | updated_date | date    | ISO timestamp that tracks when the invoice was updated    |
    
- Example response:
  `status`: `201`
  ```json
     {
         "code": 1,
         "message": "invoice successfully created",
         "data": {
             "id": "5f62af9d318f218661d4dd94",
             "project_id": 12345,
             "xendit": {
                 "id": "5f62af9d623b5b40350f9997",
                 "user_id": "5d9ee19efe36c33de6db1d9e",
                 "external_id": "KG_12172019155557_228",
                 "status": "PENDING",
                 "merchant_name": "PT Tenaga Kanggo Indonesia",
                 "merchant_profile_picture_url": "https://xnd-companies.s3.amazonaws.com/prod/1577092978050_468.jpg",
                 "amount": 9900000,
                 "payer_email": "payer@mail.com",
                 "description": "Deposit Kanggo",
                 "invoice_url": "https://checkout-staging.xendit.co/web/5f62af9d623b5b40350f9997",
                 "expiry_date": "2020-09-17T09:36:45.219+07:00",
                 "available_banks": [
                     {
                         "bank_code": "BCA",
                         "collection_type": "POOL",
                         "bank_account_number": "1076630849378",
                         "transfer_amount": 9900000,
                         "bank_branch": "Virtual Account",
                         "account_holder_name": "PT TENAGA KANGGO INDONESIA"
                     }
                 ],
                 "available_retail_outlets": null,
                 "should_exclude_credit_card": true,
                 "should_send_email": true,
                 "created": "2020-09-17T07:36:45.265+07:00",
                 "updated": "2020-09-17T07:36:45.265+07:00",
                 "mid_label": "",
                 "currency": "IDR",
                 "fixed_va": false
             },
             "is_deleted": false,
             "created_date": "2020-09-17T07:36:45.381+07:00",
             "updated_date": "2020-09-17T07:36:45.381+07:00"
         }
     }
    ```
#### GET /invoices/{id}
- Params:

  | Parameter | Type    | Description        | Required | Default |
  |-----------|---------|--------------------|----------|---------|
  | id        | string  | ID of your invoice | Optional |         |

- Example request:
  - /invoices/5f619f0cf229bc615492a08d
- Response:
  
  | Parameter | Type   | Description                                      |
  |-----------|--------|--------------------------------------------------|
  | code      | number | 0: Error, 1: Success, 2: Duplicate, 3: Not found |
  | Message   | string | title/ description                               |
  | data      | object | the parameters explained next                    |      
  
  data parameter:
    
  | Parameter    | Type    | Description                                               |
  |--------------|---------|-----------------------------------------------------------|
  | id           | string  | ID of your invoice                                        |
  | project_id   | number  | ID of your project                                        |
  | xendit       | object  | An object of original xendit create invoice response      |
  | is_deleted   | boolean | false: document active, true: document not active         |
  | created_date | date    | An ISO timestamp that tracks when the invoice was created |
  | updated_date | date    | ISO timestamp that tracks when the invoice was updated    |
    
- Example response:
  `status`: `200`
  ```json
     {
         "code": 1,
         "message": "invoice successfully created",
         "data": {
             "id": "5f62af9d318f218661d4dd94",
             "project_id": 12345,
             "xendit": {
                 "id": "5f62af9d623b5b40350f9997",
                 "user_id": "5d9ee19efe36c33de6db1d9e",
                 "external_id": "KG_12172019155557_228",
                 "status": "PENDING",
                 "merchant_name": "PT Tenaga Kanggo Indonesia",
                 "merchant_profile_picture_url": "https://xnd-companies.s3.amazonaws.com/prod/1577092978050_468.jpg",
                 "amount": 9900000,
                 "payer_email": "payer@mail.com",
                 "description": "Deposit Kanggo",
                 "invoice_url": "https://checkout-staging.xendit.co/web/5f62af9d623b5b40350f9997",
                 "expiry_date": "2020-09-17T09:36:45.219+07:00",
                 "available_banks": [
                     {
                         "bank_code": "BCA",
                         "collection_type": "POOL",
                         "bank_account_number": "1076630849378",
                         "transfer_amount": 9900000,
                         "bank_branch": "Virtual Account",
                         "account_holder_name": "PT TENAGA KANGGO INDONESIA"
                     }
                 ],
                 "available_retail_outlets": null,
                 "should_exclude_credit_card": true,
                 "should_send_email": true,
                 "created": "2020-09-17T07:36:45.265+07:00",
                 "updated": "2020-09-17T07:36:45.265+07:00",
                 "mid_label": "",
                 "currency": "IDR",
                 "fixed_va": false
             },
             "is_deleted": false,
             "created_date": "2020-09-17T07:36:45.381+07:00",
             "updated_date": "2020-09-17T07:36:45.381+07:00"
         }
     }
    ```
