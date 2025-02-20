import { useState } from "react";

const RealTimeInputField = () => {
    const [value, setValue] = useState('');

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <div style={{ margin: "20px" }}>
            <label
                htmlFor="inputField"
                style={{ display: "block", marginBottom: "10px" }}>

                Skriv något:

            </label>

            <input
                id="inputField"
                type="text"
                value={value}
                onChange={handleChange}
                style={{ padding: "5px", width: "300px", marginBottom: "10px" }}
            />
            <p>Aktuellt värde: {value}</p>
        </div>
    )

}

export default RealTimeInputField;