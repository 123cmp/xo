import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import Field from "./components/Field";
import Manager from "./ais/Manager";
import PlayerInfo from "./components/PlayerInfo";

const FILED_WIDTH = 15;
const FIELD_HEIGHT = 15;
let manager = null;
let interval = null;

function App() {
    let fieldRows = [];
    const fieldRow = [];

    fieldRows.length = FIELD_HEIGHT;
    fieldRow.length = FILED_WIDTH;
    fieldRow.fill(null)
    fieldRows = fieldRows.fill(null).map(
        () => fieldRow.slice()
    )
    const [fieldModel, setFieldModel] = useState(fieldRows);
    const [step, setStep] = useState(1);
    const [streak, setStreak] = useState(null);
    const [player1Time, setPlayer1Time] = useState(0);
    const [player2Time, setPlayer2Time] = useState(0);

    if(!manager) {
        manager = new Manager(fieldModel);
    }

    clearInterval(interval);
    interval = setInterval(() => {
        const result = manager.step()
        if (result.win) {
            setStreak(result.streak);
           return clearInterval(interval);
        }
        setFieldModel(result);
        setStep(step + 1);
        setPlayer1Time(manager.player1Time);
        setPlayer2Time(manager.player2Time);
    }, 500);

    return (
        <div className="App">
            <div>Step: {step}</div>
            <div className="game-wrapper">
                <PlayerInfo name={manager.player1Name} time={player1Time} symbol={manager.player1Symbol} />
                <Field fieldModel={fieldModel} streak={streak}/>
                <PlayerInfo name={manager.player2Name} time={player2Time} symbol={manager.player2Symbol} />
            </div>

        </div>
    );
}

export default App;
