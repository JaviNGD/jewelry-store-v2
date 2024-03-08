import React from 'react'
import { Link } from 'react-router-dom'
import Price from '../Price/Price'
import orderItemListClass from './orderItemList.module.css'
import Title from '../Title/Title'

export default function OrderItemList({ order }) {
    return (
        <div class={orderItemListClass.table}>
            <Title title="Order items" fontSize="1rem"/>

            {order.items.map((item) => (
            <div key={item.id} className={orderItemListClass.item}>
                <div class={orderItemListClass.row}>
                    <div class={orderItemListClass.cell}>
                        <Link to={`/product/${item.item.id}`} className={orderItemListClass.image}>
                            <img src={item.item.imageUrl} alt={item.name} />
                        </Link>
                    </div>
                    <div class={orderItemListClass.cell}>
                        <Link to={`/product/${item.item.id}`} className={orderItemListClass.name}>
                            {item.item.name}
                        </Link>
                    </div>
                    <div class={orderItemListClass.cell}>
                        <Price price={item.item.price} />
                    </div>
                    <div class={orderItemListClass.cell}>
                        {item.quantity}
                    </div>
                    <div class={orderItemListClass.cell}>
                        <Price price={item.item.price * item.quantity} />
                    </div>
                </div>
            </div>
            ))}

            <div class={orderItemListClass.rowTotal}>
                <div class={orderItemListClass.cell}>Total: </div>
                <div class={orderItemListClass.cell}><Price price={order.cartTotal} /></div>
            </div>
        </div>

    )
}
