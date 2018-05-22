import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 方格
class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={()=>console.log('click')}>
                {this.props.a}
            </button>
        );
    }
}

// 棋盘
class Board extends React.Component {
    renderSquare(i) { // 引入其他组件 并且接受一个参数
        return <Square value={i} val={i} a={i}/>;
    }
    render() {
        const status = 'Next player: X';
        return (
            <div>
                <div className="status">{status}</div>
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

//游戏
class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
