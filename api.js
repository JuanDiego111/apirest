const express= require('express')
const app= express()
const bodyParser=require('body-parser')
const mysql= require('mysql')



var pool= mysql.createPool({
  connectionLimit:20,
  host: 'localhost',
    user: 'root',
    password: 'Xeraton246810',
    database: 'videojuegos'
})

app.set('view engine', 'ejs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.get('/juegos', function (pet,res) { 

    pool.getConnection(function(err,connec){

        const query = `SELECT * FROM juegos`
        connec.query(query, function(error, filas, campos){
            res.render('index2', {juegos: filas})
        })
        connec.release()
    })
 })


app.get('/',function(pet,res){

    pool.getConnection(function(err,connec){

        const query = `SELECT juegos.id AS id, juegos.nombre, juegos.puntos, juegos.niveles, ventas.monto FROM juegos INNER JOIN ventas ON juegos.id=ventas.id ORDER BY juegos.id`
        connec.query(query, function(error, filas, campos){
            res.render('index', {juegos: filas})
        })
        connec.release()
    })
})

app.get('/ingresar',function(pet,res){
            res.render('ingresar')

})


app.get('/act-form',function(pet,res){


    pool.getConnection(function(err,connec){

        const query = `SELECT * FROM juegos WHERE id= ${connec.escape(pet.query.id)}`
        connec.query(query, function(error, filas, campos){
            res.render('actualizar', {juegos: filas[0]})
        })
        connec.release()
    })



})

app.get('/del-form',function(pet,res){


    pool.getConnection(function(err,connec){

        const query = `DELETE FROM juegos WHERE id=${connec.escape(pet.query.id)}`
        connec.query(query, function(error, filas, campos){
            res.redirect('/')
        })
        connec.release()
    })



})




app.post('/ingresar_juego',function(pet,res){

    pool.getConnection(function(err,connec){

        const query = `INSERT INTO juegos (id,nombre,puntos,niveles) VALUES (${connec.escape(pet.body.id)},${connec.escape(pet.body.nombre)},
        ${connec.escape(pet.body.puntos)},${connec.escape(pet.body.niveles)})`
        const query2=`INSERT INTO ventas (id,monto) VALUES (${connec.escape(pet.body.id)},${connec.escape(pet.body.monto)})`
        connec.query(query, function(error, filas, campos){
            console.log(query)
            connec.query(query2, function(error, filas, campos){
                console.log(query2)
            
            res.redirect("/")
        })
        })
        connec.release()
    })
})


app.post('/actualizar-juego',function(pet,res){

    pool.getConnection(function(err,connec){

        const query = `UPDATE juegos SET nombre= ${connec.escape(pet.body.nombre)},puntos= ${connec.escape(pet.body.puntos)}, niveles= ${connec.escape(pet.body.niveles)} WHERE id=${connec.escape(pet.body.id)}`
        connec.query(query, function(error, filas, campos){
            res.redirect("/")
        })
        connec.release()
    })
})




app.listen(2903, function(){
    console.log("servidor iniciado")
})