    import { useEffect,useState } from "react"
    import { db } from '../firebase-config.js';
    import { ref,onValue,push,update,remove} from 'firebase/database';

    import Loader from '../components/Loader';
    import {BsFillPlusCircleFill} from 'react-icons/bs';
    import { useContext } from 'react'

    import Context from '../components/Context'


    function Detail() {
        
        const [products, setProducts] = useState([])
        const { addToCart,loggedIn } = useContext(Context)
        
        useEffect(() => {
            let url = window.location.href

            //separo url por /
            let urlSplit = url.split('/')
            let id = urlSplit[urlSplit.length - 1]


            return onValue(ref(db, '/productos'), querySnapShot => {
            let data = querySnapShot.val() || {};
            
            let todoItems = {...data};
            
            todoItems = todoItems[id] || {};
            
            setProducts(todoItems);
            
            });
            
        },[]);

    

    
        return  <div>
            {products == [] ? 
            <>
                <Loader />
            </> 
            : 
            <>
                {loggedIn == false ? 
                    <>
                    <center>
                        <h6 className="m-4">Inice sesión para poder comprar cualquier producto. <a href="/login">Ir</a></h6>
                    </center>
                    </>
                    : ''}
                    <section className="py-5">
                        <div className="container px-4 px-lg-5 my-5">
                            <div className="row gx-4 gx-lg-5 align-items-center">
                                <div className="col-md-6"><img className="card-img-top mb-5 mb-md-0" src={`/assets/${products.id}.png`}  /></div>
                                <div className="col-md-6">
                                    <div className="small mb-1">SKU: BST-498</div>
                                    <h1 className="display-5 fw-bolder">{products.nombre}</h1>
                                    <div className="fs-5 mb-5">
                                        <span>{products.precio} €</span>
                                    </div>
                                    <p className="lead">
                                        {products.descripcion}
                                    </p>
                                    <div className="d-flex">
                                        {loggedIn == true ? 
                                            <button  onClick={() => addToCart(products)} className="btn btn-xs btn-success text-white mb-0">
                                                <BsFillPlusCircleFill  className="me-2" /> Añadir al carrito
                                            </button>
                                            : ''}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                
            </>
            }
        </div>
        
    

    }

    export default Detail;