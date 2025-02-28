import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./game.css";
import { useNavigate } from "react-router-dom";
import { PlayerInfo } from "./player-info";
import { UnoGame } from "../server.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
let game;
//LATER YOU NEED TO UPDATE THIS SO THAT
export function Game() {
  let { gameCode } = useParams();
  const [state, setState] = useState();
  const navigate = useNavigate();
  const [lastCard, setLastCard] = React.useState("card-images/card-back.svg");
  const [players, setPlayers] = React.useState([
    "Michelle",
    "Lauren",
    "Eryn",
    "James",
  ]);
  const [hand, setHand] = React.useState([]);
  const [isHovered, setIsHovered] = React.useState(false);
  useEffect(() => {
    game = new UnoGame();
    game.joinGame("Michelle");
    game.joinGame("Lauren");
    game.joinGame("Eryn");
    game.joinGame("James");
    const gameState = game.startGame();
    setState(gameState);
  }, []);
  // useEffect(() => {
  //   setState(gameState);
  // }, [gameState]);
  // React.useEffect(() =>{
  //   if(hand.length === 0) {
  //     setHand(["Game Won!"]);
  //     setTimeout(function() {
  //       navigate('/join');
  //     }, 2000);

  //   }
  // }, [hand])
  React.useState(() => {
    let cards = [
      "card-images/blue-cards/1.png",
      "card-images/blue-cards/7.png",
      "card-images/green-cards/3.png",
      "card-images/yellow-cards/8.png",
    ];
    setHand(cards);
  }, []);

  // let newHand = [];
  // cards.forEach((card) => {
  //   newHand.push(
  //     <img
  //       src={card}
  //       className="user-card"
  //       onClick={(e) => {
  //         setLastCard(e.target.getAttribute("src"));
  //         setHand(hand.filter(
  //           (card) => card.props.src !== e.target.getAttribute("src")
  //         ));
  //       }}
  //       onHover={() => {
  //         setIsHovered(true);
  //       }}
  //     />
  //   );
  // });
  // setHand(newHand);
  const [enemyHand, setEnemyHand] = React.useState([]);
  React.useState(() => {
    let cards = [
      ,
      "card-images/card-back.svg",
      "card-images/card-back.svg",
      "card-images/card-back.svg",
      "card-images/card-back.svg",
    ];
    let newHand = [];
    cards.forEach((card, index) => {
      newHand.push(<img key={index} src={card} className="playing-card" />);
    });
    setEnemyHand(newHand);
  });

  const [enemySideHand, setEnemySideHand] = React.useState([]);
  React.useState(() => {
    let cards = [
      "card-images",
      "card-images/card-back.svg",
      "card-images/card-back.svg",
      "card-images/card-back.svg",
    ];
    let newHand = [];
    cards.forEach((card, index) => {
      newHand.push(
        <img key={index} src={card} className="playing-card" id="card-back" />
      );
    });
    setEnemySideHand(newHand);
  });
  if (!state) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <div id="game">
        <div id="grid-container">
          <div className="grid-item main-user">
            <PlayerInfo />
            <div className="player-hand top-user">
              {state.players[0].hand.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onCardClick={async () => {
                    console.log("I am being clicked!!!");
                    console.log(card);
                    setState(await game.playCard(card));
                  }}
                />
              ))}
            </div>
          </div>
          <div className="grid-item player-left">
            <div className="player-hand top-user">
              {" "}
              {/*Removed enemy-hand from className */}
              {state.players[1].hand.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onCardClick={async () => {
                    console.log("I am being clicked!!!");
                    console.log(card);
                    setState(await game.playCard(card));
                  }}
                />
              ))}
            </div>
            <PlayerInfo />
          </div>
          <div className="grid-item player-top">
            <PlayerInfo />
            <div className="player-hand top-user">
              {" "}
              {/*Removed enemy-hand from className */}
              {state.players[2].hand.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onCardClick={async () => {
                    console.log("I am being clicked!!!");
                    console.log(card);
                    setState(await game.playCard(card));
                  }}
                />
              ))}
            </div>
          </div>
          <div className="grid-item player-right">
            <div className="player-hand top-user">
              {" "}
              {/*Removed enemy-hand from className */}
              {state.players[1].hand.map((card, index) => (
                <Card
                  key={index}
                  card={card}
                  onCardClick={async () => {
                    console.log("I am being clicked!!!");
                    console.log(card);
                    setState(await game.playCard(card));
                  }}
                />
              ))}
            </div>
            <PlayerInfo />
          </div>
          <div className="grid-item draw-discard-piles">
            <DrawPile
              drawPile={state.drawPile}
              onDrawCard={async () => {
                //when i have a server add async
                setState(await game.drawCard());
              }}
            />
            <DiscardPile discardPile={state.discardPile} />
          </div>
        </div>
      </div>
    </main>
  );
}
//<div className="grid-item _____"> //main user, player top, player left, player right,
//<hand> component
//</div>

export function DrawPile({ drawPile, onDrawCard }) {
  return (
    <div>
      <img
        src="/card-images/card-back.svg"
        className="playing-card user-card"
        onClick={onDrawCard}
      />
    </div>
  );
}
export function DiscardPile({ discardPile }) {
  return (
    <img
      src={`/card-images/${discardPile[0].color}-cards/${discardPile[0].number}.png`}
      className="playing-card"
    />
  );
}
export function Card({ card, onCardClick }) {
  return (
    <img
      color={`${card.color}`}
      number={`${card.number}`}
      src={`/card-images/${card.color}-cards/${card.number}.png`}
      className="playing-card user-card"
      onClick={onCardClick}
    />
  );
}
