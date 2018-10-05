import React, { Component } from 'react';
import Buscador from './components/Buscador';
import Resultado from './components/Resultado';
import './App.css';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: '',
    cargando: false
  }

  consultarAPI = async () => {
    const termino = this.state.termino;
    const pagina= this.state.pagina;
    const url = `https://pixabay.com/api/?key=10281958-737bd613e1da18935e70115bb&q=${termino}&per_page=30&page=${pagina}`;

    await fetch(url)
      .then(res => {
        this.setState({
          cargando: true
        });
        return res.json();
      })
      .then(res => {
        setTimeout(() => {
          this.setState({
            imagenes: res.hits,
            cargando: false
          })
        }, 2000);


      });
  }

  datosBusqueda = (termino) => {
    this.setState({
      termino: termino,
      pagina: 1
    }, () => {
      this.consultarAPI();
    })
  }

  paginaAnterior = () => {
    let pagina = this.state.pagina;

    if (pagina <= 0)
      pagina = 0;
    else
      pagina--;

    this.setState({pagina}, () => {
      this.consultarAPI();
      this.scroll();
    });
  }

  paginaSiguiente = () => {
    let pagina = this.state.pagina;
    pagina++;
    this.setState({pagina}, () => {
      this.consultarAPI();
      this.scroll();
    });
  }

  scroll = () => {
    const elemento = document.querySelector('.jumbotron');

    elemento.scrollIntoView('smooth', 'start');
  }
  render() {
    const cargando = this.state.cargando;
    let resultado;

    if (cargando) {
      resultado = (
        <div className="spinner">
          <div className="double-bounce1"></div>
          <div className="double-bounce2"></div>
        </div>
      )
    } else {
      resultado = (
        <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />
      )
    }

    return (
      <div className="app container">
        <div className='jumbotron'>
          <p className='lead text-center'>
            Buscador de Imagenes
          </p>
          <Buscador
              datosBusqueda={this.datosBusqueda}
            />
        </div>

        <div className='row justify-content-center'>
          {resultado}
        </div>
      </div>
    );
  }
}

export default App;
