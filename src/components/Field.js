import './Field.css';
import React from 'react';

export default function Field({fieldModel, streak}) {

    function renderCell(i, j, cell) {
        let marked = false;

        if (streak && streak.length) {
            if (streak.find(q => q[0] === i && q[1] === j)) {
                marked = true;
            }
        }
        return <td className={marked ? "cell marked" : "cell"} key={`${i}-${j}`}>
            {cell}
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