import React from "react";

export function DiscardPile({ lastCard }) {
  return <img src={lastCard} className="playing-card" />;
}
