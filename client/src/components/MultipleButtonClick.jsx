const MultipleButtonClick = () => {

    const handleClick1 = () => {
        alert("Meddelande 1 visas nu")
    }
    const handleClick2 = () => {
        alert("Meddelande 2 visas nu")
    }
    const handleClick3 = () => {
        alert("Meddelande 3 visas nu")
    }

    return (
        <div style={{ margin: "20px" }}>
            <button onClick={handleClick1}>Här visas meddelande 1</button>
            <button onClick={handleClick2} style={{ margin: "10px" }}>Här visas meddelande 2</button>
            <button onClick={handleClick3}>Här visas meddelande 3</button>
        </div>
    )
}

export default MultipleButtonClick;