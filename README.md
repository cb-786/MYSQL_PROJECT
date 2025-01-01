<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
</head>
<body>
  <h1>CRUD Operations with MySQL and Express</h1>

  <h2>Project Overview</h2>
  <p>This project demonstrates how to implement CRUD (Create, Read, Update, Delete) operations using MySQL, Express, and Node.js. It integrates Faker.js to generate mock data and establishes a database connection for data manipulation.</p>

  <h2>Key Features</h2>
  <ul>
    <li>Database connection established with MySQL using <code>mysql2</code> package.</li>
    <li>Routes implemented to handle CRUD operations.</li>
    <li>Dynamic HTML rendering using EJS.</li>
    <li>Faker.js used for generating sample data.</li>
    <li>Method override for HTTP PATCH and DELETE requests.</li>
  </ul>

  <h2>Routes and Paths</h2>
  <ul>
    <li><strong>Home:</strong> <code>/</code> - Displays the total user count.</li>
    <li><strong>View Users:</strong> <code>/users</code> - Lists all users.</li>
    <li><strong>Create User:</strong> <code>/user/new</code> (GET) - Form to add a new user.</li>
    <li><strong>Add User:</strong> <code>/user/new</code> (POST) - Adds a new user to the database.</li>
    <li><strong>Edit User:</strong> <code>/user/:id/edit</code> (GET) - Displays a form to edit user details.</li>
    <li><strong>Update User:</strong> <code>/users/:id</code> (PATCH) - Updates user details.</li>
    <li><strong>Delete User:</strong> <code>/user/:id/delete</code> (GET) - Displays confirmation page for deletion.</li>
    <li><strong>Confirm Delete:</strong> <code>/user/:id</code> (DELETE) - Deletes a user from the database.</li>
  </ul>

  <h2>Technologies Used</h2>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MySQL</li>
    <li>Faker.js</li>
    <li>UUID for unique identifiers</li>
    <li>Method Override</li>
  </ul>

  <h2>Learning Outcomes</h2>
  <p>During the development of this project, I learned:</p>
  <ul>
    <li>How to connect to a MySQL database using Node.js and MySQL2.</li>
    <li>Writing SQL queries for CRUD operations.</li>
    <li>Handling errors and validating user inputs.</li>
    <li>Implementing dynamic routing and middleware in Express.</li>
    <li>Using CLI, SQL scripts, Workbench, and VSCode for database management.</li>
  </ul>

  <h2>Installation</h2>
  <pre>
    npm install
    npm install express mysql2 ejs method-override faker@7 uuid
  </pre>

  <h2>Usage</h2>
  <pre>
    node index.js
  </pre>
  <p><strong>Note:</strong> The loop for Faker.js data generation has been commented out in the code. You must uncomment and run this loop at least once to populate your database with sample data before using the application.</p>

  <h2>Database Setup</h2>
  <pre>
    CREATE DATABASE mysql2;
    CREATE TABLE user (
      id VARCHAR(255) PRIMARY KEY,
      username VARCHAR(255),
      email VARCHAR(255),
      password VARCHAR(255)
    );
  </pre>

 
</body>
</html>
