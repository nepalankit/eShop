import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../slices/cartSlice';
import {useSelector,useDispatch} from 'react-redux'
import CheckoutSteps from '../components/CheckoutSteps';
const ShippingScreen = () => {
  const cart=useSelector((state)=>state.cart) 
  const {ShippingAddress}=cart
  const [address, setAddress] = useState(ShippingAddress?.address ||'');
  const [city, setCity] = useState(ShippingAddress?.city || '');
  const [postalCode, setPostalCode] = useState(ShippingAddress?.postalCode ||'');
  const [country, setCountry] = useState(ShippingAddress?.country || '');

  const navigate=useNavigate()
  const dispatch=useDispatch()
  
  

  const submitHandler = (e) => {
    
    dispatch(saveShippingAddress({address,city,postalCode,country}))
   
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address' className='my-2'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='city' className='my-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Your City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='postalCode' className='my-2'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Your Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='country' className='my-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter Your Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Form.Group>
        <Button type='submit' variant='dark' className='my-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
