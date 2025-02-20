/* eslint-disable react/prop-types */
const AnimalList = ({ animals }) => {
    if (!animals || animals.length === 0) {
        return <p>Inga djur att visa</p>
    }

    return (
        <ul>
            {animals.map((animal, index) => (
                <li key={index}>{animal}</li>
            ))}
        </ul>
    )
}

export default AnimalList;