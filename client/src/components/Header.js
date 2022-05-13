import Button from "./Button";

function Header(props){
    return(
        <header>
            <h1>Pametni paketnik RAIN {props.name}</h1>
            <Button text="Prijava"/>
            <Button text="Registracija"/>
        </header>
    )
}

export default Header;