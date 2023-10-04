## **Express Shopping List**

This is a simple JSON API built with **Express.js**. It provides CRUD operations for a basic shopping list. The data is transient and is stored in an array; meaning it does not persist if the server restarts. Ideal for temporary storage and learning purposes.

### **Tech Stack**

- **Express.js**: For setting up the server and routes.
- **Supertest**: For integration testing of routes.
  
### **Architecture**

- **Routes**: All the route handling is abstracted into a separate module using Express Router for cleaner and more modular code.
- **Middleware**: Custom middleware (like error handlers) are used to handle and manage different edge cases and server errors.
- **fakeDb.js**: This file acts as a temporary database, containing an array to store items.

### **Endpoints**

1. **GET /items**  
   Fetches all shopping items.

   *Response*:  
   `[{“name”: “popsicle”, “price”: 1.45}, {“name”:”cheerios”, “price”: 3.40}]`

2. **POST /items**  
   Adds an item to the shopping list.  
   
   *Request*:  
   `{“name”:”popsicle”, “price”: 1.45}`  
   
   *Response*:  
   `{“added”: {“name”: “popsicle”, “price”: 1.45}}`

3. **GET /items/:name**  
   Fetches details of a specific item using its name.  
   
   *Response*:  
   `{“name”: “popsicle”, “price”: 1.45}`

4. **PATCH /items/:name**  
   Modifies either name, price, or both for an item.  
   
   *Request*:  
   `{“name”:”new popsicle”, “price”: 2.45}`  
   
   *Response*:  
   `{“updated”: {“name”: “new popsicle”, “price”: 2.45}}`

5. **DELETE /items/:name**  
   Deletes a specific item by its name.

### **Testing**

Integration testing is performed using **Supertest**. Which helps in ensuring that all routes are functioning as expected. 

### **Getting Started**

1. **Setup**:  
   Clone the repository and install dependencies using `npm install`.

2. **Run**:  
   Start the server using `npm start`.

3. **Testing**:  
   To run tests, use the command:

```bash
npm test
```
