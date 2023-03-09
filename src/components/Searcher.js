import React from 'react';
import {useState, useEffect} from'react';
import { db } from '../firebase-config.js';
import { ref,onValue,push,update,remove} from 'firebase/database';
import Context from '../components/Context'
import { useContext } from 'react'
import {BsFillPlusCircleFill,BsFillEyeFill} from 'react-icons/bs';
import AllProducts from '../pages/AllProducts.js';



export default function Searcher(){

    const [text,setText] = useState('');
    const [results,setResults] = useState([]);
    const [products,setProducts] = useState([]);

    const { addToCart } = useContext(Context);


      
    useEffect(() => {
        
        return onValue(ref(db, '/productos'), querySnapShot => {
          let data = querySnapShot.val() || {};
          let todoItems = {...data};
          setProducts(Object.values(todoItems)
          );
          
        });
        
      },[]);

    

    const searchproduct = () => {
        //compruebo si el texto introducido por el usuario coincide con un producto en la base de datos
        //let productos = products.filter(product => product.nombre.toLowerCase().includes(text.toLowerCase()));
        ///recorro productos para encontrar el producto que coincida con el texto introducido por el usuario
        let productos = [];
        if(text.length > 0){
            products.map(product => (
                product.nombre.toLowerCase().includes(text.toLowerCase()) ? productos.push(product) : null
            ))
            setResults(productos)
        }else{
            setResults([])
        }
       
    }

    


    return (
        <>
            <center>
              
            </center>

            <section className="header-main border-bottom bg-white">
	<div className="container-fluid">
       <div className="row p-2 pt-3 pb-3 d-flex align-items-center">
           <div className="col-md-2">
               
           </div>
           <div className="col-md-8">
        <div className="d-flex form-inputs">
        <input className="form-control"  onKeyUp={searchproduct} onChange={(e) => setText(e.target.value)} type="text" placeholder="Buscar algún modelo de zapatilla ..." />
        <i className="bx bx-search"></i>
        </div>
           </div>
           
           <div className="col-md-2">
               <div className="d-flex d-none d-md-flex flex-row align-items-center">
                   <span className="shop-bag"><i class='bx bxs-shopping-bag'></i></span>
                   <div className="d-flex flex-column ms-2">
                       
                   </div>    
               </div>           
           </div>
       </div>
	</div> 
    {results.length > 0 ? 
                    <>
                        <h5>Han aparecido {results.length} resultados con el nombre {text}</h5>
                        <div className="container py-5">
                            <div className="row justify-content-center">
                            {
                                results.map(product => (
                                    <div  key={product.id} className="col-md-3 col-lg-3 mb-4 mb-md-0">
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
                                            <button  onClick={() => addToCart(product)} className="btn btn-xs btn-success text-white mb-0">
                                                <BsFillPlusCircleFill  className="me-2" /> Añadir al carrito
                                            </button>
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
                    :
                    <h5>Busque la zapatilla que mas desea ...</h5>
                }
</section>
        </>
    );
    

}