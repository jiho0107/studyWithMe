import "../css/components/RectangleBox.css";

const RectangleBox = ({text, readOnly=false, onChangeInput, name}) => {
    if(!readOnly){
        const onChange = (e) => {
            onChangeInput(e)
        }
        return (
            <input 
                className="RectangleBox" 
                type="text"
                value={text}
                onChange={onChange}
                required
                name={name}
            />
        )
    }
    // readOnly 인 경우
    return (
        <input 
            className="RectangleBox_readOnly" 
            type="text"
            value={text} 
            readOnly
            required
        />
    )
}

export default RectangleBox;