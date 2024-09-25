import "../css/components/GroupSchedule.css";
import { getProgress } from "../util/get-progress";

const GroupSchedule = ({id, title, isProgress}) => {
    // 파라미터는 각각 그룹의 id,그룹명,진행상황
    // 개인일정일 경우는 파라미터로 title만 전해주면 됨
    return (
        <div className="GroupSchedule">
            <div className="isGroup_section">{id?"그룹":"개인"}</div>
            <div className="title_section">{title}</div>
            {!id && <div className="blank"></div>}
            {id && <div className={`isProgress_section isProgress_section_${isProgress}`}>{getProgress(isProgress)}</div>}
        </div>
    )
}
// 그룹id를 반환X -> 개인일정이고 isProgress는 빈문자열이어야함
export default GroupSchedule;