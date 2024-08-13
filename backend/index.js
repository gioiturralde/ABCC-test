const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const moment = require('moment');

app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"Tienda"
});


app.post("/create", (req, res)=>{
    const { sku, articulo, marca, modelo, departamento, clase, familia, fechaalta, stock, 
        cantidad, descontinuado, fechabaja } = req.body;

    db.query('INSERT INTO articulos (sku, articulo, marca, modelo, departamento, clase, familia, fecha_alta, stock, cantidad, descontinuado, fecha_baja) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',[sku, articulo, marca, modelo, departamento, clase, familia, fechaalta, stock, cantidad, descontinuado, fechabaja],
        (err, result)=>{
            if(err){
                console.log(err);
            }else{

                res.send("Articulo registrado");
            }
        }
    );
    

});

app.delete("/delete/:sku", (req, res)=>{
  const { sku } = req.params;
  db.query('DELETE FROM articulos WHERE sku=?',[sku], 
      (err, result)=>{
          if(err){
              console.log(err);
          }else{
              res.send("empleado eliminado");
          }
      }
  );
  

});

app.put("/update/:sku", (req, res)=>{
  const { articulo, marca, modelo, departamento, clase, familia, stock, 
      cantidad, descontinuado } = req.body;
  const { sku } = req.params;
  db.query('UPDATE articulos SET articulo=?, marca=?, modelo=?, departamento=?, clase=?, familia=?, stock=?, cantidad=?, descontinuado=? WHERE sku=?',[articulo, marca, modelo, departamento, clase, familia, stock, cantidad, descontinuado, sku],
      (err, result)=>{
          if(err){
              console.log(err);
          }else{

              res.send("empleado actualizado");
          }
      }
  );
  

});

app.get("/articulo", (req, res)=>{

  const sku =req.body.value;
    db.query('SELECT * FROM articulos',
        (err, result)=>{
            if(err){
                console.log(err);
            }else{
              //console.log(sku);
                res.send(result);

            }
        }
    );

    app.get('/articulo/:sku', (req, res) => {
      const { sku } = req.params;
      db.query('SELECT * FROM articulos WHERE sku = ?', [sku], (err, result) => {
        if (err) {
          console.error('Error al obtener el artículo', err);
          res.status(500).send('Error al obtener el artículo');
        } else if (result.length > 0) {
          result[0].fecha_alta = moment(result[0].fecha_alta).format('YYYY-MM-DD');
          result[0].fecha_baja = moment(result[0].fecha_baja).format('YYYY-MM-DD');
          res.json(result[0]);
        } else {
          res.status(404).send('Artículo no encontrado');
        }
      });
    });
    

});


app.get('/departamentos', (req, res) => {
    db.query('SELECT * FROM departamentos', (err, result) => {
      if (err) {
        console.log("Error al obtener clases" , err);
      } else {
        res.send(result);
      }
    });
  });

  app.get('/clases', (req, res) => {
    const departamentoId = req.query.departamento_id;
    db.query('SELECT * FROM clases WHERE departamento_id = ?', [departamentoId], (err, results) => {
      if (err) {
        console.error('Error al obtener clases', err);
        res.status(500).send('Error al obtener clases');
      } else {
        res.json(results);
      }
    });
  });

  app.get('/familias', (req, res) => {
    const claseId = req.query.clase_id;
    db.query('SELECT * FROM familias WHERE clase_id = ?', [claseId], (err, results) => {
      if (err) {
        console.error('Error al obtener familias', err);
        res.status(500).send('Error al obtener familias');
      } else {
        res.json(results);
      }
    });
  });


app.listen(3001, (req) => {
    console.log("Corriendo en el puerto 3001")

})