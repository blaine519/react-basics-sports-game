function Team(props) {
    let shotPercentageDiv;

    if (props.stats.shots) {
      const shotPercentage = Math.round(
        (props.stats.score / props.stats.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage}</strong>
        </div>
      );
    }

    return (
      <div className="Team">
        <h2>{props.name}</h2>

        <div className="identity">
          <img src={props.logo} alt={props.name} />
        </div>

        <div>
          <strong>Shots: </strong> {props.stats.shots}
        </div>

        <div>
          <strong>Score: </strong> {props.stats.score}
        </div>

        {shotPercentageDiv}

        <button onClick={props.shotHandler}>Shoot!</button>
      </div>
    );
}

class Game extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            resetCount: 0,
            homeTeamStats: {
                shots: 0,
                score: 0
            },
            visitingTeamStats: {
                shots: 0,
                score: 0
            }
        }

        this.shotSound = new Audio("./assets/sounds/shot.wav");
        this.scoreSound = new Audio("/assets/sounds/goal.wav");

    }

    shoot = (team) => {
        const teamStatsKey = `${team}TeamStats`
        let score = this.state[teamStatsKey].score;
        this.shotSound.play();
    
        if (Math.random() > 0.7) {
          score += 1;
    
          setTimeout(() => {
            this.scoreSound.play();
          }, 100);
        }
    
        this.setState((state, props) => ({
            [teamStatsKey] : {
                shots: state[teamStatsKey].shots + 1,
                score
            }
        }));
      };

      resetGame = () => {
          this.setState((state, props) => ({
              resetCount: state.resetCount + 1,
              homeTeamStats: {
                  shots: 0,
                  score: 0
              },
              visitingTeamStats: {
                  shots: 0,
                  score: 0
              }
          }))
      }

    render() {
        return (
            <div className="Game">
                <h1>Welcome to {this.props.venue}</h1>
                <div className="stats">
                <Team
                    name={this.props.visitingTeam.name}
                    logo={this.props.visitingTeam.logoSrc}
                    stats={this.state.visitingTeamStats}
                    shotHandler={() => this.shoot("visiting")}
                />

                <div className="versus">
                    <h1>VS</h1>
                    <div>
                        <strong>Resets: </strong> {this.state.resetCount}
                        <button onClick={this.resetGame}>Reset Game</button>
                    </div>
                </div>

                <Team
                    name={this.props.homeTeam.name}
                    logo={this.props.homeTeam.logoSrc}
                    stats={this.state.homeTeamStats}
                    shotHandler={() => this.shoot("home")}
                />
                </div>
            </div>
        );
  }
}

function App(props) {
  const rapids = {
    name: "Colorado Rapids",
    logoSrc: "./assets/images/colorado-rapids.png",
  };

  const saltLake = {
    name: "Real Salt Lake",
    logoSrc: "./assets/images/real-salt-lake.png",
  };

  const nuggets = {
    name: "Denver Nuggets",
    logoSrc: "./assets/images/denver-nuggets.png",
  };

  const jazz = {
    name: "Utah Jazz",
    logoSrc: "./assets/images/utah-jazz.png",
  };
  return (
    <div className="App">
      <Game
        venue="Dick's Sporting Goods Stadium"
        homeTeam={rapids}
        visitingTeam={saltLake}
      />
      <Game
        venue="Vivint Smart Home Arena"
        homeTeam={jazz}
        visitingTeam={nuggets}
      />
    </div>
  );
}

// Render the App
ReactDOM.render(<App />, document.getElementById("root"));