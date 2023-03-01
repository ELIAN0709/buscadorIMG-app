import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListaImagenes from "./components/ListaImagenes";

function App() {
  // stado de la app
  const [busqueda, guardarBusqueda] = useState("");

  // stadod e imagenes
  const [imagenes, guardarImagenes] = useState([]);

  // stado de la pagina
  const [paginaActual, guardarPagActual] = useState(1);

  // stado del total de las aginas
  const [totalPag, guardarTotalPag] = useState(5);

  // useeffect
  useEffect(() => {
    // consulta a la api
    const consultarAPI = async () => {
      if (busqueda === "") return;
      //variables de la busqueda
      const imagenesPorPagina = 30;
      const key = "34049264-dc88fc5188053535578af2208";
      const URL = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      // consulta
      const respuesta = await fetch(URL);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // total de las paginas
      const CalcularTotalPag = Math.ceil(
        resultado.totalHits / imagenesPorPagina
      );
      guardarTotalPag(CalcularTotalPag);

      //revisamos
      console.log(resultado);

      // moer la pantalla hacia arriba 
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({behavior: 'smooth'})




    };
    consultarAPI();
  }, [busqueda, paginaActual]);

  // paginador anterior
  const paginaAnterior = () => {
    const nuevaPagActual = paginaActual - 1;
    // verificar numero positivos para la pagina 
    if (nuevaPagActual === 0 ){
      return;
    }
    guardarPagActual(nuevaPagActual);
  }


  // apginador siguiente
  const paginaSiguiente = () => {
    const nuevaPagActual = paginaActual + 1;
    if (nuevaPagActual > totalPag){
      return;
    }
    guardarPagActual(nuevaPagActual);

  }



  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">BUSCADOR DE IMAGENES</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListaImagenes imagenes={imagenes} />

        {(paginaActual === 1) ? null : (<button type="button" className="btn btn-info mr-1" onClick={paginaAnterior}>
        &laquo; Anterior 
        </button>)}

        {(paginaActual === totalPag) ? null : (<button type="button" className="btn btn-info mr-1" onClick={paginaSiguiente}>
         Siguiente &raquo;
        </button>)}
      </div>
    </div>
  );
}

export default App;
