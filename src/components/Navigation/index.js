import logo from './../../assets/logo.png';
import { NavLink } from "react-router-dom";
import './navigation.css';

const Navigation = () => {
    return (
        <header className="header">
		<div className="container">
			<nav className="top-line">
				<div className="top-menu d-none d-lg-block">
					<ul>
						<li>
                            <NavLink className="link" activeClassName="active" to='/'>Главная</NavLink>
                        </li>
						<li>
                            <NavLink className="link" activeClassName="active" to='/about'>О нас</NavLink>
                        </li>
						<li>
							<NavLink to="/" className="top-menu__logo">
								<picture>
									<img src={logo} alt="Лого" className="lazyload" />
								</picture>
							</NavLink>
						</li>
                        <li>
                            <NavLink className="link" activeClassName="active" to='/contacts'>Контакты</NavLink>
                        </li>
                        <li>
                            <NavLink className="link" activeClassName="active" to='/roadmap'>Roadmap</NavLink>
                        </li>
					</ul>
				</div>	
			</nav>
		</div>
	</header>
    )
}

export default Navigation;
