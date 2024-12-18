
import {Link,useNavigate}from 'react-router-dom';
import storage from '../Storage/storage';
import axios from 'axios';


const Nav = () => {
const go =useNavigate();
const logout= async()=>{
  storage.remove('authToken');
  storage.remove('authUser');
  await axios.get('/api/auth/logout', storage.get('authToken'));
  go('/login');

}

  return (
    <nav className='navbar navbar-expand-lg navbar-white bg-danger'>
      <div className='container-fluid'>
        <a className='navbar-brand'>ORII</a>
        <button className='navbar-toggler' type='button' data-bs-toggle='collapse' 
        data-bs-target='#nav' aria-controls='navbarSupportedContent'>
          <span className='navbar-toggler-icon'></span>
        </button>

      </div>
      
      { storage.get('authUser') ? (
        <div className='collapse navbar-collapse' id='nav'>  
        <ul className='navbar-nav mx-auto mb-2'>
        
          <li className='nav-item px-lg-5 h4'>
           {storage.get('authUser').name}
          </li>

          <li className='nav-item px-lg-5'>
          <Link to= '/' className='nav-link'> Cursos </Link>
          </li>

          <li className='nav-item px-lg-5'>
          <Link to= '/employees' className='nav-link'> Participante </Link>
          </li>

          <li className='nav-item px-lg-5'>
          <Link to= '/graphic' className='nav-link'> Grafico </Link>
          </li>

        </ul>
        <ul className='navbar-nav mx-auto mb-2'>
        <li className='nav-item px-lg-5'>
          <button className='btn btn.info'onClick={logout}>Logout</button>
          </li>

        </ul>
        </div>
      ):''}
      </nav>
  )
}

export default Nav