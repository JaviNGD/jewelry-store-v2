import React from 'react'
import { useCart } from '../../hooks/useCart'
import { useAuth } from '../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createOrder } from '../../services/orderService'
import checkoutClass from './checkoutPage.module.css'
import Title from '../../components/Title/Title'
import Input from '../../components/Input/Input'
import Button from '../../components/Button/Button'
import OrderItemList from '../../components/OrderItemsList/OrderItemList'
import Map from '../../components/Map/Map'

export default function CheckoutPage() {
    const { cart } = useCart()
    const { user } = useAuth()
    const navigate = useNavigate()
    const [order, setOrder] = useState({ ...cart })
    
    // Form validation with react-hook-form 
    const { register, handleSubmit, formState: { errors } } = useForm()


    const submit = async (data) => {
        if (!order.adressLatLng) {
            toast.error('Please select an adress on the map')
            return;
        } else {
            await createOrder({...order, name: data.name, address: data.address})
            console.log(order)
            navigate('/payment')
        }
    }
        
    return (
        <div className={checkoutClass.checkout}>
            <form onSubmit={handleSubmit(submit)} className={checkoutClass.container}>
                <div className={checkoutClass.content}>
                    <Title title="Order form"/>
                    <div className={checkoutClass.inputs}>
                        <Input 
                            label="Name"
                            defaultValue={user.name}
                            placeholder="Name"
                            {...register('name', { required: true })}
                            error={errors.name}
                        />
                        <Input
                            label="Address"
                            defaultValue={user.address}
                            placeholder="Address"
                            {...register('address', { required: true })}
                            error={errors.address}
                        />
                    </div>
                <OrderItemList order={order}/>
                </div>
                <div className={checkoutClass.location}>
                    <Title title="Select your location"/>
                    <Map 
                        location={order.adressLatLng} 
                        onChange={latlng => setOrder({...order, adressLatLng: latlng})}
                    />
                </div>
                <div className={checkoutClass.buttons}>
                    <Button type="submit" text="Continue to payment"/>
                </div>
            </form>
        </div>
    )
}
