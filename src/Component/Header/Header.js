import React, { useContext } from 'react';

import { Link } from 'react-router-dom';
import logo from '../../Logo.png';
import './Header.css';
import Rectangle1 from '../../Image/Rectangle1.png';
import { SelectContext } from '../../App';


const Header = () => {
    const [loggedInUser, setLoggedInUser ,handleSignOut, handleSignIn,handleSubmit]= useContext(SelectContext);
    
    return (
        <div  style={{ backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url(${Rectangle1})` }} className="header ">
            <nav className="nav">
                <ul>
                    <li>
                        <img className="logo text-white" src={logo} alt=""/>
                    </li>
                    <li>
                        <input className="search  text-white" type="search" name="" id="" placeholder='seacrh your destination'/>
                    </li>
                    <li>
                        <Link className='text-white' to="/home">Home</Link>
                    </li>
                    <li>
                        <Link className='text-white' to="/destination">Destination</Link>
                    </li>
                    <li>
                        <Link  className='text-white' to="/contact">Contact</Link>
                    </li>
                    <li>
                        {/* <p>Welcome ,  {loggedInUser.name}</p>
                        <Link to="/login" className="btn btn-warning"  >Login</Link>
                        <Link><button onClick={()=>setLoggedInUser({})}>Sign Out</button></Link> */}
                        {loggedInUser.email || loggedInUser.name ? <Link onClick={() => setLoggedInUser({})} className="btn btn-success">{loggedInUser.name ? loggedInUser.name  : loggedInUser.email}</Link> : <Link to="/login" className="btn btn-warning font-weight-bold">Login</Link>
                        }
                       
                    </li>
                    
                </ul>
            </nav>
            
            
        </div>
    );
};

export default Header;