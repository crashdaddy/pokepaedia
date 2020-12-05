import { React, Component } from "react";
import MainBoard from "./Components/MainBoard/MainBoard";
import TypeMoves from "./Components/TypeMoves/TypeMoves";
import DetailsBoard from "./Components/DetailsBoard/DetailsBoard";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      types: [],
      typeMoves: [],
      page: 1,
      pokemonType: 1,
      pokemonTypeName: "normal",
      selectedPokemon: "",
    };
  }

  componentDidMount() {
    this.getData();
    this.changePokemonType(1);
  }

  getData = () => {
    let url = "https://pokeapi.co/api/v2/type/";

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          types: [...this.state.types, ...data.results],
        });
      });
  };

  getNewTypeData = (newType) => {
    let url = "https://pokeapi.co/api/v2/type/" + newType;
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          typeMoves: data.moves,
        });
      });
  };

  changePokemonType = (newType) => {
    this.state.types.forEach((type) => {
      let idStr = type.url.split("/");
      let pokemonTypeID = idStr[6];
      if (newType === pokemonTypeID) {
        this.setState({
          pokemonTypeName: type.name,
        });
      }
    });
    this.setState({
      pokemonType: newType,
    });
    this.getNewTypeData(newType);
  };

  selectPokemon = (newPokemon) => {
    console.log(newPokemon);
    this.setState({
      selectedPokemon: newPokemon,
    });
  };

  render() {
    return (
      <div>
        
        <div
          style={{
            padding: "5px",
            width: "65%",
            // border: "1px solid black",
            borderRadius: "15px",
            float: "left",
            margin: "5px",
            marginBottom: "10px",
            textAlign: "left",
          }}
        >
          <div style={{ float: "left", width: "100%" }}>
          <img
            src="banner.png"
            alt="banner"
            style={{ width: "20%", float: "left" }}
          />

          <select
            style={{
              textAlign: "right",
              borderRadius: "15px",
              width: "70%",
              fontSize: "32px",
              marginTop: "20px",
            }}
            onChange={(val) => this.changePokemonType(val.target.value)}
          >
            {this.state.types.map((typeData) => {
              let idStr = typeData.url.split("/");
              let pokemonTypeID = idStr[6];
              return <option value={pokemonTypeID}>{typeData.name}</option>;
            })}
          </select>

          {/* {this.state.types.map(typeData  => {
         let idStr = typeData.url.split('/');
         let pokemonTypeID = idStr[6];
         return( <div>
         <button href={typeData.url} style={{marginBottom:'5px',width:'90%'}}  onClick={() => this.changePokemonType(pokemonTypeID)}>{typeData.name}</button>
        </div>)   
      })}      */}
        </div>
          <div>
            <div style={{ fontSize: "x-large", fontWeight: "bold" }}>
              Pokemon Type: {this.state.pokemonTypeName}
              <br /> Moves:
              <span
                style={{
                  fontSize: "small",
                  marginLeft: "5px",
                  fontWeight: "normal",
                }}
              >
                <em>
                  (These are the moves that all pokemon of this type can
                  execute)
                </em>
              </span>
              <br />
            </div>
            <TypeMoves
              typeMoves={this.state.typeMoves}
              pokemonTypeID={this.state.pokemonType}
            />
          </div>
          <div>
            <MainBoard
              pokemonTypeID={this.state.pokemonType}
              selectPokemon={this.selectPokemon}
            />
          </div>
        </div>
        <div
          style={{
            borderRadius: "15px",
            width: "30%",
            // border: "1px solid black",
            float: "left",
            margin: "5px",
          }}
        >
          {this.state.selectedPokemon && (
            <DetailsBoard
              selectedPokemon={this.state.selectedPokemon}
              style={{
                width: "50%",
                // border: "1px solid black",
                float: "left",
                margin: "5px",
                marginBottom: "10px",
                textAlign: "left",
              }}
            />
          )}
        </div>
      </div>
    );
  }
}

export default App;
