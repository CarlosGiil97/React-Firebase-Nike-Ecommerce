import Context from '../components/Context'
import { useContext } from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import {SlLogout} from 'react-icons/sl'
import { FiUser} from 'react-icons/fi'

export default function Navbar(){

    const { logout,numberCart} = useContext(Context);
    return (
        <>
            
            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="container-fluid">

                            <button
                            className="navbar-toggler"
                            type="button"
                            data-mdb-toggle="collapse"
                            data-mdb-target="#navbarSupportedContent"
                            aria-controls="navbarSupportedContent"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                            >
                            <i className="fas fa-bars"></i>
                            </button>


                            <div className="collapse navbar-collapse" id="navbarSupportedContent">

                            <a className="navbar-brand mt-2 mt-lg-0" href="/">
                                <img
                                src="/assets/nike-rm.png"
                                height="50"
                                alt="MDB Logo"
                                loading="lazy"
                                />
                            </a>

                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <a className="nav-link" href="/productos">Todos los productos</a>
                                </li>
                                
                            </ul>

                            </div>



                        <div className="d-flex align-items-center">

                            <a className="text-reset me-3 mr-3" href="/cart">
                                <FaShoppingCart />
                                <span class="badge rounded-pill m-1 badge-notification bg-danger">{numberCart}</span>
                            </a>
                          

                            <span>
                                <b>{sessionStorage.username}</b> 
                                <FiUser  size={40}/>
                            </span>
                            <span className='m-1'><SlLogout className="text-danger" onClick={logout} size={30}/></span>
                            
                        </div>
                </div>
            </nav>
        </>
    );
    

}


    
    
