import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {faCircle} from "@fortawesome/free-regular-svg-icons";

const symbolIcon = (symbol) => {
    return symbol === "X"
        ? <FontAwesomeIcon className="x-cell" icon={faTimes} size="lg" />
        : <FontAwesomeIcon className="o-cell" icon={faCircle} size="lg" />
}

export default function PlayerInfo({symbol, name, time}) {
    return <section>
        {symbolIcon(symbol)}
        <h1 className="player-name">{name}</h1>
        <h4>{time}</h4>
    </section>
}