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
    const humanMode = false;

    fieldRows.length = FIELD_HEIGHT;
    fieldRow.length = FILED_WIDTH;
    fieldRow.fill(null)
    fieldRows = fieldRows.fill(null).map(
        () => fieldRow.slice()
    )
    const [fieldModel, setFieldModel] = useState(fieldRows);
    const [step, setStep] = useState(1);
    const [current, setCurrent] = useState(1);
    const [streak, setStreak] = useState(null);
    const [player1Time, setPlayer1Time] = useState(0);
    const [player2Time, setPlayer2Time] = useState(0);

    if(!manager) {
        manager = new Manager(fieldModel, humanMode);
    }

    function startGame() {
        clearInterval(interval);
        interval = setInterval(() => {
            const result = manager.step()
            if (!result) {
                return clearInterval(interval);
            }
            if (result.win) {
                setStreak(result.streak);
                return clearInterval(interval);
            }
            setFieldModel(result);
            setStep(step + 1);
            setCurrent(manager.current);
            setPlayer1Time(manager.player1Time);
            setPlayer2Time(manager.player2Time);
        }, 2000);
    }

    startGame();

    const onCellClick = (i, j) => {
        if (manager.current !== 2) {
            return
        }
        const result = manager.humanInput([i, j]);
        if (!result) {
            return
        }
        if (result.win) {
            setStreak(result.streak);
            return clearInterval(interval);
        }
        setFieldModel(result);
        setStep(step + 1);
        setCurrent(manager.current);
    }

    return (
        <div className="App">
            <div>Step: {step}</div>
            <div className="game-wrapper">
                <PlayerInfo isCurrent={current === 1} name={manager.player1Name} time={player1Time} symbol={manager.player1Symbol} />
                <Field onCellClick={onCellClick} fieldModel={fieldModel} streak={streak}/>
                <PlayerInfo isCurrent={current === 2} name={manager.player2Name} time={player2Time} symbol={manager.player2Symbol} />
            </div>

        </div>
    );
}



export default App;
