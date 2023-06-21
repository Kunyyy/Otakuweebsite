import React from "react";

const Inputs = ({label, value, onChange }) => {
    return (
        <div>
            <label>{label}</label>
            <br />
            <input value={value} onChange={onChange}></input>
            <br /><br />
        </div>
    )
}

export default Inputs;