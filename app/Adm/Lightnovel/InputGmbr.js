import React from "react"

const InputGmbr = ({labels, img, ...rest}) => {
    return (
        <div className="inputgmbr-wrapper">
            <label>{labels}</label>
            <br />
            <input type="file" {...rest} required></input>
        </div>
    )
} 

export default InputGmbr;