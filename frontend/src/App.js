/*
//TODO
//Funcion eliminar y modificar
//Mostrar consulta en los campos de texto $check
//verificar lo del stock
iniciar pidiendo sku
actualizar baja cuando se descontinue un producto
procedimientos almacenados en la bd
guardar base de datos
*/


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
  const fechaDeBaja = "1900-01-01";
  const fechaActual = getCurrentDate();
  //constantes que capturan el input
  const[sku,setSku] = useState("");
  const[articulo,setArticulo] = useState("");
  const[marca,setMarca] = useState("");
  const[modelo,setModelo] = useState("");
  const[departamento,setDepartamento] = useState("");
  const[clase,setClase] = useState("");
  const[familia,setFamilia] = useState("");
  const[fechaalta,setFechaAlta] = useState(fechaActual);
  const[stock,setStock] = useState("");
  const[cantidad,setCantidad] = useState("");
  const[descontinuado,setDescontinuado] = useState(0);
  const[fechabaja,setFechaBaja] = useState(fechaDeBaja);

  const[editar, setEditar] = useState(false);

  //componentes
  const [listaArticulos, setArticulos] = useState("");
  const [listaDepartamentos, setDepartamentos] = useState([]);
  const [listaClases, setClases] = useState([]);
  const [listaFamilias, setFamilias] = useState([]);

  function getCurrentDate() {
    const today = new Date();
    
    // Obtener año, mes y día
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    
    // Formatear en YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }
  

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
      //getArticulos();
      limpiarCampos();
      alert("Articulo registrado");
    });
  }

//funcion para mostrar articulos
  const getArticulo = ()=>{
    Axios.get("http://localhost:3001/articulo/${sku}").then((response)=>{
      setArticulos([response.data]);

    });
  }

  const handleBuscar = () => {
    if (sku) {
      Axios.get(`http://localhost:3001/articulo/${sku}`)
        .then((response) => {
          setArticulos(response.data);
          setArticulo(listaArticulos.articulo);
          setMarca(listaArticulos.marca);
          setModelo(listaArticulos.modelo);
          setDepartamento(listaArticulos.departamento);
          setClase(listaArticulos.clase);
          setFamilia(listaArticulos.familia);
          setStock(listaArticulos.stock);
          setCantidad(listaArticulos.cantidad);
          setFechaAlta(listaArticulos.fecha_alta);
          setFechaBaja(listaArticulos.fecha_baja);
          setDescontinuado(listaArticulos.descontinuado);
        })
        .catch((error) => {
          console.error('Error al obtener el artículo', error);
          // Puedes manejar el error aquí si lo deseas, por ejemplo, mostrando un mensaje al usuario
        });
    }
  };
  const limpiarCampos = ()=>{
    setArticulo("");
    setMarca("");
    setModelo("");
    setDepartamento("");
    setClase("");
    setFamilia("");
    setCantidad("");
    setStock("");
    setFechaAlta(fechaActual);
    setFechaBaja(fechaDeBaja);
    setDescontinuado("");
    setSku("")
  }
  const editarArticulo = (val)=>{
    setEditar(true);

    setArticulo(val.articulo);
    setMarca(val.marca);
    setModelo(val.modelo);
    setDepartamento(val.departamento);
    setClase(val.clase);
    setFamilia(val.familia);
    setCantidad(val.cantidad);
    setStock(val.stock);
    setDescontinuado(val.descontinuado);
    //setSku(val.sku);
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

  useEffect(() => {
    if (departamento) {
      getClases(departamento);
    } else {
      setClases([]); 
      setClase(''); 
      setFamilias([]); 
    }
  }, [departamento]);
 
  useEffect(() => {
    if (clase) {
      getFamilias(clase);
    } else {
      setFamilias([]);
    }
  }, [clase]);


//funcion para eliminar articulo
//funcion para modificar articulo

  return (
    <div className="container">
        <div className="card text-center">
        <button type="button" onClick={limpiarCampos} className="btn btn-danger">Limpiar</button>
      <div className="card-header">
        ABCC Test
      </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">SKU</span>
          <input type="number" className="form-control" value={sku}
                  onChange={(event)=>{
                    setSku(event.target.value);
                  }}
          placeholder="Ingrese SKU" aria-describedby="basic-addon1"/>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" 
                onClick={handleBuscar}
            className="btn btn-success ml-2">Consultar</button>
            <button type="button" className="btn btn-warning">Actualizar</button>
            <button type="button" className="btn btn-danger">Eliminar</button>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Articulo</span>
          <input type="text" required className="form-control" value={articulo}
                  onChange={(event)=>{
                    setArticulo(event.target.value);
                  }}
          placeholder="Ingrese Articulo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Marca</span>
          <input type="text" className="form-control" value={marca}
                  onChange={(event)=>{
                    setMarca(event.target.value);
                  }}
          placeholder="Ingrese Marca" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Modelo</span>
          <input type="text" className="form-control" value={modelo}
                  onChange={(event)=>{
                    setModelo(event.target.value);
                  }}
          placeholder="Ingrese Modelo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
        <label className="input-group-text">Departamento</label>
          <select className="form-select" id="inputGroupSelect01"
          onChange={(event) => setDepartamento(event.target.value)}
            aria-describedby="basic-addon1">
            <option value={departamento}>{departamento? departamento :"Seleccione Departamento"}</option>
            {listaDepartamentos.map(departamentos => (
            <option key={departamentos.id} value={departamentos.id}
            
            >
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
            onChange={(event) => setClase(event.target.value)}
            value={clase}


            disabled={!departamento}>
            <option value="" >Seleccione Clase</option>
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
          onChange={(event) => setFamilia(event.target.value)}
          value={familia}
          disabled={!clase}>
          <option value="">Seleccione Familia</option>
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
          <span className="input-group-text" id="basic-addon1">Fecha Alta</span>
          <input type="date" className="form-control" value={fechaalta} aria-describedby="basic-addon1" disabled/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Stock</span>
          <input type="number" className="form-control" value={stock}
                  onChange={(event)=>{
                    setStock(event.target.value);
                  }}
          placeholder="Ingrese Stock" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Cantidad</span>
          <input type="number" className="form-control" value={cantidad}
                  onChange={(event)=>{
                    setCantidad(event.target.value);
                  }}
          placeholder="Ingrese Cantidad" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Descontinuado</span>
          <input type="number" className="form-control" value={descontinuado} placeholder="0" aria-describedby="basic-addon1" disabled/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Fecha Baja</span>
          <input type="date" className="form-control" value={fechabaja} placeholder="Articulo" aria-describedby="basic-addon1" disabled/>
        </div>
        </div>
        <button className='btn btn-primary' onClick={agregar}>Registrar</button>
      </div>
    </div>
    </div>
  );
};

export default App;
