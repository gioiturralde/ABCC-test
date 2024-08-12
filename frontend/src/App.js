import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateString = `${year}-${month}-${day}`;

  //constantes que capturan el input
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

  //componentes
  const [listaArticulos, setArticulos] = useState([]);
  const [listaDepartamentos, setDepartamentos] = useState([]);
  const [listaClases, setClases] = useState([]);
  const [listaFamilias, setFamilias] = useState([]);


//funcion para agregar articulo
  const agregar = ()=>{
    Axios.post("http://localhost:3001/create", {
      sku:sku,
      articulo:articulo,
      marca:marca,
      modelo:modelo,
      departamento:departamento,
      clase:clase,
      familia:familia,
      fechaalta:fechaalta,
      stock:stock,
      cantidad:cantidad,
      descontinuado:descontinuado,
      fechabaja:fechabaja
    }).then(()=>{
      getArticulos();
      alert("Articulo registrado");
    });
  }

//funcion para mostrar articulos
  const getArticulos = ()=>{
    Axios.get("http://localhost:3001/articulos").then((response)=>{
      setArticulos(response.data);
    });
  }

  //obtener departamentos
  const getDepartamentos = ()=>{
    Axios.get("http://localhost:3001/departamentos").then((response)=>{
      setDepartamentos(response.data);
    });
  }

  //obtener clases
  const getClases = (departamentoId) => {
    Axios.get(`http://localhost:3001/clases?departamento_id=${departamentoId}`)
      .then((response) => {
        setClases(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener clases', error);
      });
  };

 
  useEffect(() => {
    getDepartamentos();
  }, []);


  useEffect(() => {
    if (departamento) {
      getClases(departamento);
    } else {
      setClases([]);
    }
  }, [departamento]);

  // Obtener familias basado en la clase seleccionada
  const getFamilias = (claseId) => {
    Axios.get(`http://localhost:3001/familias?clase_id=${claseId}`)
      .then((response) => {
        setFamilias(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener familias', error);
      });
  };
  
  // Fetch clases when departamento changes
  useEffect(() => {
    if (departamento) {
      getClases(departamento);
    } else {
      setClases([]); // Clear classes if no department is selected
      setClase(''); // Reset selected class
      setFamilias([]); // Clear families if no department is selected
    }
  }, [departamento]);

  // Fetch familias when clase changes
  useEffect(() => {
    if (clase) {
      getFamilias(clase);
    } else {
      setFamilias([]); // Clear families if no class is selected
    }
  }, [clase]);


  
//funcion para eliminar articulo
//funcion para modificar articulo

  return (
    <div class="container">
    <div className="App">


    </div>
        <div class="card text-center">
      <div class="card-header">
        Featured
      </div>
      <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">SKU</span>
          <input type="number" className="form-control" 
                  onChange={(event)=>{
                    setSku(event.target.value);
                  }}
          placeholder="SKU" aria-describedby="basic-addon1"/>
        </div>
        
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Articulo</span>
          <input type="text" className="form-control" 
                  onChange={(event)=>{
                    setArticulo(event.target.value);
                  }}
          placeholder="Articulo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Marca</span>
          <input type="text" className="form-control" 
                  onChange={(event)=>{
                    setMarca(event.target.value);
                  }}
          placeholder="Marca" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Modelo</span>
          <input type="text" className="form-control" 
                  onChange={(event)=>{
                    setModelo(event.target.value);
                  }}
          placeholder="Articulo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
        <label className="input-group-text" for="inputGroupSelect01">Departamento</label>
          <select className="form-select" id="inputGroupSelect01"
          onChange={(event) => setDepartamento(event.target.value)}
            aria-describedby="basic-addon1">
            <option selected></option>
            {listaDepartamentos.map(departamentos => (
            <option key={departamentos.id} value={departamentos.id}>
            {departamentos.id} - {departamentos.nombre}
          </option>
        ))}
          </select>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <label className="input-group-text">Clase</label>
          <select
            className="form-select"
            disabled={!departamento}>
            <option value="" ></option>
            {listaClases.map(clase => (
              <option key={clase.id} value={clase.id}>
                {clase.id} - {clase.nombre}
              </option>
            ))}
          </select>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <label className="input-group-text" id="basic-addon1">Familia</label>
          <select
          className="form-select"
          disabled={!clase}>
          <option value=""></option>
          {listaFamilias.map(familia => (
            <option key={familia.id} value={familia.id}>
              {familia.id} - {familia.nombre}
            </option>
          ))}
        </select>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Familia</span>
          <input type="number" className="form-control" 
                  onChange={(event)=>{
                    setFamilia(event.target.value);
                  }}
          placeholder="Articulo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Fecha Alta</span>
          <input type="date" className="form-control" placeholder="Articulo" aria-describedby="basic-addon1" disabled/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Stock</span>
          <input type="number" className="form-control" 
                  onChange={(event)=>{
                    setStock(event.target.value);
                  }}
          placeholder="Articulo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Cantidad</span>
          <input type="number" className="form-control" 
                  onChange={(event)=>{
                    setCantidad(event.target.value);
                  }}
          placeholder="Articulo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Descontinuado</span>
          <input type="text" className="form-control" placeholder="Articulo" aria-describedby="basic-addon1" disabled/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Fecha Baja</span>
          <input type="date" className="form-control" placeholder="Articulo" aria-describedby="basic-addon1" disabled/>
        </div>
        </div>
        <button className='btn btn-success' onClick={agregar}>Registrar</button>
        <div class="lista">
      <button className="btn btn-outline-primary"
       onClick={getArticulos}>Consultar</button>
      {
        listaArticulos.map((val,key)=>{
          return <div class="">{val.articulo}</div> 
        })
      }
     </div>
      </div>
    </div>
    </div>
  );
};

export default App;
