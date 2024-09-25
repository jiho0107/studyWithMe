import "../css/components/Apply.css";
import RoundBox from "./RoundBox";
import Button from "./Button";

const Apply = ({r_name}) => {
    // 버튼 눌렀을때 버튼 색상 변경되게 해야함
    // 버튼 아무것도 안눌렀을땐 버튼 경계색 빨갛게 해야함
    return (
        <div className="Apply">
            <div className="box">
                <RoundBox apply={r_name} readOnly={true} />
            </div>
            <div className="button_section">
                <Button text={"수락"} />
                <Button text={"거절"} />

                {/* <button>수락</button>
                <button>거절</button> */}
            </div>
        </div>
    )
}

export default Apply;