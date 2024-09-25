import "../css/components/PostItem.css";

// null반환하면 아무것도 렌더링 하지 않음

const PostItem = ({id, title, writer, isProgress}) => {
    return (
        <div className="PostItem">
            <div className="id_section_">{id}</div>
            <div className="title_section_">{title}</div>
            {writer && <div className="writer_section_">{writer}</div>}
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