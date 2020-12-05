import {React, Component} from 'react';

class MainBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        pokemon: [],
        pokemonTypeID: 1
     }
   }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {

    if(this.props.pokemonTypeID !== this.state.pokemonTypeID) {
      this.setState({
        pokemonTypeID: this.props.pokemonTypeID
      })
      this.getData();
    }
    
  }

  getData = () => {
    let url = "https://pokeapi.co/api/v2/type/" + this.props.pokemonTypeID;
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data => {
      console.log(data.pokemon)
      this.setState({
        pokemon: data.pokemon
      })
    })
  }

  addDefaultSrc(ev){
    ev.target.src = 'noImg.png'
  }

  pokemonClicked = (newPokemon) => {
    console.log("himom"+ newPokemon);
    this.props.selectPokemon(newPokemon);
  }

  render() {
    const imgStyle = {
     border: "1px solid black", 
    }
    return (
        <div>
       {this.state.pokemon && this.state.pokemon.map(pokemonData  => {
         let idStr = pokemonData.pokemon.url.split('/');
         let pokemonID = idStr[6];
         let imageURL = "https://pokeres.bastionbot.org/images/pokemon/"+ pokemonID + ".png";
         return( <div>
        <img onClick={() => {this.pokemonClicked(pokemonID)}} src={imageURL} style={{width:'50px',float:'left',margin:'7px'}} alt="pokemon"  onError={this.addDefaultSrc} />
        </div>)   
      })}     
        </div>
  
    );
  }
}

export default MainBoard;
