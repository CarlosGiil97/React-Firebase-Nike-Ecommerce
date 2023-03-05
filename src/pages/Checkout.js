import { useEffect,useState } from "react"
import { db } from '../firebase-config.js';
import { ref,onValue,push,update,remove} from 'firebase/database';

import Loader from '../components/Loader';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import { useContext } from 'react'

import Context from '../components/Context'


function Checkout() {
    
    const [products, setProducts] = useState([])
    
    const { createNotification ,cleanCart,numberCart,totalPriceCart} = useContext(Context)
    
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

   const finalPay = () => {

    createNotification('Pedido realizado','En breve recibirás un email con el detalle de la compra','success')
    

    setTimeout(function() {

        cleanCart();
        window.location.href = '/'
    }, 2000);

   
   }

   
    return  <div>
        {products == [] ? 
        <>
            <Loader />
        </> 
        : 
        <> 
            <div class="row p-4">
               
                <div class="col-md-12 col-lg-12 ">
                    <h4 class="mb-3">Información de pago</h4>
                    <h6>✅ Hay <b>{numberCart}</b> productos en el carrito , con un precio de <b>{totalPriceCart}€</b></h6>
                    <div class="row g-3">
                        <div class="col-sm-6">
                        <label for="firstName" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="firstName" placeholder="" value="" required="" />
                        <div class="invalid-feedback">
                            El nombre es obligatorio
                        </div>
                        </div>

                        <div class="col-sm-6">
                        <label for="lastName" class="form-label">Apellido</label>
                        <input type="text" class="form-control" id="lastName" placeholder="" value="" required="" />
                        <div class="invalid-feedback">
                            El apellido es obligatorio.
                        </div>
                        </div>

                        

                        <div class="col-12">
                        <label for="email" class="form-label">Email <span class="text-muted"></span></label>
                        <input type="email" class="form-control" id="email" placeholder="you@example.com" />
                        <div class="invalid-feedback">
                            Introduce el correo para recibir actualizaciones del pedido
                        </div>
                        </div>

                        <div class="col-12">
                        <label for="address" class="form-label">Dirección</label>
                        <input type="text" class="form-control" id="address" placeholder="1234 Main St" required="" />
                        <div class="invalid-feedback">
                            Dirección de envio.
                        </div>
                        </div>

                       

                        <div class="col-md-5">
                        <label for="country" class="form-label">País</label>
                        <select class="form-select" id="country" required="">
                            <option value="">Seleccione ...</option>
                            <option>España</option>
                        </select>
                        <div class="invalid-feedback">
                           Introduce un país válido
                        </div>
                        </div>

                        <div class="col-md-4">
                        <label for="state" class="form-label">Ciudad</label>
                        <select class="form-select" id="state" required="">
                            <option value="">Seleccione ...</option>
                            <option>Málaga</option>
                            <option>Madrid</option>
                            <option>Granada</option>
                        </select>
                        <div class="invalid-feedback">
                            Seleccione una ciudad válida
                        </div>
                        </div>

                        <div class="col-md-3">
                        <label for="zip" class="form-label">CP</label>
                        <input type="text" class="form-control" id="zip" placeholder="" required="" />
                        <div class="invalid-feedback">
                            Código postal es obligatorio.
                        </div>
                        </div>
                    </div>

                    <hr class="my-4" />

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="same-address" />
                        <label class="form-check-label" for="same-address">Dirección de envio es la misma que la de facturación</label>
                    </div>

                    <div class="form-check">
                        <input type="checkbox" class="form-check-input" id="save-info"/>
                        <label class="form-check-label" for="save-info">Guardar para la siguiente compra</label>
                    </div>

                    <hr class="my-4" />

                    <h4 class="mb-3">Pago</h4>

                    <div class="my-3">
                        <div class="form-check">
                        <input id="credit" name="paymentMethod" type="radio" class="form-check-input" checked="" required="" />
                        <label class="form-check-label" for="credit">Tarjeta de crédito</label>
                        </div>
                        <div class="form-check">
                        <input id="debit" name="paymentMethod" type="radio" class="form-check-input" required="" />
                        <label class="form-check-label" for="debit">Tarjeta de débito</label>
                        </div>
                        <div class="form-check">
                        <input id="paypal" name="paymentMethod" type="radio" class="form-check-input" required="" />
                        <label class="form-check-label" for="paypal">PayPal</label>
                        </div>
                    </div>

                    <div class="row gy-3">
                        <div class="col-md-6">
                        <label for="cc-name" class="form-label">Nombre en la tarjeta</label>
                        <input type="text" class="form-control" id="cc-name" placeholder="" required="" />
                        <small class="text-muted">Nombre que aparece en la tarjeta </small>
                        <div class="invalid-feedback">
                            Nombre es obligatorio
                        </div>
                        </div>

                        <div class="col-md-6">
                        <label for="cc-number" class="form-label">Numero tarjeta</label>
                        <input type="text" class="form-control" id="cc-number" placeholder="" required="" />
                        <div class="invalid-feedback">
                            El número de la tarjeta es obligatorio
                        </div>
                        </div>

                        <div class="col-md-3">
                        <label for="cc-expiration" class="form-label">Fecha expiración</label>
                        <input type="text" class="form-control" id="cc-expiration" placeholder="" required="" />
                        <div class="invalid-feedback">
                            Fecha de expiración es obligatorio
                        </div>
                        </div>

                        <div class="col-md-3">
                        <label for="cc-cvv" class="form-label">CVV</label>
                        <input type="text" class="form-control" id="cc-cvv" placeholder="" required="" />
                        <div class="invalid-feedback">
                            CVV es obligatorio
                        </div>
                        </div>
                    </div>

                    <hr class="my-4" />

                    <a class="w-100 btn btn-success btn-lg" onClick={finalPay}>Pagar y finalizar</a>
                    
                </div>
                
                
            </div>
        </>
        }
      </div>
    
    
   

}

export default Checkout;