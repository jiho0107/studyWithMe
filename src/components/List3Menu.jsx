import "../css/components/List3Menu.css";

const List3Menu = ({t1, t2, t3}) => {
    return (
        <div className="List3Menu">
            <section className="section_1">{t1}</section>
            <section className="section_2">{t2}</section>
            <section className="section_3">{t3}</section>
        </div>
    )
}

export default List3Menu;