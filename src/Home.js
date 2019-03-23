import React, { Component } from 'react';
import history from './history';
import backimg from './images/bg.jpg';
import './Home.css';

class Home extends Component {
  state = {
    name: ''
  };

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    }, () => {
      console.log(this.state.name);
      // log the state variable value in callback fucntion of setState to get current value of the targeted input
    });
  };

  handleKeyDown = (e) => {
    // either (e.which || e.keyCode) === 13 or e.key === 'Enter'
    if((e.which || e.keyCode) === 13){
      console.log('KeyCode:' + e.keyCode + ' ' + e.key + ' is pressed');
      history.push('/board', { playerName: `${this.state.name}` });
    }
  };

  render() {
    return (
      <div className="home" style={{backgroundImage: `url(${backimg})`}} >
        <div id="container">
          <div id="titleText">TRIVIA GAME</div> 
          <input 
              id="nameBox" 
              type="text" 
              autoFocus={true} 
              spellCheck="false" 
              value={this.state.name}
              onChange={this.handleChange} 
              onKeyDown={this.handleKeyDown} 
            />
          <p>Enter your name and Press <span id="key">Enter</span> key</p>
        </div>
      </div>
    );
  }
}

export default Home;
