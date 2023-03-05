import React from "react";
import ProducsDest from "../components/ProductsDest";
import Searcher from "../components/Searcher";

import {useState, useEffect} from'react';
import { db } from '../firebase-config.js';
import { ref,onValue,push,update,remove} from 'firebase/database'

export function Home() {

  const [products,setProducts] = useState([]);


  useEffect(() => {
        
    return onValue(ref(db, '/productos'), querySnapShot => {
      let data = querySnapShot.val() || {};
      let todoItems = {...data};
      setProducts(Object.values(todoItems)
      );
      
    });

    
    
  },[]);

  return (
    <>
    {products.length > 0 ? 
      <center>
        <Searcher />
        <hr class="bg-info border-2 border-top border-info" />
        <ProducsDest products={products}/>
      </center>
    :
      ''}
      
      
      
    </>
      
    
  );
}