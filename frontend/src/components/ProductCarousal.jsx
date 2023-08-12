import React from 'react'
import { Carousel,Image } from 'react-bootstrap'
import Loader from './loader'
import Message from './Message'
import { useGetTopProductsQuery } from '../slices/productsApiSlice'

import { Link } from 'react-router-dom'
const ProductCarousal = () => {

    const {data:products,isLoading,error}=useGetTopProductsQuery()



    return isLoading ?<Loader />:error ? <Message variant='danger'>{error}
    </Message>
  
            :(
                <Carousel pause='hover' className='bg-primary mb-4'>
                {products.map(product=>(
                    <Carousel.Item key={product._id}>
                       <Link to ={`/product/${product._id}`}>
                        
                        <Image height='fixed ' src={product.image} alt={product.name} fluid />

                            <Carousel.Caption className='carousel-caption'>

                                <h2>
                                    {product.name} (${product.price})
                                </h2>
                            </Carousel.Caption>


                        </Link> 

                    </Carousel.Item>
                ))}
                </Carousel>
                )  
}

export default ProductCarousal
