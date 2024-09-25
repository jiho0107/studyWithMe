import "../css/pages/Notfound.css";
import caution from "../assets/caution.png";

const Notfound = () => {
    return (
        <div className="Notfound">
            <img className="img" src={caution}/>
            <h1 className="text">해당 요청을 처리할 수 없습니다!</h1>
        </div>
    )
}

export default Notfound;