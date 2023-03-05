
import { useContext} from 'react';
import Context from '../components/Context';
import NumericInput from'react-numeric-input';
import {BsFillTrashFill} from 'react-icons/bs';

function Carrito() {


    let { numberCart,deleteToCart,refreshQty,totalPriceCart,setNumberCart} = useContext(Context);
    let actualCart = sessionStorage.cart != undefined ? JSON.parse(sessionStorage.cart) : [];

    
    

    return  <main>
    <section className="h-100" style={{backgroundColor:"#eee"}}>
  <div className="container h-100 py-5">
    <div className="row d-flex justify-content-center align-items-center h-100">
      <div className="col-10">

        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="fw-normal mb-0 text-black">Resumen de su carrito</h3>
         
        </div>
        {
                actualCart.map(product => (

                  <div className="card rounded-3 mb-4">
                      <div className="card-body p-4">
                        <div className="row d-flex justify-content-between align-items-center">
                          <div className="col-md-2 col-lg-2 col-xl-2">
                            <img
                              src={`/assets/${product.id}.png`}
                              className="img-fluid rounded-3" alt="Cotton T-shirt"/>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-3">
                            <p className="lead fw-normal mb-2">{product.nombre}</p>
                          </div>
                          <div className="col-md-3 col-lg-3 col-xl-2 d-flex">
                            <NumericInput value={product.quantity} onChange={(value) => refreshQty(product,value)} />
                          </div>
                          <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                            <h5 className="mb-0">{product.quantity * product.precio} €</h5>
                          </div>
                          <div className="col-md-1 col-lg-1 col-xl-1 text-end text-danger">
                          <BsFillTrashFill size={30} onClick={ () => deleteToCart(product)}/>
                          </div>
                        </div>
                      </div>
                  </div>
                    
                ))
            }

        



  <div class="card rounded-2 bs-example p-4">
      <center>
        <h4>Total: {totalPriceCart}€</h4>
        {totalPriceCart > 0 ? <a type="button" class="btn btn-primary" href="/checkout">Pagar</a> : ''}
        
      </center>
  </div>

      </div>
    </div>
  </div>
</section>
  </main>
   

}

export default Carrito