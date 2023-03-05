
import { collection, getDocs } from 'firebase/firestore';
import { dbUsers } from '../firebase-config.js';
import { useContext } from 'react'
import Context from '../components/Context'
import { useState,useEffect } from 'react'
import { SHA256 } from "crypto-js";
import '../assets/register.css'

function Login() {
    
    
    const { login,createNotification } = useContext(Context)
    const [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    const [usersRegister, setUsersRegister] = useState([]);


    useEffect(() => {
      getUsersRegister()
    }, []);

    const getUsersRegister =  () => {
      
      const usersDB = collection(dbUsers , "users");

      getDocs(usersDB)
      .then((response) => {
        const users = response.docs.map((doc) => ({
          id: doc.id,
          data: doc.data()
        }))
        setUsersRegister(users);
        })
      
    }

    
    const handleLogin = event => {
       

        event.preventDefault()

        if (username === '' || password === '') {
            createNotification('Error','Ingrese todos los datos', 'danger')
            return
        }
        
        try {

          const user = usersRegister.find(user => user.data.username === username && user.data.password == SHA256(password).toString());
          if (user) {
            login(user.data.username,user.data.email)
          } else {
            createNotification('Error','Usuario o contraseña incorrectos', 'danger')
          }
        } catch (error)  {
        
            event.target.password.value = '' // TODO improve this, do not manipulate the dom directly, do it by means of React
        }
    }

    return  <div class="wrapper">
      <form class="form-right" onSubmit={handleLogin}>
        <h2 class="text-uppercase">Iniciar sesión</h2>
        <div class="mb-3">
            <label>Nombre de usuario</label>
            <input onChange={(event) => setUsername(event.target.value)} type="text" name="username" id="username" class="input-field" required/>
        </div>

        <div class="mb-3">
            <label>Contraseña</label>
            <input onChange={(event) => setPassword(event.target.value)} type="password" name="password" id="password" class="input-field" required/>
        </div>
        
        <div class="form-field">
            <input type="submit" value="Login" class="register" name="Login" />
            
        </div>
        ¿No tienes cuenta? <a href="/register">Regístrate</a>
    </form>
    </div>
   

}

export default Login