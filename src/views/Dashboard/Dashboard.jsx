import './Dashboard.css';
import SideBar from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar/NavBar';

const Dashboard = () => {
    return(
      <section className='container-dashboard'>
        <div>
            <SideBar></SideBar>
        </div>
        <div>
            <main>

            </main>
        </div>

      </section>
    )
}
export default Dashboard;
