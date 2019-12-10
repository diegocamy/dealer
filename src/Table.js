import React, { Component } from 'react'
import Card from './Card';
import './Table.css'

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deckId: '',
      totalCartas: 0,
      cartas: []
    }
    this.obtenerCarta = this.obtenerCarta.bind(this);
  }

  componentDidMount() {
    //obtener deck de cartas
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then(res => res.json())
      .then(data => this.setState({ deckId: data.deck_id, totalCartas: data.remaining }))
  }

  obtenerCarta() {
    //si hay cartas en el deck obtenerla de la api y agregarla al state
    if (this.state.totalCartas > 0) {
      fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/draw/?count=1`)
        .then(res => res.json())
        .then(data => this.setState(prevSt => {
          return {
            totalCartas: prevSt.totalCartas - 1,
            cartas: [...prevSt.cartas, {
              imagen: data.cards[0].images.png,
              palo: data.cards[0].suit,
              valor: data.cards[0].value,
              rotacion: Math.floor(Math.random() * 80) - 40 //agrega rotacion aleatoria
            }]
          }
        }))
    } else {//si no quedan mas cartas para mostrar, barajar de nuevo el deck
      fetch(`https://deckofcardsapi.com/api/deck/${this.state.deckId}/shuffle/`)
        .then(res => res.json())
        .then(data => this.setState({ totalCartas: data.remaining, cartas: [] }))
    }
  }

  render() {
    return (
      <div className="mesa">
        <h1>DEALER!</h1>
        <button onClick={this.obtenerCarta}>
          {this.state.totalCartas === 0 ? 'Barajar Cartas' : 'Dame una carta'}
        </button>
        <div className="cartas">
          {this.state.cartas.map(carta => <Card
            carta={carta.imagen}
            key={`${carta.valor} of ${carta.palo}`}
            alt={`${carta.valor} of ${carta.palo}`}
            rotacion={carta.rotacion}
          />)}
        </div>
      </div>
    )
  }
}
