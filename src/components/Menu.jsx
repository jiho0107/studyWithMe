import "../css/components/Menu.css";

const Menu = ({text, onClick}) => {
    return (
        <h4 className="Menu" onClick={onClick}>{text}</h4>
    )
}

export default Menu;