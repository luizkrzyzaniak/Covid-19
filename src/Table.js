import React from 'react';
import './Table.css';

function Table({ paises }) {
    return (
        <div className="table">
            {paises.map(({country, cases}) => (
                <tr>
                    <td>{country}</td>
                    <td>
                        <strong>{cases}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default Table
