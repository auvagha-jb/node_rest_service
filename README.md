# node_rest_service
A Simple REST Service Made with node.js and express and PHP proxy 

# Requirements
* Node.js
* PHP >=7
* XAMPP Server or its equivalent

# Runnning the app

## Configure the Server
<p>Before you start, make sure you edit the api/env.js file with the necessary params</p>

<code>
const env = {
    DB_HOST: 'localhost', 
    DB_USER:"<your_username>",
    DB_PASS: "<your_password>",
    DB_NAME: "<your_database_name>"
}
</code>

<p>After you have made the appropriate changes, create a database with the same name as specified above<p>

## Install dev dependencies (For the first run)
Run the following commands in your terminal from the **root directory** of the project 

<p>Navigate to the api folder</p>
<p>
  <code>cd api</code>
</p>

<p>Install the dev dependencies</p>
<p>
  <code>npm install</code>
</p>


## Start the server
<p>From the /api directory run the following command</p>
<p>
  <code>npm run dev</code>
</p>



