const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Tienda"
});

app.post("/create", (req, res)=>{
    const { sku, articulo, marca, modelo, departamento, clase, familia, fecha_alta, stock, 
        cantidad, descontinuado, fecha_baja } = req.body;

    db.query('INSERT INTO articulos (sku, articulo, marca, modelo, departamento, clase, familia, fecha_alta, stock, cantidad, descontinuado, fecha_baja) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[sku, articulo, marca, modelo, departamento, clase, familia, fecha_alta, stock, cantidad, descontinuado, fecha_baja],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send("Articulo registrado");
            }
        }
    );
    

});



app.get("/articulos", (req, res)=>{

    db.query('SELECT * FROM articulos',
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
                res.send(result);
            }
        }
    );
    

});

app.get('/departamentos', (req, res) => {
    db.query('SELECT * FROM departamentos', (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () => {
    console.log("Corriendo en el puerto 3001")
})