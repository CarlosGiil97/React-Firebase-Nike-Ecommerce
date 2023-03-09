import Context from '../components/Context'
import { useContext } from 'react'
import {FaShoppingCart} from 'react-icons/fa'
import {SlLogout} from 'react-icons/sl'
import { FiUser} from 'react-icons/fi'

export default function Navbar1(){

    const { logout,numberCart} = useContext(Context);
    return (
        <>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark" aria-label="Fifth navbar example">
                <div class="container-fluid">
                <a class="navbar-brand" href="/">
                <img
                                src="/assets/nike-rm.png"
                                height="40"
                                alt="MDB Logo"
                                loading="lazy"
                                />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample05" aria-controls="navbarsExample05" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarsExample05">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="/productos">Todos los productos</a>
                    </li>
                   
                    
                    
                    </ul>
                    <form>
                        <div className="d-flex align-items-center">
                            <a className="text-reset me-3 mr-3" href="/cart">
                                <FaShoppingCart style={{color:'white'}}/>
                                <span class="badge text-white rounded-pill m-1 badge-notification bg-danger">{numberCart}</span>
                            </a>
                            

                            <span>
                                <b style={{color:'white'}}> {sessionStorage.username}</b> 
                                <FiUser  size={40}/>
                            </span>
                            <span className='m-1'><SlLogout className="text-danger" onClick={logout} size={30}/></span>
                        </div>
                    </form>
                </div>
                </div>
            </nav>
        </>
    );
    

}


    
    
