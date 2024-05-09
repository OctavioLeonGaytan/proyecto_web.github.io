import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import NavigationBar from '../components/NavigationBar';

import '../css/pages/Dashboard.css';

const Dashboard = () => {

    document.title = 'Inicio | Comtec'

    return (
        <div className="dashboard">
            <Header />
            <NavigationBar />
            <Outlet />
        </div>
    );
}

export default Dashboard;