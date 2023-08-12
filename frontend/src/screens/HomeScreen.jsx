import React from 'react'
import Loader from '../components/loader';
import { Row, Col, Container } from "react-bootstrap";
import { useGetProductsQuery } from '../slices/productsApiSlice'
import Product from '../components/Product';
import Message from '../components/Message';
import { useParams } from 'react-router-dom';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
const {pageNumber,keyword}=useParams()
const{data,isLoading,error}=useGetProductsQuery({keyword,pageNumber});
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
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product}/>
              </Col>
            ))}
          </Row> 
        <Paginate
        pages={data.pages}
        page={data.page}
       keyword={ keyword ? keyword : ' '}
        />
          </>
        )}
         
        </>
      );
    };
export default HomeScreen
