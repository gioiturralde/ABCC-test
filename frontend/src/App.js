import './App.css';
import {useState} from "react"
function App() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
  const day = String(now.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  const[sku,setSku] = useState("");
  const[articulo,setArticulo] = useState("");
  const[marca,setMarca] = useState("");
  const[modelo,setModelo] = useState("");
  const[departamento,setDepartamento] = useState("");
  const[clase,setClase] = useState("");
  const[familia,setFamilia] = useState("");
  const[fechaalta,setFechaAlta] = useState(dateString);
  const[stock,setStock] = useState("");
  const[cantidad,setCantidad] = useState("");
  const[descontinuado,setDescontinuado] = useState(0);
  const[fechabaja,setFechaBaja] = useState("1900-01-01");

  const mostrarDatos = ()=>{
    alert(sku);
  }
  


  return (
    <div className="App">
     <div className="datos">
      <label>Sku: <input 
        onChange={(event)=>{
          setSku(event.target.value);
        }}
      type="number" id="sku"></input></label><br/>

      <label>Articulo: <input 
              onChange={(event)=>{
                setArticulo(event.target.value);
              }}
      type="text" id="articulo"></input></label><br/>

      <label>Marca: <input 
              onChange={(event)=>{
                setMarca(event.target.value);
              }}
      type="text" id="marca"></input></label><br/>

      <label>Modelo: <input 
              onChange={(event)=>{
                setModelo(event.target.value);
              }}
      type="texto" id="modelo"></input></label><br/>

      <label>Departamento: <input 
              onChange={(event)=>{
                setDepartamento(event.target.value);
              }}
      type="number" id="departamento"></input></label><br/>


      <label>Clase: <input 
              onChange={(event)=>{
                setClase(event.target.value);
              }}
      type="number"id="clase"></input></label><br/>

      <label>Familia: <input 
              onChange={(event)=>{
                setFamilia(event.target.value);
              }}
      type="number" id="familia"></input></label><br/>

      <label>Fecha Alta: <input type="date" id="fechaalta" disabled></input></label><br/>
      <label>Stock: <input 
              onChange={(event)=>{
                setStock(event.target.value);
              }}
      type="number" id="stock"></input></label><br/>

      <label>Cantidad: <input 
              onChange={(event)=>{
                setStock(event.target.value);
              }}
      type="number" id="cantidad"></input></label><br/>

      <label>Descontinuado: <input type="number" id="descontinuado" disabled></input></label><br/>
      <label>Fecha Baja: <input type="date" id="fechabaja" disabled></input></label><br/>
      <button onClick={mostrarDatos}>Registrar</button>

     </div>

    </div>
  );
}

export default App;
