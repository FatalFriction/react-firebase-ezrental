import { Link } from "react-router-dom";
import NotFounds from '../../Assets/images/404.jpg';
import './NotFound.css';

const NotFound = () => {
    return (
        <>
        <img className="img404" src={NotFounds} alt="404"/>
        <div className="container-404">
            <h1>Oops! You seem to be lost.</h1>
            <p>Here are some helpful links:</p>
            <div className="links-container">
                <Link to='/'>Home</Link>
                <Link to='/our-products'>Products</Link>
                <Link to='/contact'>Contact</Link>
            </div>
        </div>
        </>
    )
}


export default NotFound;