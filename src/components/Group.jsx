import "../css/components/Group.css";
import {getProgress} from "../util/get-progress";

const Group = ({id, title, isProgress}) => {
    return (
        <div className="Group">
            <div className="id_section">{id}</div>
            <div className="title_section">{title}</div>
            <div 
            className={`isProgress_section isProgress_section_${isProgress}`}>
            {getProgress(isProgress)}
            </div>
        </div>
    )
}

export default Group;