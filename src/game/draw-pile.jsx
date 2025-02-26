import React from "react";

export function DrawPile({ hand, setHand,setLastCard }) {
  const [drawPile, setDrawPile] = React.useState([]);

  function shuffleCards(cards) {
    let shuffledDeck = [];
    for (let i = 0; i < cards.length; i++) {
      let random = Math.floor(Math.random() * cards.length);
      shuffledDeck.push(cards[random]);
    }
    return shuffledDeck;
  }

  React.useState(() => {
    let cards = [];
    let cardTypes = ["red", "blue", "yellow", "green"];
    for (let i = 0; i < 4; i++) {
      let cardPath = "card-images/" + cardTypes[i] + "-cards/";
      for (let i = 0; i <= 9; i++) {
        cards.push(`${cardPath}` + `${i}.png`);
      }
    }
    const shuffledDeck = [];

    shuffleCards(cards).forEach((card) => {
      shuffledDeck.push(
        <img
          src={card}
          className="user-card"
          onClick={(e) => {
            setLastCard(e.target.getAttribute("src"));
            let newHand = hand.filter(
              (card) => card.props.src !== e.target.getAttribute("src")
            );
            console.log(card);
            setHand(newHand);
          }}
        />
      );
    });
    setDrawPile(shuffledDeck);
  });

  function drawCard() {
    //setLastCard(drawPile[0]);
    setHand(hand.concat(drawPile[0]));
    setDrawPile(drawPile.slice(1));
  }
  return (
    <img
      src="card-images/card-back.svg"
      className="playing-card user-card"
      onClick={drawCard}
    />
  );
}
