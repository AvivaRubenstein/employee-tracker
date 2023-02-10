# 12 SQL: Employee Tracker

## Description

This application is an Employee Tracker.  It allows users to view tables of data about the employees in their company, and to add and update information pertaining to these employees.
Through building this project, I learned to use MYSQL to create schemas, seed a database, and query data using SQL files.  I also learned to use node.js to query the database, utlizing javascript to execute the necessary queries for all of the required CRUD operations.  I also learned to use Console.table to return javascript data as a table in the console, instead of in standard javascript object formatting.

## Installation

First, run "npm install" to install the project's dependencies through Node.
Then, from the terminal in the db folder, run "mysql -u root -p" and enter your password.
Next, run "source schema.sql" to set up our database, and then run "source seeds.sql" to seed data into the database.
After that, you can move back into the project's main folder and run "node index.js" in the terminal to start the application.

## Usage

After starting the application using the "node index.js" command in the terminal, you will be prompted to choose from a list of options.  You can select one of the options to either view existing data in the database in table format, or to add to or edit information in the database.  When you opt to add or edit information, you will be prompted to answer further questions about the information you would like to add or change.  After you answer those questions, the updates will be made.  You will be presented with the menu again after you have completed your initial selection, until you ultimately decide to select "Exit", at which point the application will stop running.

Watch the video linked below to see the application in action:
https://watch.screencastify.com/v/sVYyBtWkCJEUAinH33vs

## Credits

This application used the MYSQL2 package, the Console.Table package, and in Inquirer package from Node.js.  I also used DBeaver to view my database as it developed.

## License

See LICENSE.TXT file in repository.

---

