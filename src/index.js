import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// 方格
const Square = (props) => { // 函数式组件 您需要将 this.props 都更改为 props。
    return (
        <button className="square" onClick={() => props.onClick()}>
            {props.value}
            {/* {this.props.val} */}
        </button>
    );
}
// class Square extends React.Component {
//     // constructor 构造器
//     // constructor(props) {
//     //     super(props);// 子类是没有自己的 this 对象的，它只能继承自父类的 this 对象，然后对其进行加工，而super( )就是将父类中的this对象继承给子类的。没有 super，子类就得不到 this 对象
//     //     this.state = {
//     //         value: null,
//     //         num: null,
//     //     };
//     // }
//     render() {
//         return (
//             <button className="square" onClick={() => this.props.onClick()}>
//                 {this.props.value}
//                 {/* {this.props.val} */}
//             </button>
//         );
//     }
// }

// 棋盘
class Board extends React.Component {
    //当重构 React 组件时，提升 state(状态) 是非常常见的，所以让我们借此机会尝试一下。在 Board(棋盘) 组件中添加一个构造函数，并设置其初始 state(状态) 为包含一个具有 9 个空值的数组，对应 9 个方格：
    constructor() {
        super();
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true, //默认为true 第一次点击时为x
        };
    }
    handleClick(i) {
        const squares = this.state.squares.slice(); // squars为新的数组
        if (calculateWinner(squares) || squares[i]) { // 点击事件的判断  当返回的无论是X 还是 O  都判断为已经有返回值true  || 当点击的这个方格已被填充的时候 阻止该次点击
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,   // 赋值为x后切换xIsNext为反 从来改变下次落子
        })
        console.log(squares)
    }
    renderSquare(i, index) {
        // 引入其他组件 并且接受一个参数
        return (
            <Square
                value={this.state.squares[i]}
                onClick={() => this.handleClick(i)} // 棋盘在引用方格组件时候 给每个方格组件绑定点击事件 将一个函数从 Board(棋盘) 组件 传递到 Square(方格) 组件上，该函数在方格被点击时调用。
                key={index}
            />
        );
    }
    render() {
        const winner = calculateWinner(this.state.squares)
        // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        let status
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {
                        [0, 1, 2].map(
                            (i, index) => (this.renderSquare(i, index)) // 这里map就是获取数组的value和index值 用来当做参数传递给Square组件
                        )
                    }
                    {/* {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)} */}
                </div>
                <div className="board-row">
                    {
                        [3, 4, 5].map(
                            (value, index) => (this.renderSquare(value, index))
                        )
                    }
                    {/* {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)} */}
                </div>
                <div className="board-row">
                    {
                        [6, 7, 8].map(
                            (value, index) => (this.renderSquare(value, index))
                        )
                    }
                    {/* {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)} */}
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

// 判断谁赢
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
            console.log(squares[a])
            return squares[a]; // 当返回的无论是X 还是 O  都判断为已经有返回值true 
        }
    }
    return null;
}