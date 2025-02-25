import React from 'react';


export function DrawPile({setLastCard}) {
    function drawCard() {
        setLastCard("drew");
        alert("This is a draw pile.");
    }
    return (
        <img 
        src="card-images/card-back.svg" 
        className="playing-card"
        onClick={drawCard} />
    );
};
