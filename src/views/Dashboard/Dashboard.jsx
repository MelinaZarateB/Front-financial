import './Dashboard.css';
import SideBar from '../../components/SideBar/SideBar';
import NavBar from '../../components/NavBar/NavBar';

const Dashboard = () => {
    return(
      <section className='container-dashboard'>
        <div>
            <SideBar></SideBar>
        </div>
        <div className='main'>
            <main>
                <h2>Hola</h2>
            </main>
        </div>

      </section>
    )
}
export default Dashboard;
