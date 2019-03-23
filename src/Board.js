import React, { Component } from 'react';
import axios from 'axios';
import './Board.css';

const url = "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple";

class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataArr: [],
            error: null
        }
    }

    componentDidMount() {
        axios.get(url)
            .then( res => {
                console.log(res.data.results);
                // to check the variable is array use this 'Object.prototype.toString.call(arrayVariable)', if 'arrayVariable' is array then the expression results the string '[object Array]'
                if(Object.prototype.toString.call(res.data.results).slice(8,13) === 'Array'){
                    this.setState({
                        dataArr: res.data.results,
                        isLoading: false
                    })
                }
            })
            .catch((err) => {
                console.log(err.message);
                this.setState({
                    error: err.message
                })
            })
    }

    render() {
        const { data, isLoading, error } = this.state;

        if(isLoading){
            console.log('Loading....')
            return (
                <div className="board">
                    <div className="content">
                        <p id="msg">Please wait <span>{this.props.location.state.playerName}</span>, Page is Loading...</p>
                    </div>
                </div>
            );
        }

        if(error !== null){
            console.log('erroorrrr:::=> '+error);
            return (
                <div className="board">
                    <div className="content">
                        <p id="msg">Sorry <span>{this.props.location.state.playerName}</span>, We can't serve you due to this error: <span>{this.state.error}</span></p>
                    </div>
                </div>
            );
        }

        return (
            <div className="board">
                
            </div>
        );
    }
}

export default Board;