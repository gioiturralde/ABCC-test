
import './App.css';
import {useState, useEffect} from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
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
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [esDescontinuado, setesDescontinuado] = useState(true);


  const [listaDepartamentos, setDepartamentos] = useState([]);
  const [listaClases, setClases] = useState([]);
  const [listaFamilias, setFamilias] = useState([]);

  function getCurrentDate() {
    const today = new Date();
    
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
  

//funcion para agregar articulo
  const agregar = (event)=>{
    event.preventDefault();
    if (parseInt(cantidad) > parseInt(stock)) {
      alert('La cantidad ingresada no puede ser mayor al stock disponible.');
      return;
    }
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
      limpiarCampos();
      alert("Articulo registrado");
    });
  }


  const update = (event)=>{
    event.preventDefault();
    if (parseInt(cantidad) > parseInt(stock)) {
      alert('La cantidad ingresada no puede ser mayor al stock disponible.');
      return;
    } 
    Axios.put(`http://localhost:3001/update/${sku}`, {
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
      alert("Articulo actualizado");
    });
  }

//funcion para mostrar articulos
const consultar = () => {
  if (sku) {
    Axios.get(`http://localhost:3001/articulo/exists/${sku}`)
      .then((response) => {
        if (response.data.exists) {
          Axios.get(`http://localhost:3001/articulo/${sku}`)
            .then((response) => {
              const articulo = response.data;
              setArticulo(articulo.articulo);
              setMarca(articulo.marca);
              setModelo(articulo.modelo);
              setDepartamento(articulo.departamento);
              setClase(articulo.clase);
              setFamilia(articulo.familia);
              setStock(articulo.stock);
              setCantidad(articulo.cantidad);
              setFechaAlta(articulo.fecha_alta);
              setFechaBaja(articulo.fecha_baja);
              setDescontinuado(articulo.descontinuado);
              setIsReadOnly(true);
              setesDescontinuado(true);
            })
            .catch((error) => {
              console.error('Error al obtener el artículo', error);
            });
        } else {
          alert('El SKU no existe. Por favor, regístrelo antes de consultar.');
          limpiarCampos();
          setDescontinuado(0);
          setIsReadOnly(false);
        }
      })
      .catch((error) => {
        console.error('Error al verificar el SKU', error);
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
    setSku("");
    setDescontinuado(0);
    setIsReadOnly(true);
    setesDescontinuado(true);
    setEditar(false);
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
const eliminar = () => {
  if (sku) {
    const isConfirmed = window.confirm('¿Estás seguro de que deseas eliminar este artículo?');
    if (isConfirmed) {
    Axios.delete(`http://localhost:3001/delete/${sku}`).then((response) => {
      alert('Artículo eliminado exitosamente');
      limpiarCampos();
      })
      .catch((error) => {
        console.error('Error al obtener el artículo', error);
      });
    }
  }
};

//funcion para modificar articulo
const editarArticulo = ()=>{
  setEditar(true);

  setArticulo(articulo);
  setMarca(marca);
  setModelo(modelo);
  setDepartamento(departamento);
  setClase(clase);
  setFamilia(familia);
  setCantidad(cantidad);
  setStock(stock);
  setDescontinuado(descontinuado);
  setesDescontinuado(false);
  setIsReadOnly(false);
}


  return (
    <div className="container-fluid">
        <div className="card text-center">
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
                onClick={consultar}
            className="btn btn-success ml-2">Consultar</button>
            <button type="button" 
              onClick={editarArticulo}
            className="btn btn-warning">Actualizar</button>
            <button type="button" 
              onClick={eliminar}
            className="btn btn-danger">Eliminar</button>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Articulo</span>
          <input type="text" readOnly={isReadOnly} className="form-control" value={articulo}
                  onChange={(event)=>{
                    setArticulo(event.target.value);
                  }}
          placeholder="Ingrese Articulo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Marca</span>
          <input type="text" readOnly={isReadOnly} className="form-control" value={marca}
                  onChange={(event)=>{
                    setMarca(event.target.value);
                  }}
          placeholder="Ingrese Marca" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Modelo</span>
          <input type="text" readOnly={isReadOnly} className="form-control" value={modelo}
                  onChange={(event)=>{
                    setModelo(event.target.value);
                  }}
          placeholder="Ingrese Modelo" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
        <label className="input-group-text">Departamento</label>
          <select className="form-select" id="inputGroupSelect01" disabled={isReadOnly}
          onChange={(event) => setDepartamento(event.target.value)}
            aria-describedby="basic-addon1">
            <option value={departamento} >{departamento? departamento :"Seleccione Departamento"}</option>
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


            disabled={!departamento ? true : isReadOnly}>
            <option value="">Seleccione Clase</option>
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
          disabled={!clase ? true : isReadOnly}>
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
          <input type="number" readOnly={isReadOnly} className="form-control" value={stock}
                  onChange={(event)=>{
                    setStock(event.target.value);
                  }}
          placeholder="Ingrese Stock" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Cantidad</span>
          <input type="number" readOnly={isReadOnly} className="form-control" value={cantidad}
                  onChange={(event)=>{
                    setCantidad(event.target.value);
                  }}
          placeholder="Ingrese Cantidad" aria-describedby="basic-addon1"/>
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Descontinuado</span>
          <input type="number" readOnly={esDescontinuado} className="form-control" value={descontinuado} 
                            onChange={(event)=>{
                              var inputValue = event.target.value;
                                  event.target.value = inputValue.slice(0, 1).replace(/[^01]/g, '');
                                              setDescontinuado(event.target.value);
                            }}
          
           aria-describedby="basic-addon1" />
        </div>
        </div>
        <div className="card-body">
        <div className="input-group input-group-sm mb-3">
          <span className="input-group-text" id="basic-addon1">Fecha Baja</span>
          <input type="date" className="form-control" value={fechabaja} placeholder="Articulo" aria-describedby="basic-addon1" disabled/>
        </div>
        </div>
        {
          editar?
          <div>
          <button className='btn btn-warning m-2' onClick={update}>Actualizar</button> 
          <button className='btn btn-success m-2' onClick={limpiarCampos}>Cancelar</button>
          </div>
          : <div><button className='btn btn-primary m-2' onClick={agregar}>Registrar</button>
            <button type="button" onClick={limpiarCampos} className="btn btn-danger">Limpiar</button></div>
        }
      </div>
    </div>
    </div>
  );
};

export default App;
