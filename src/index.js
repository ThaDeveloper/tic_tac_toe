import React from 'react';
import ReactDOM from 'react-dom';
// import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';

function Square (props) {
     return (
      <button className="square btn btn-warning" onClick={props.onClick} >
      {props.value}
      </button>
    );
  
}

class Board extends React.Component {
  renderSquare(i) {
    
    return (
      
    <Square value={this.props.squares[i]} 
    onClick={() => this.props.onClick(i)}
    />
    );
  }

  render() {
    
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const name ='One Awesome Board Game';
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} className="btn btn-info">{desc}</button>
        </li>
      );
    });

    let status;
    let style;
    if (winner) {
      status = 'Winner: ' + winner;
      style = "label label-success";
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      style = "";
    }
    return (
      <div className="container-fluid">
        <div className="col-sm-6 col-sm-offset-3">
          <div className="panel panel-default">
            <div className="panel-header text-center">
              <h3>{name}</h3>
            </div>
            <div className="panel-body">
              <div className="game">
                <div className="row">
                  <div className="col-md-6">
                    <div className="game-board">
                      <Board
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                      />

                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="game-info">
                      <div><label class={style}>{status}</label></div>
                      <ol>{moves}</ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);