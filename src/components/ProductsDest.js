import Context from '../components/Context'
import { useContext } from 'react'

export default function ProducsDest(productos){

   let productosDest = productos.products;
   const shuffledArray = productosDest.sort((a, b) => 0.5 - Math.random()).slice(0,5);   

    return (
        <>
            <center>
                <h1>⭐ Los mas vendidos ⭐</h1>
            </center>

            <div className="container">
                {/* carrousel of products */}
                <div id="carouselExampleCaptions" className="carousel slide" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
                    </div>
                    <div className="carousel-inner">
                        {
                            shuffledArray.map((producto, index) => (

                                <div class={index == 0 ? `carousel-item active` : `carousel-item`}>
                                    <img src={`assets/${producto.id}.png`} width="500" height="500" className="rounded mx-auto d-block" alt="..." />
                                    <div className="carousel-caption d-none d-md-block">
                                        <h5 className="text-black">{producto.nombre}</h5>
                                        
                                    </div>
                                </div>
                                
                            ))
                        }
                        
                        
                        
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>





        </>
    );
    

}