import React from 'react';

class Buscador extends React.Component {

	busqueda = React.createRef();

	obtenerDatos = (e) => {
		e.preventDefault();

		const termino = this.busqueda.current.value;

		this.props.datosBusqueda(termino);
	}
	render () {
		return (
			<form onSubmit={this.obtenerDatos}>
					<div className='row'>
							<div className='form-group col-md-8'>
									<input ref={this.busqueda} className='form-control form-control-lg' type='text'
										placeholder='Busca tu imagen, ejemplo: Futbol'/>
							</div>
							<div className='form-group col-md-4'>
									<input type='submit' className='bnt btn-lg btn-danger btn-block' value='Buscar...'/>
							</div>
					</div>
			</form>
		)
	}
}

export default Buscador;
