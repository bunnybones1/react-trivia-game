import React from 'react';
import './Score.css';

const Score = (props) => {

    const { score, name } = props.location.state;

    return (
        <div className="score">
            <p><span>{score}</span> / 10</p>
            <h2><span>{name},</span>&nbsp;
                {
                    (score == 0) ? "Poor!!, Bad score you have scored" :
                        (score > 0 && score < 6) ? "You have to work hard to get good score" :
                            (score > 5 && score < 10) ? "Good but you put some effort to get full" :
                                (score == 10) ? "Fantastic!!!, You did awesome!" : ""
                }
            </h2>
        </div>
    )
};

export default Score;
