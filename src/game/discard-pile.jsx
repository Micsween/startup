import React from "react";

export function DiscardPile({lastCard}) {
  // function drawCard() {
  //     setLastCard(drawPile[0]);
  //     setHand(hand.concat(drawPile[0]));
  //     setDrawPile(drawPile.slice(1));
  // }
  //update the last card to be whatever the hand gives it 

  return <img 
    src={lastCard}
    className="playing-card" />;
}
