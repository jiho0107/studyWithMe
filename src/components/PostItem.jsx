import "../css/components/PostItem.css";
import { useNavigate } from "react-router-dom";

// null반환하면 아무것도 렌더링 하지 않음

const PostItem = ({id, title, member, isProgress, onClick}) => {
    const nav = useNavigate();

    return (
        <div className="PostItem" onClick={onClick}>
            <div className="id_section_">{id}</div>
            <div className="title_section_">{title}</div>
            {member && <div className="memberId_section_">{member}</div>}
            {/* {isProgress && <div className="progress_section">{isProgress}</div>} */}

            {/* {isProgress !== null && isProgress !== undefined ? (
                <div className={`progress_section progress_section_${isProgress}`}>{isProgress?"진행 중":"완료"}</div>)
                : (<div className="progress_section"></div>)} */}

            {isProgress === true && <div className={`progress_section_ progress_section_${isProgress}_`}>{isProgress?"진행 중":"완료"}</div>}
            {isProgress === false && <div className={`progress_section_ progress_section_${isProgress}_`}>{isProgress?"진행 중":"완료"}</div>}
            {isProgress === null && <div className="progress_section_"></div>}
            {isProgress === undefined && null}
        </div>
    )
}

export default PostItem;