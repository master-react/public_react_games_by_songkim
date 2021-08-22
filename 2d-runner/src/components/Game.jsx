import React from "react";
import Board from "./Board";

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      isPlaying: false,
    };
  }

  gameScoreUpdate = () => {
    this.setState({ score: this.state.score + 1 });
    console.log(this.state.score);
  };

  toggleGameState = () => {
    if (this.state.isPlaying === true) {
      this.setState({ isPlaying: false });
    } else {
      this.setState({ score: 1, isPlaying: true });
    }
    console.log(this.state);
  };

  render() {
    return (
      <div className="game-container">
        {this.state.isPlaying !== true ? (
          <button id="game-start-button" onClick={() => this.toggleGameState()}>
            start
          </button>
        ) : (
          <Board
            gameScoreUpdateCallback={this.gameScoreUpdate}
            gameState={this.state.isPlaying}
            toggleGameStateCallback={this.toggleGameState}
          />
        )}

        <div className="game-score">
          {this.state.score > 0 ? "Score : " + this.state.score : ""}
        </div>
      </div>
    );
  }
}
