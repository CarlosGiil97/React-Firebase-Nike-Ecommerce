
import { Home } from './pages/Home';
import  Login  from './pages/Login';
import  Register  from './pages/Register';
import Carrito from './pages/Carrito';
import AllProducts from './pages/AllProducts';
import Detail from './pages/Detail';
import Checkout from './pages/Checkout';
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import { React,useState,useEffect } from 'react';
import Context from './components/Context'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';




export default function App() {

  console.log(process.env,'process env');

  const [loggedIn, setLoggedIn] = useState(!!sessionStorage.username) //para saber si está logeado o no
  const [productsCart,setProductsCart] = useState(sessionStorage.cart ?? []) //para saber si
  const [numberCart,setNumberCart] = useState(null) 
  const [totalPriceCart,setTotalPriceCart] = useState(null) 

  useEffect(() => {

    let qtyCart = 0;
    let totalPriceCart = 0;
    let actualCart = sessionStorage.cart != undefined ? JSON.parse(sessionStorage.cart) : [];
    
    //recorro actualcart para contar los productos
    for (let i = 0; i < actualCart.length; i++) {
      qtyCart += actualCart[i].quantity;
      totalPriceCart += actualCart[i].precio * actualCart[i].quantity;
    }
    setNumberCart(qtyCart)
    setTotalPriceCart(totalPriceCart)
    
   
    
  },[]);
  
  const login = (username,email) => {
    
    sessionStorage.username = username
    setLoggedIn(true)
    window.location.href = '/';
   
  }

  const logout = () => {

    delete sessionStorage.cart
    delete sessionStorage.username
    
    setLoggedIn(false)
    window.location.href = '/login';
   
  }

//función para añadir producto al carrito
  const addToCart = (product) => {
    
    
    
    //recorro los productos para ver si existe alguno con ese id
    let actualCart = sessionStorage.cart != undefined ? JSON.parse(sessionStorage.cart) : [];
    
    
    //recorro los productos para ver si existe alguno con ese id
    let flag = false;
    for (let i = 0; i < actualCart.length; i++) {
      if (actualCart[i].id === product.id) {
        //si existe alguno con ese id
        actualCart[i].quantity += 1;
        flag = true;
        break;
      }
    }

    if(!flag){
      //si no existe alguno con ese id
      actualCart.push({
        id: product.id,
        nombre : product.nombre,
        precio: product.precio,
        quantity: 1
      });
      
    }

    let qtyCart = 0;
    let totalPriceCart = 0;
    //recorro actualcart para contar los productos
    for (let i = 0; i < actualCart.length; i++) {
      qtyCart += actualCart[i].quantity;
      totalPriceCart += actualCart[i].precio * actualCart[i].quantity;
    }
    setNumberCart(qtyCart)
    setTotalPriceCart(totalPriceCart)
    

    //guardo el carrito
    sessionStorage.cart = JSON.stringify(actualCart);

    setProductsCart(qtyCart);

    createNotification('Éxito',  product.nombre+' añadido al carrito', 'success');

    
    
  }

  const deleteToCart = (product) => {

      let confirmDelete = window.confirm('¿Está seguro que desea eliminar el producto'+product.nombre+'?');

      if(confirmDelete){

          let productToDelete = product.id;

          let actualCart = sessionStorage.cart!= undefined? JSON.parse(sessionStorage.cart) : [];

          for (let i = 0; i < actualCart.length; i++) {
            if (actualCart[i].id === productToDelete) {
              //si existe alguno con ese id
              actualCart.splice(i, 1); 
            }
          }

          let qtyCart = 0;
          let totalPriceCart = 0;
          //recorro actualcart para contar los productos
          for (let i = 0; i < actualCart.length; i++) {
            qtyCart += actualCart[i].quantity;
            totalPriceCart += actualCart[i].precio * actualCart[i].quantity;
          }
          setNumberCart(qtyCart)
          setTotalPriceCart(totalPriceCart)
          

          //guardo el carrito
          sessionStorage.cart = JSON.stringify(actualCart);

          setProductsCart(qtyCart);
          createNotification('Éxito',  product.nombre+' eliminado del carrito', 'danger');
        
      }
  }

  const cleanCart = () => {
    delete sessionStorage.cart;
    setProductsCart(null)
    setNumberCart(null)
    setTotalPriceCart(null)

  }

  const refreshQty = (product,qty) => {
      
    let productModify = product.id;

    let actualCart = sessionStorage.cart!= undefined? JSON.parse(sessionStorage.cart) : [];

    
    for (let i = 0; i < actualCart.length; i++) {
      if (actualCart[i].id === productModify) {
        //si existe alguno con ese id
        if(qty > 0){
          actualCart[i].quantity = qty;
          
        }else{
          actualCart.splice(i, 1); 
        }
      }
    }

    let qtyCart = 0;
    let totalPriceCart = 0;
    //recorro actualcart para contar los productos
    for (let i = 0; i < actualCart.length; i++) {
      qtyCart += actualCart[i].quantity;
      totalPriceCart += actualCart[i].precio * actualCart[i].quantity;
    }

    setNumberCart(qtyCart)
    setTotalPriceCart(totalPriceCart)

    //guardo el carrito
    sessionStorage.cart = JSON.stringify(actualCart);

    setProductsCart(qtyCart);

  }

  const createNotification = (place, message, type) => {
    Store.addNotification({
      title: place,
      message: message,
      type: type,
      insert: "top",
      container: "top-right",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 2000,
        onScreen: true
      }
    });
  }


  return <Context.Provider value={{ loggedIn,login, logout ,addToCart ,cleanCart,setNumberCart,deleteToCart,numberCart,totalPriceCart,refreshQty,createNotification}}>
<ReactNotifications />
    {loggedIn ? 
      <>
      <Navbar />
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Home />} />
            <Route path="/productos" element={<AllProducts />} />
            <Route path="/detail/:id" element={<Detail />} />
            <Route path="/cart" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </BrowserRouter>
      </div>
      <Footer />
      </>

      
      :
      <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/productos" element={<AllProducts />} />
            <Route path="/detail/:id" element={<Detail />} />
          </Routes>
        </BrowserRouter>
      </div>
      </>
    }

  </Context.Provider>

}