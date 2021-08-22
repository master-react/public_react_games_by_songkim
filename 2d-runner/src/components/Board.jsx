import React from "react";

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.characterRef = React.createRef();
    this.obstacleRef = React.createRef();
    this.state = {
      time: 0,
    };
  }

  componentDidMount() {
    this.objectMoving = setInterval(() => this.checkObjectFn(), 10);
    this.scoreCounter = setInterval(
      () => this.props.gameScoreUpdateCallback(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.objectMoving);
    clearInterval(this.scoreCounter);
  }

  jumpFn = async () => {
    if (this.characterRef.current.className !== "jumping") {
      this.characterRef.current.className = "jumping";
      new Promise((resolve) => setTimeout(resolve, 300)).then(() => {
        if (this.characterRef.current)
          this.characterRef.current.className = "running";
      });
    }
  };

  checkObjectFn = () => {
    const characterPos = {
      x: this.characterRef.current.offsetLeft,
      y: this.characterRef.current.offsetTop,
      width: this.characterRef.current.offsetWidth,
      height: this.characterRef.current.offsetHeight,
    };

    const obstaclePos = {
      x: this.obstacleRef.current.offsetLeft,
      y: this.obstacleRef.current.offsetTop,
      width: this.obstacleRef.current.offsetWidth,
      height: this.obstacleRef.current.offsetHeight,
    };

    if (
      characterPos.x < obstaclePos.x + obstaclePos.width &&
      characterPos.x + characterPos.width > obstaclePos.x &&
      characterPos.y + characterPos.height > obstaclePos.y
    ) {
      console.log("collisition");
      this.props.toggleGameStateCallback();
    }
  };

  render() {
    if (this.props.gameState === true) {
      return (
        <div id="game-board" onClick={() => this.jumpFn()}>
          <div
            id="game-character"
            className="running"
            ref={this.characterRef}
          ></div>
          <div id="game-obstacle" className="animate" ref={this.obstacleRef}>
            <div className="image"></div>
          </div>
        </div>
      );
    }
  }
}
