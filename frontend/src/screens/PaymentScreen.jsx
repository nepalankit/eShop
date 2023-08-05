import React from 'react'
import {useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Form,Button,Col} from 'react-bootstrap'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/FormContainer'
import { savePayementMethod } from '../slices/cartSlice'
// import ShippingScreen from '../screens/ShippingScreen'
const PaymentScreen = () => {
    const [paymentMethod,setPaymentMethod] =useState('PayPal')
    const navigate=useNavigate()
    const dispatch=useDispatch()

    const cart=useSelector((state)=>state.cart) 
    const {ShippingAddress}=cart
  

    useEffect(() =>{
        if(!ShippingAddress)
        {
navigate('/shipping')
        }
        else{

        }
    },[ShippingAddress,navigate])

const submitHandler=(e) =>{
    e.preventDefault();
    dispatch(savePayementMethod(paymentMethod))
    navigate('/placeorder')
}
    return (
    <FormContainer>
        <CheckoutSteps step1 step2 step3 />
<h1> Payment Method</h1>
<Form onSubmit={submitHandler} >
    <Form.Group>
        <Form.Label as='legend'>Select Method</Form.Label>
        <Col>
        <Form.Check
        type='radio'
        className='my-2'
        label="Paypal or Credit Card"
        id='PayPal'
        name='Payment method'
    value='PayPal'
    checked
    onChange={(e)=>setPaymentMethod(e.target.value)}>

    </Form.Check>
        </Col>
    </Form.Group>
    <Button type='submit' variant='dark'>
        Continue
    </Button>
</Form>
      
    </FormContainer>
  )
}

export default PaymentScreen
