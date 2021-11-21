# Student Registration APIs

To start the application locally, follow the steps below

1. Create /config/db.config.js with the following content
      ```
      const HOST = <YOUR_MYSQL_DB_HOST>
      const USER = <YOUR_DB_USERNAME>
      const PASSWORD = <YOUR_DB_PASSWORD>
      const DB = <YOUR_DB_NAME>
      export default {
          HOST,
          USER,
          PASSWORD,
          DB
      }
      ```

2. Create the database using the database name mentioned in the above config
3. Go to your project directory and run ```npm install```
4. After that run ```npm run devStart``` command to start the application
5. To run the unit test, you may run ```npm test```
