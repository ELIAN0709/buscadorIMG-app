import React, {useState} from 'react';
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {

    // estado del fomrulario 
    const [termino, guardarTermino] = useState('');
    
    // stado del Error
    const [error, guardarError] = useState(false)

    // definimos funcion para submit 
    const buscarImagenes = (event) => {
        event.preventDefault()

        // VALIDAMOS LA ENTRADA 
        if(termino.trim() === ''){
            guardarError(true)
            return; 
        }
        guardarError(false);

        // envio la informaicon de busqueda al componente padre 
        guardarBusqueda(termino)

    }


    return ( 
        <form onSubmit={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                    type="text" 
                    className="form-control form-control-lg" 
                    placeholder='Busca una Imagen'
                    onChange={e => guardarTermino(e.target.value)}
                    />
                </div>

                <div className="form-group col-md-4">
                    <input 
                    type="submit" 
                    className="btn btn-lg btn-danger btn-block" 
                    value='Buscar'
                    />
                </div>
            </div>
            {error ?  <Error msm="Error, vuelva a ingrese la busqueda"/> : null}
        </form>
    );
}
 
export default Formulario;