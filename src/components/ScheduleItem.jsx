import "../css/components/ScheduleItem.css";

const ScheduleItem = ({id, title}) => {
    return (
        <div className="ScheduleItem">
            <div className="id_section">{id}</div>
            <div className="title_section">{title}</div>
        </div>
    )
}

export default ScheduleItem;