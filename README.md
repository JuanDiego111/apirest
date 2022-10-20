# apirest
develop my fist api rest  on NodeJS, with express, body-parser, mysql2, pool-mysql, ejs, and relational database
first clone this repository
second npm install
third change credentials on "password" = 
          var pool= mysql.createPool({
            connectionLimit:20,
            host: 'localhost',
              user: 'root',
              password: 'password',
              database: 'videojuegos'
          })
foruth create a mysql database videojuegos with table juegos (id, nombre, puntos, niveles) ventas (id, monto)
finally npm run dev and set up the data base with on localhost:2903
