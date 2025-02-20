/* eslint-disable react/prop-types */
import { v4 as uuidv4 } from 'uuid';

const NameListWithButtons = ({ people }) => {
    const handleClick = (hobby) => {
        alert(`Personens hobby är: ${hobby}`)
    };

    const peopleWithId = people.map((person) => ({
        ...person, id: person.id || uuidv4()
    }));

    return (
        <div>
            <ul>
                {peopleWithId.map((person) => (
                    <li key={person.id} style={{ marginBottom: "10px" }}>{person.name} ({person.age} år)
                        <button onClick={() => handleClick(person.hobby)} style={{ marginLeft: "10px" }}>
                            Visa hobby
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default NameListWithButtons;