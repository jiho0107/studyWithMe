import "../css/components/RectangleBox.css";

const RectangleBox = ({text, readOnly=false, onChange}) => {
    if(!readOnly){
        return (
            <input 
                className="RectangleBox" 
                type="text"
                value={text}
                onChange={onChange}
                required />
        )
    }
    // readOnly 인 경우
    return (
        <input 
            className="RectangleBox_readOnly" 
            type="text"
            value={text} 
            readOnly
            required/>
    )
}

export default RectangleBox;