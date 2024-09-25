import "../css/components/RoundBox.css";
import { useState } from "react";


// text:placeholder문구, type:text/password, apply:지원자 이름을 읽기 전용으로
const RoundBox = ({text, type="text", readOnly=false, apply}) => {

    // readOnly 아닌 경우
    if(!readOnly){
        return (
            <input 
            className="RoundBox"
            placeholder={text}
            type={type}
            maxLength={20}
            required
             />
        )
    }

    // readOnly 인 경우
    return (
        <input 
        className="RoundBox_readOnly" 
        type={type}
        maxLength={20}
        value={apply}
        readOnly />
    )
}

export default RoundBox;