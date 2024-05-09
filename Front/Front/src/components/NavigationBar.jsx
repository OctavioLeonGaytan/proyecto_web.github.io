import { NavLink } from 'react-router-dom';

import '../css/components/NavigationBar.css';

const NavigationBar = () => {
    return (
        <nav className="navigation-bar">
            <div className='navigation-bar-elements-container'>
                <NavLink
                    className={({ isActive }) => isActive ? 'navigation-bar-element' + ' navigation-bar-element-active' : 'navigation-bar-element'}
                    to='planteles/'
                >
                    Planteles
                </NavLink> 
                <NavLink
                    className={({ isActive }) => isActive ? 'navigation-bar-element' + ' navigation-bar-element-active' : 'navigation-bar-element'}
                    to='computadoras/'
                >
                    Computadoras
                </NavLink>
                <NavLink
                    className={({ isActive }) => isActive ? 'navigation-bar-element' + ' navigation-bar-element-active' : 'navigation-bar-element'}
                    to='mantenimientos/'
                >
                    Mantenimientos
                </NavLink>
            </div>
        </nav>
    )
}

export default NavigationBar;