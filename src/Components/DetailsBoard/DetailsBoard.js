import { React, Component } from "react";

class DetailsBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pokemonAbilites: [],
      pokemonMoves: [],
      pokemonStats: [],
      pokemonSprites: null,
      pokemonName: "",
      selectedPokemon: this.props.selectedPokemon,
    };
  }

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate() {
    if (this.props.selectedPokemon !== this.state.selectedPokemon) {
      this.setState({
        selectedPokemon: this.props.selectedPokemon,
      });
      this.getData();
    }
  }

  getData = () => {
    let url = "https://pokeapi.co/api/v2/pokemon/" + this.props.selectedPokemon;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({
          pokemonAbilites: data.abilities,
          pokemonMoves: data.moves,
          pokemonStats: data.stats,
          pokemonSprites: data.sprites,
          pokemonName: data.name,
        });
      });
  };

  addDefaultSrc(ev) {
    ev.target.src = "noImg.png";
  }

  render() {
    let imageURL =
      "https://pokeres.bastionbot.org/images/pokemon/" +
      this.props.selectedPokemon +
      ".png";
    return (
      <div>


        {this.props.selectedPokemon && (
          <div>
                        <span style={{color:"blue", fontSize: "32px", fontWeight: "bold",width:"100%",textAlign:"center" }}>
              {this.state.pokemonName}
            </span>
            <br />

            {this.state.pokemonStats &&
              this.state.pokemonStats.map((stat) => (
                <div
                  style={{
                    float: "left",
                    width: "15%",
                    textAlign: "center",
                    marginBottom: "20px",
                  }}
                >
                  <span style={{ fontSize: "24px", fontWeight: "bold" }}>
                    {stat.base_stat}
                  </span>
                  <br />
                  <span style={{ fontSize: "small", fontWeight: "normal" }}>
                    {stat.stat.name}
                  </span>
                </div>
              ))}
            <div style={{ backgroundImage: 'url("bg.jpg")',borderRadius:'15px',marginTop:'100px' }}>
              <img
                src={imageURL}
                width="100%"
                alt=""
                style={{ border: "none" }}
              />
            </div>
            {this.state.pokemonSprites &&
          Object.entries(this.state.pokemonSprites).map(([key, val]) => (
            <img src={val} alt="" />
          ))}


            <div
              style={{
                fontSize: "x-large",
                fontWeight: "bold",
                clear: "both",
                float: "left",
              }}
            >
              Moves:
              <span
                style={{
                  fontSize: "small",
                  marginLeft: "5px",
                  fontWeight: "normal",
                }}
              >
                <em>(These are the moves specific to this pokemon)</em>
              </span>
              <br />
            </div>
            <div
              style={{
                width: "100%",
                fontSize: "small",
                padding: "5px",
                wordWrap: "break-word",
                float: "left",
              }}
            >
              {this.state.pokemonMoves &&
                this.state.pokemonMoves.map((move) => (
                  <span style={{ margin: "5px" }}>{move.move.name}</span>
                ))}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default DetailsBoard;
