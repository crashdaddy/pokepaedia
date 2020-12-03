import {React, Component} from 'react';
import MainBoard from './Components/MainBoard/MainBoard'
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
         types: [],
         page: 1,
         pokemonType: 1,
     }
   }

  componentDidMount() {
    this.getData();
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

  changePokemonType = (newType) => {
    console.log(newType);
    this.setState({
      pokemonType: newType
    })
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
        <div style={{width:'50%',border:'1px solid black',float:'left'}}> 
          <MainBoard pokemonTypeID={this.state.pokemonType} />
        </div>
      </div>
    );
  }
}

export default App;
