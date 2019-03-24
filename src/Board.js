import React, { Component } from 'react';
import axios from 'axios';
import history from './history';
import './Board.css';

const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            score: 0,
            timer: 5,
            dataArr: [],
            error: null,
            isLoading: true,
            selectedAns: ""
        }
    }

    updateQue = () => {
        var queCounter = setInterval(() => {
            this.setState({ timer: (this.state.timer === 0) ? 5 : this.state.timer - 1 });

            if(this.state.timer === 0){
                if(this.state.dataArr[this.state.id].correct_answer === this.state.selectedAns){
                    this.setState({ score: this.state.score + 1 });
                }
            }

            if(this.state.timer === 5){
                document.querySelectorAll('.answers h3').forEach(ans => ans.style.border="")

                this.setState({ selectedAns: "" })

                if(this.state.id < this.state.dataArr.length - 1) {
                    this.setState({ id: this.state.id + 1 });
                } else { 
                    this.setState({ id: 0 });
                    clearInterval(queCounter);
                    history.push('/score', { score: `${this.state.score}`, name: `${this.props.location.state.playerName}` });
                }
            }
        }, 1000);
    }

    selectedAns = (ans, e) => {
        console.log('===>',ans);
        document.querySelectorAll('.answers h3').forEach(ans => ans.style.border="")
        e.target.style.border = "2px solid rgb(143, 84, 35)";
        this.setState({
            selectedAns: ans
        })
    }
    
    componentDidMount() {
        axios.get(url)
            .then(res => {
                console.log(res.data.results);
                // to check the variable is array use this 'Object.prototype.toString.call(arrayVariable)', if 'arrayVariable' is array then the expression results the string '[object Array]'
                if (Object.prototype.toString.call(res.data.results).slice(8, 13) === 'Array') {
                    this.setState({
                        dataArr: res.data.results,
                        isLoading: false
                    })
                }
            })
            .catch((err) => {
                console.log(err.message);
                this.setState({
                    error: err.message,
                    isLoading: false
                })
            });

        this.updateQue();
    }

    render() {
        const { dataArr, isLoading, error, id, timer } = this.state;

        if(isLoading) {
            console.log('Loading....')
            return (
                <div className="board">
                    <div className="content">
                        <p id="msg">Please wait <span>{this.props.location.state.playerName}</span>, Page is Loading...</p>
                    </div>
                </div>
            );
        } else {
            var choices = dataArr[id].incorrect_answers.slice();
            choices.push(dataArr[id].correct_answer);
            choices.sort();
        }

        if(error !== null) {
            console.log('erroorrrr:::=> ' + error);
            return (
                <div className="board">
                    <div className="content">
                        <p id="msg">Sorry <span>{this.props.location.state.playerName}</span>, We can't serve you due to this error: <span>{this.state.error}</span></p>
                    </div>
                </div>
            );
        }

        return (
            <div className="board1">
                <div className="user">
                    <h2>Let's go <span>{this.props.location.state.playerName}</span>,</h2>
                    <h1>0{timer}</h1>
                </div>
                <div className="quesBoard">
                    <h3 id="ques">{id+1} {dataArr[id].question}</h3>
                    <div className="answers">
                        <h3 id="ans1" onClick={(e) => this.selectedAns(choices[0], e)}>{choices[0]}</h3>
                        <h3 id="ans2" onClick={(e) => this.selectedAns(choices[1], e)}>{choices[1]}</h3>
                        <h3 id="ans3" onClick={(e) => this.selectedAns(choices[2], e)}>{choices[2]}</h3>
                        <h3 id="ans4" onClick={(e) => this.selectedAns(choices[3], e)}>{choices[3]}</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default Board;
