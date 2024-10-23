import "../css/components/Apply.css";
import RoundBox from "./RoundBox";
import Button from "./Button";
import { useEffect, useState } from "react";

const Apply = ({r_name, apply}) => {
    const [applicant, setApplicant] = useState(apply);
    
    // 수락 버튼 클릭 시 호출
    const onAccept = () => {
        setApplicant({...applicant, accept: true});
        apply.accept = true;
    }

    // 거절 버튼 클릭 시 호출
    const onReject = () => {
        setApplicant({...applicant, accept: false});
        apply.accept = false;
    }

    return (
        <div className="Apply">
            <div className="box">
                <RoundBox apply={r_name} readOnly={true} />
            </div>
            <div className="button_section">
                <Button text={"수락"} onClick={onAccept} type={apply.accept === true ? "POSITIVE":""} />
                <Button text={"거절"} onClick={onReject} type={apply.accept === false ? "NEGATIVE":""} />
            </div>
        </div>
    )
}

export default Apply;