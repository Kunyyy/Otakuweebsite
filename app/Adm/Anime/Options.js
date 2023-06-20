const Inputs = ({labels, values, onChanges }) => {
    return (
        <div>
            <label>{labels}</label>
            <br />
            <select className='w-full' value={values} onChange={onChanges}>
                <option value="Ongoing">Ongoing</option>
                <option value="Completed">Completed</option>
            </select>
            <br /><br />
        </div>
    )
}

export default Inputs;