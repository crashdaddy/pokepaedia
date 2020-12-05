import {React, Component} from 'react';

class DetailsBoard extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
        pokemonAbilites: [],
        pokemonMoves: [],
        pokemonStats: [],
        pokemonSprites: null,
        pokemonName: '',
        selectedPokemon: this.props.selectedPokemon
     }
   }

  componentDidMount() {
 this.getData();
  }

  componentDidUpdate() {

    if(this.props.selectedPokemon !== this.state.selectedPokemon) {
      this.setState({
        selectedPokemon: this.props.selectedPokemon
      })
      this.getData();
    }
    
  }

  getData = () => {
    let url = "https://pokeapi.co/api/v2/pokemon/" + this.props.selectedPokemon;
    console.log(url)
    fetch(url)
    .then(res=>res.json())
    .then(data => {
      console.log(data)
      this.setState({
        pokemonAbilites: data.abilities,
        pokemonMoves: data.moves,
        pokemonStats: data.stats,
        pokemonSprites: data.sprites,
        pokemonName: data.name
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
        {this.state.pokemonSprites &&
        Object.entries(this.state.pokemonSprites).map(([key, val]) => 
      <img src={val} alt=""/>
       )
        }  
          
       {this.props.selectedPokemon && 
       <div>
           <img src={imageURL} width="100%" alt=""/>

           <span style={{fontSize:'24px',fontWeight:'bold'}}>{this.state.pokemonName}</span><br/>

           {this.state.pokemonStats && this.state.pokemonStats.map(stat=> 
             <div>
               {stat.base_stat} {stat.stat.name}
             </div>
           )}

<div style={{fontSize:'small',margin:'5px'}}>
           {this.state.pokemonMoves && this.state.pokemonMoves.map(move=> 
             <span style={{margin:'5px'}}>{move.move.name}</span>
             
           )}
</div>
       </div>

         }
        </div>
  
    );
  }
}

export default DetailsBoard;
