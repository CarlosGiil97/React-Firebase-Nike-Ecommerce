import { useEffect,useState } from "react"
import { db } from '../firebase-config.js';
import { ref,onValue,push,update,remove} from 'firebase/database';
import Loader from '../components/Loader';
import {BsFillPlusCircleFill,BsFillEyeFill,BsFillTrashFill} from 'react-icons/bs';




import { useContext } from 'react'

import Context from '../components/Context'


function AllProducts() {
    
    const [products, setProducts] = useState([])
    const [allProducts, setAllProducts] = useState([])
    const { addToCart,loggedIn } = useContext(Context)
    const [text,setText] = useState('');
    
    useEffect(() => {
        
        return onValue(ref(db, '/productos'), querySnapShot => {
          let data = querySnapShot.val() || {};
         
          let todoItems = {...data};
         
          setProducts(Object.values(todoItems))
          setAllProducts(Object.values(todoItems));
          
        });
        
      },[]);


      const filterCat = (categoria) => {

        
        
        //recorro productos para ver si coinciden con la categoria seleccionada
        let productsFilter = [];

        allProducts.forEach(product => {
            let catsProduct = product.cat.split(',');

            if(catsProduct.includes(categoria)){
                
                productsFilter.push(product);
            }
            
        });

        setProducts(productsFilter);
            
      }

      const cleanFilter = () => {
        setProducts(allProducts)
      }

      const searchproduct = () => {
        //compruebo si el texto introducido por el usuario coincide con un producto en la base de datos
        //let productos = products.filter(product => product.nombre.toLowerCase().includes(text.toLowerCase()));
        ///recorro productos para encontrar el producto que coincida con el texto introducido por el usuario
        let productos = [];
        if(text.length > 0){
            products.map(product => (
                product.nombre.toLowerCase().includes(text.toLowerCase()) ? productos.push(product) : null
            ))

            setProducts(productos)
        }else{
            setProducts(allProducts)
        }
       
    }



   

   
    return  <div>
        {products == [] ? 
        <>
            <Loader />
        </> 
        : 
        <>
       
            <center>
                <h1 className="mt-5">Listado de productos</h1>
            </center>
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
                        <center>
                            <label><b>Categorias:</b></label>
                            <div className="bd-example m-1">
                                <button onClick={() => filterCat('jordan')} class="badge bg-secondary text-white m-1">Jordan</button>
                                <button onClick={() => filterCat('lifestyle')} class="badge bg-secondary text-white m-1">Lifestyle</button>
                                <button onClick={() => filterCat('airForce')} class="badge bg-secondary text-white m-1">Air Force</button>
                                <button onClick={() => filterCat('running')} class="badge bg-secondary text-white m-1">Running</button>
                                <button onClick={() => cleanFilter()} class="badge bg-danger text-white m-1"><BsFillTrashFill /></button>
                            </div>
                        </center>
                    </div>
                    <div className="col-md-6 col-lg-6 mb-4 mb-md-0">
                        
                            <label style={{textAlign:"right"}}><b>Buscar:</b></label>
                            <input width="50%" type="text"  onKeyUp={searchproduct} onChange={(e) => setText(e.target.value)} className="form-control" placeholder="Buscar producto ..." />
                        
                    </div>
                    
                    
                </div>
                
                <div className="row justify-content-center">

                    {
                        products.map(product => (
                            <div key={product.id} className="col-md-3 col-lg-3 mb-4 mb-md-0">
                                <div className="card">
                                <div className="d-flex justify-content-between p-3">
                                    <p className="lead mb-0">Nike</p>
                                    
                                </div>
                                <img src={`assets/${product.id}.png`}
                                    className="card-img-top" alt="Laptop" />
                                <div className="card-body">
                                    <div className="d-flex justify-content-between">
                                    <p className="small"><a href="#!" className="text-muted">Zapatillas</a></p>
                                    
                                    </div>

                                    <div className="d-flex justify-content-between mb-3">
                                    <h5 className="mb-0">{product.nombre}</h5>
                                    <h5 className="text-dark mb-0">{product.precio}€</h5>
                                    </div>

                                    <div className="d-flex justify-content-between mb-2">
                                        {loggedIn == true ?
                                            <button  onClick={() => addToCart(product)} className="btn btn-xs btn-success text-white mb-0">
                                                <BsFillPlusCircleFill  className="me-2" /> Añadir al carrito
                                            </button>
                                            :
                                            ''
                                        }
                                    <a  href={`detail/${product.id}`} className="btn btn-xs btn-secondary text-dark mb-0">
                                        <BsFillEyeFill  className="me-2" /> Ver
                                    </a>
                                    </div>
                                </div>
                                </div>
                            </div>
                        ))
                    }
                    
                </div>
            </div>
        
        </>
        }
      </div>
    
   

}

export default AllProducts;