import React from 'react'
import Loader from '../components/loader';
import { Row, Col, Container } from "react-bootstrap";
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Product from '../components/Product';
import Message from '../components/Message';
const HomeScreen = () => {

  const{data:products,
isLoading,
error}=useGetProductsQuery();
    return (
        <>
        {isLoading ?(
         <Loader />
        ): error ?(
          <div>
            <Message variant='danger'>{error?.data?.message || error.error}

            </Message>
          </div>
        ):(
          <>
          <h1> Latest Products</h1>
         
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
              </Col>
            ))}
          </Row> 
        
          </>
        )}
         
        </>
      );
    };
export default HomeScreen
