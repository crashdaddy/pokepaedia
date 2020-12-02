import {React, Component} from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
         types: [],
         page: 1
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
      console.log(data.results)
      this.setState({
        types: [...this.state.types,...data.results]
      })
    })
  }

  render() {
    return (
      <div>
       {this.state.types.map(typeData  => {return <div>
         <button href={typeData.url} style={{marginBottom:'5px'}} >{typeData.name}</button>
        </div>   
      })}     
      </div>
    );
  }
}

export default App;
