import "../css/components/NoticeItem.css";

const NoticeItem = ({id, title, onClick}) => {
    return (
        <div className="NoticeItem" onClick={onClick}>
            <div className="id_section">{id}</div>
            <div className="title_section">{title}</div>
        </div>
    )
}

export default NoticeItem;