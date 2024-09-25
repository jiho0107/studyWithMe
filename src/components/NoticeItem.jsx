import "../css/components/NoticeItem.css";

const NoticeItem = ({id, title}) => {
    return (
        <div className="NoticeItem">
            <div className="id_section">{id}</div>
            <div className="title_section">{title}</div>
        </div>
    )
}

export default NoticeItem;