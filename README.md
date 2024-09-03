# **Backend Developer Assessment**

## **Project Overview**

This project is a StackOverflow clone that allows users to register, authenticate, post questions, provide answers, and rate both questions and answers. The backend is built using Node.js, Express.js, Sequelize ORM, MySQL, and TypeScript for strong typing. The project includes functionalities such as pagination, global error handling.

## **Table of Contents**

1. [Installation and Configuration](#installation-and-configuration)
2. [Database Setup](#database-setup)
3. [Assumptions Made](#assumptions-made)
4. [Source Code Preparation](#source-code-preparation)
5. [Testing](#testing)
6. [Issues Faced](#issues-faced)
7. [Documentation](#documentation)



## **1. Installation and Configuration**

### **Prerequisites**

- **Node.js**: Ensure you have Node.js (v14.x or higher) installed.
- **MySQL**: Install MySQL for database management.

### **Installing Node.js Dependencies**

1. **Clone the Repository:**
   ```bash
   git clone https://gitlab.com/kora-assessment/be-ayobami-adeleke.git
    ```
2. **Install Node.js Dependencies:**
   ```bash
   npm install 
    ```
### **Environment configuration**
1. create a .env file and copy the content of the env.sample file then add your environment variables.
2. ```bash
   npm start
    ```

---

## **2. Database Setup**

### **Creating and Initializing the Database**

1. **Create the Database:**
   - Ensure you have MySQL installed on your machine.
   - Create a database using the following command:
     ```bash
     CREATE DATABASE stackoverflow_clone;
     ```

2. **Run Migrations:**
   - Navigate to the project root directory.
   - Run the following command to apply all migrations and set up the database schema:
     ```bash
     npx sequelize-cli db:migrate
     ```

3. **Seeding the Database (Optional):**
   - If you have seed data available, run:
     ```bash
     npx sequelize-cli db:seed:all
     ```

---

## **3. Assumptions Made**

- **Rating System**: I assumed that each user can only rate a question or answer once to prevent rating manipulation.

- **Authentication**: JWT is used for user authentication, assuming tokens are short-lived and securely stored on the client-side.

- **Error Handling**: A global error handler is implemented to standardize error responses across the API.

## **4. Source Code Preparation**

### **Building the Application**

Compile TypeScript into JavaScript:
```bash
npm run build
```
Start the server:
```bash
npm run test
```

## **5. Testing**

### **Running Tests**
- Setup test DB by copying the contents of the sample.env.test file into a file names env.test and add your variables
- To execute unit and integration tests, use:
```bash
npm run test
```
### **Test coverage**
- To check the test coverage, run:
```bash
npm run test:coverage
```

## **6. Issues Faced**

### **TypeScript Configuration**
- Initially, I encountered issues with TypeScript configurations, particularly with decorator usage in Sequelize models. This required adjusting `tsconfig.json` and installing additional types.

### **Testing Database**
- Setting up a separate database environment for testing posed challenges, especially in ensuring that migrations were correctly applied.

## **7. Documentation**

Comprehensive documentation of the API endpoints is available on Postman. You can access it at: [Postman Documentation](https://documenter.getpostman.com/view/5091328/2sAXjNXWDe)





