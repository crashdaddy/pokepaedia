import {React, Component} from 'react';

class TypeMoves extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        typeMoves: [],
        pokemonTypeID: this.props.pokemonTypeID || 1
     }
   }

//   componentDidMount() {
//     this.getData();
//   }

//   componentDidUpdate() {

//     if(this.props.pokemonTypeID !== this.state.pokemonTypeID) {
//       this.setState({
//         pokemonTypeID: this.props.pokemonTypeID
//       })
//       this.getData();
//     }
    
//   }

//   getData = () => {
//     let url = "https://pokeapi.co/api/v2/type/" + this.props.pokemonTypeID;
//     fetch(url)
//     .then(res=>res.json())
//     .then(data => {
//       this.setState({
//         typeMoves: data.moves
//       })
//     })
//   }

  render() {
    return (
        <div>
       {this.props.typeMoves && this.props.typeMoves.map(pokemonMovesData  => {
   
         return( <span style={{marginLeft:'5px'}}>
             {pokemonMovesData.name} 
        </span>)   
      })}     
        </div>
  
    );
  }
}

export default TypeMoves;
