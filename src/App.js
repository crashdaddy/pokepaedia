import {React, Component} from 'react';
import MainBoard from './Components/MainBoard/MainBoard';
import TypeMoves from './Components/TypeMoves/TypeMoves';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
         types: [],
         typeMoves: [],
         page: 1,
         pokemonType: 1,
         pokemonTypeName: "normal"
     }
   }

  componentDidMount() {
    this.getData();
    this.changePokemonType(1)
  }

  getData = () => {
    let url = "https://pokeapi.co/api/v2/type/";

    fetch(url)
    .then(res=>res.json())
    .then(data => {
      this.setState({
        types: [...this.state.types,...data.results]
      })
    })
  }

  getNewTypeData = (newType) => {
    let url = "https://pokeapi.co/api/v2/type/" + newType;
    fetch(url)
    .then(res=>res.json())
    .then(data => {
      this.setState({
        typeMoves: data.moves
      })
    })
  }

  changePokemonType = (newType) => {
    this.state.types.forEach(type => {
      let idStr = type.url.split('/');
      let pokemonTypeID = idStr[6];
      if(newType===pokemonTypeID) {
        this.setState({
          pokemonTypeName: type.name
        })
      }
    });
    this.setState({
      pokemonType: newType
    })
    this.getNewTypeData(newType);
  }

  render() {
    return (
      <div>
        <div style={{float:'left',width:'10%'}}>
        <img src="banner.png" alt="banner" style={{width:'100%'}} />
       {this.state.types.map(typeData  => {
         let idStr = typeData.url.split('/');
         let pokemonTypeID = idStr[6];
         return( <div>
         <button href={typeData.url} style={{marginBottom:'5px',width:'90%'}}  onClick={() => this.changePokemonType(pokemonTypeID)}>{typeData.name}</button>
        </div>)   
      })}     
        </div>
        <div style={{width:'50%',border:'1px solid black',float:'left',margin:'5px',marginBottom:'10px',textAlign:'left'}}>
          Pokemon Type: {this.state.pokemonTypeName}<br/> Moves: <br/> 
          <TypeMoves typeMoves={this.state.typeMoves} pokemonTypeID={this.state.pokemonType} />
        </div>
        <div style={{width:'50%',border:'1px solid black',float:'left'}}> 
          <MainBoard pokemonTypeID={this.state.pokemonType} />
        </div>
      </div>
    );
  }
}

export default App;
