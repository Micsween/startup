import React from 'react';


export function DrawPile({setLastCard}) {
    const [drawPile, setDrawPile] = React.useState([]);
    
      function shuffleCards(cards){
        let shuffledDeck = [];
        for(let i = 0; i < cards.length; i++) {
        let random = Math.floor(Math.random() * cards.length);
          shuffledDeck.push(cards[random]); 
        }
        return shuffledDeck;
      }

      React.useState(() => {
        let cards = [];
        let cardTypes = ["red", "blue", "yellow", "green"];
        for(let i = 0; i < 4; i++) {
            let cardPath = "card-images/" + cardTypes[i] + "-cards/";
          for(let i = 1; i <= 10; i++) {
            cards.push(`${cardPath}` + `${i}.png`);
          }
        }
        const shuffledDeck = [];

        shuffleCards(cards).forEach(card => {
          shuffledDeck.push(<img src={card} className="playing-card" />);
        });
        setDrawPile(shuffledDeck);
      });
      React.useState(() => {
        const cards = [];
        let drawPile = [];
        cards.forEach(card => {
          drawPile.push(<img src={card} className="playing-card" id="card-back"/>);
        });
        setDrawPile(drawPile);
      }); 
    
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
