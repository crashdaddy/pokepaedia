import { React, Component } from "react";

class TypeMoves extends Component {
  constructor(props) {
    super(props);

    this.state = {
      typeMoves: [],
      pokemonTypeID: this.props.pokemonTypeID || 1,
      moveData: [],
      flavorText: "",
      selectedMove: "",
    };
  }

  changeMove = (moveUrl) => {
    fetch(moveUrl)
      .then((res) => res.json())
      .then((data) => {
        let flavorText = "";
        if (data.flavor_text_entries[2]) {
          flavorText = data.flavor_text_entries[2].flavor_text;
        }
        this.setState({
          moveData: data.effect_entries,
          flavorText: flavorText,
          selectedMove: data.name,
        });
      });
  };

  render() {
    return (
      <div style={{ marginTop: "10px", color: "red", fontSize: "x-small" }}>
        {this.props.typeMoves &&
          this.props.typeMoves.map((pokemonMovesData) => {
            return (
              <div
                style={{float:'left', marginLeft: "10px", color: "black" ,textTransform:'capitalize'}}
                onClick={() => this.changeMove(pokemonMovesData.url)}
              >
                {pokemonMovesData.name}
              </div>
            );
          })}
        <p />
        {this.state.moveData && (
          <div style={{ fontSize: "large", float:'left',width:'100%',margin:'10px' }}>
            {this.state.selectedMove}:
            {this.state.moveData.map((moveDetails) => {
              return (
                <span style={{ margin: "5px" }}>
                  {moveDetails.short_effect}
                </span>
              );
            })}
            {this.state.flavorText}
          </div>
        )}
      </div>
    );
  }
}

export default TypeMoves;
