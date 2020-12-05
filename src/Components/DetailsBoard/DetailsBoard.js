import {React, Component} from 'react';

class DetailsBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        pokemon: [],
        pokemonTypeID: 1
     }
   }

  componentDidMount() {
 //   this.getData();
  }

  componentDidUpdate() {

    // if(this.props.pokemonTypeID !== this.state.pokemonTypeID) {
    //   this.setState({
    //     pokemonTypeID: this.props.pokemonTypeID
    //   })
    //   this.getData();
    // }
    
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

  render() {
    let imageURL = "https://pokeres.bastionbot.org/images/pokemon/"+ this.props.selectedPokemon + ".png";
    return (
        <div>
       {this.props.selectedPokemon && 
       <div>
           <img src={imageURL} width="100%" alt=""/>

       </div>

         }
        </div>
  
    );
  }
}

export default DetailsBoard;
