import "../css/components/List2Menu.css";

const List2Menu = ({t1,t2}) => {
    return (
        <div className="List2Menu">
            <section className="section_1">{t1}</section>
            <section className="section_2">{t2}</section>
        </div>
    )
}

export default List2Menu;