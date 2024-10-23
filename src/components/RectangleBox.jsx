import "../css/components/RectangleBox.css";

const RectangleBox = ({text, readOnly=false, onChangeInput, name, type="text"}) => {
    //readOnly 아닌 경우
    if(!readOnly){
        const onChange = (e) => {
            onChangeInput(e)
        }
        return (
            <input 
                className="RectangleBox" 
                type={type}
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
            type={type}
            value={text||""} 
            readOnly
            required
        />
    )
}

export default RectangleBox;