import { dbUsers } from '../firebase-config.js';

import React, { useEffect, useState } from'react';
import { addDoc,collection,getDoc, getDocs } from 'firebase/firestore';
import { SHA256 } from "crypto-js";
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import '../assets/register.css' // Tell webpack that Button.js uses these styles

import Context from '../components/Context'

function Register() {
    
    const navigate = useNavigate()

    const { createNotification,login } = useContext(Context)

    
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [born, setBorn] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    let [password, setPassword] = useState('');
    let [passwordC, setPasswordC] = useState('');
    const [usersRegister, setUsersRegister] = useState([]);

    useEffect(() => {
      getUsersRegister()
    }, []);

    //función para listar usuarios
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

    const handleRegister = event => {

        const usersDB = collection(dbUsers , "users");
        
        event.preventDefault();

        if(password!== passwordC){
          createNotification('Error', 'Las contraseñas no coinciden', 'danger')
          return;
        }


        if (password.length == 0){
          createNotification('Error', 'Debe ingresar una contraseña', 'danger')

          return;
        }

        if (email.length == 0){
          createNotification('Error', 'El email no puede estar vacio', 'danger')
          return;
        }

        //compruebo que el dia seleccionado es hace más de 18 años
        var dateOfBirth = new Date(born);
        var differenceMs = Date.now() - dateOfBirth.getTime();
        var dateFromEpoch = new Date(differenceMs); 
        var yearFromEpoch = dateFromEpoch.getUTCFullYear();
        var age = Math.abs(yearFromEpoch - 1970);
        
        if(age < 18){
          createNotification('Error', 'Debes ser mayor de edad para poder registrarte', 'danger')
          return;
        }

        try {
          //antes de insertar tengo que comprobar que el mail no exista recorriendome los usurios que tengo guardados en usersRegister
          
          const user = usersRegister.find(user => user.data.username === username);
          if (user) {
            createNotification('Error', 'El nombre de usuario '+username+' ya existe', 'danger')
            return;
          }else{

            password = SHA256(password).toString();
            console.log(email, username, password);
            
            addDoc(usersDB, {email, username, password,nombre,apellidos}).then(() => {
              login(username,email)
            }).catch(console.error)
           
          }
          
        
         
        
        } catch (error)  {
        
            event.target.password.value = '' // TODO improve this, do not manipulate the dom directly, do it by means of React
        }
    }

    return <div class="wrapper">
    <div class="form-left">
        <h2 class="text-uppercase">Información</h2>
        <p>
        Bienvenidos a nuestra nueva tienda de zapatillas Nike, donde podrás encontrar la mejor selección de calzado deportivo de la marca líder en el mercado. Somos un equipo de apasionados por la moda y el deporte, y nos enorgullece presentar nuestra colección de zapatillas Nike de última generación.
En nuestra tienda, encontrarás modelos para todas las edades y necesidades, desde los clásicos hasta los más innovadores. Ofrecemos una amplia variedad de colores, diseños y estilos para que puedas elegir el que mejor se adapte a tu estilo personal.Te invitamos a visitarnos en nuestra nueva tienda y a descubrir lo que Nike tiene preparado para ti. ¡No te lo pierdas! </p>
            <a href="/login" class="btn bg-light btn-xs"  >Ya tienes cuenta ? </a>
        
    </div>
    <form class="form-right" onSubmit={handleRegister}>
        <h2 class="text-uppercase">Formulario de registro</h2>
        <div class="mb-3">
            
                <label>Nombre de usuario</label>
                <input onChange={(event) => setUsername(event.target.value)} type="text" name="username" id="username" class="input-field" required/>
           
            
        </div>
        <div class="mb-3">
            <label>Email</label>
            <input onChange={(event) => setEmail(event.target.value)} name="email" type="email" class="input-field" id="email" required />
        </div>
        <div class="mb-3">
            <label>Fecha de nacimiento</label>
            <input onChange={(event) => setBorn(event.target.value)} name="born" type="date" class="input-field" id="born" required />
        </div>
        <div class="row">
            <div class="col-sm-6 mb-3">
                <label>Nombre</label>
                <input type="text" onChange={(event) => setNombre(event.target.value)} name="nombre" id="nombre" class="input-field" />
            </div>
            <div class="col-sm-6 mb-3">
                <label>Apellido</label>
                <input onChange={(event) => setApellidos(event.target.value)} type="text" name="apellidos" id="apellidos" class="input-field" />
            </div>
        </div>
        <div class="row">
            <div class="col-sm-6 mb-3">
                <label>Contraseña</label>
                <input type="password" onChange={(event) => setPassword(event.target.value)} name="pwd" id="pwd" class="input-field" />
            </div>
            <div class="col-sm-6 mb-3">
                <label>Repite contraseña</label>
                <input onChange={(event) => setPasswordC(event.target.value)} type="password" name="cpwd" id="cpwd" class="input-field" />
            </div>
        </div>

        <div class="form-field">
            <input type="submit" value="Registro" class="register" name="Registro" />
        </div>
    </form>
</div>

}

export default Register;