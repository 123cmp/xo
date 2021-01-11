import logo from './logo.svg';
import React, {useState, useEffect} from 'react';
import './App.css';
import Field from "./components/Field";
import Manager from "./ais/Manager";

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
        setStep(step + 1)
    }, 1);

    return (
        <div className="App">
            <div>Step: {step}</div>
            <Field fieldModel={fieldModel} streak={streak}/>
        </div>
    );
}

export default App;
