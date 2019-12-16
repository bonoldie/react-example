import React from 'react'

const Person = ({ id, name, surname,birthday }) => {
    return (
        <tr>
            <th scope="row">{id}</th>
            <td>{name}</td>
            <td>{surname}</td>
            <td>{birthday}</td>
        </tr>
    )
}

export default Person;