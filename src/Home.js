import React, { Component } from 'react';
import backimg from './images/bg.jpg';
import './Home.css';

class Home extends Component {
  state = {
    name: ''
  };

  handleChange = (e) => {
    this.setState({
      name: e.target.value
    }, 
    () => {
      console.log(this.state.name)
      // log the state variable value in callback fucntion of setState to get current value of the targeted input
    }); 
  }

  render() {
    return (
      <div className="home" style={{backgroundImage: `url(${backimg})`}} >
        <div id="container">
          <div id="titleText">TRIVIA GAME</div> 
          <input id="nameBox" type="text" spellCheck="false" value={this.state.name} autoFocus={true} onChange={this.handleChange}/>
          <p>Enter your name and Press <span id="key">Enter</span> key</p>
        </div>
      </div>
    );
  }
}

export default Home;
