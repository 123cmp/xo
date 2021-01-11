import './Field.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { faCircle } from '@fortawesome/free-regular-svg-icons'

export default function Field({fieldModel, streak, onCellClick}) {

    function renderCell(i, j, cell) {
        let marked = false;
        let isBottom = i === 14;
        let isLeft = j === 0;

        if (streak && streak.length) {
            if (streak.find(q => q[0] === i && q[1] === j)) {
                marked = true;
            }
        }

        const cellClass = `cell ${marked ? "marked" : ""} ${isLeft ? "left": ""} ${isBottom ? "bottom": ""}`

        return <td onClick={onCellClick.bind(null, i, j)} className={cellClass} key={`${i}-${j}`}>
            { cell === "X" ? <FontAwesomeIcon className="x-cell" icon={faTimes} size="lg" /> : "" }
            { cell === "O" ? <FontAwesomeIcon className="o-cell" icon={faCircle} size="lg" /> : "" }
        </td>
    }

    return <table className="table">
        <tbody>
            {
                fieldModel.map((row, i) => <tr className="row" key={i}>
                    {
                        row.map((cell, j) => renderCell(i, j, cell))
                    }
                </tr>)
            }
        </tbody>
    </table>

}