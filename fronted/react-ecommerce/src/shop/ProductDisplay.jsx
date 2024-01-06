import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductDisplay = ({item}) => {
    const {name, id, price, seller, ratingsCount, quantity, img} = item
    const [prequantity, setQuantity] = useState(quantity)
    const [coupon, setCoupon] = useState("")
    const [size, setSize] = useState("Select Size")
    const [color, setColor] = useState("Select Color")
    const handleSizeChange = (e) => {
        setSize(e.target.value)
    }

    const handleColorChange = (e) => {
        setColor(e.target.value)
    }

    const handleDecrease = () => {
        if(prequantity > 1){
            setQuantity(prequantity - 1)
        }
    }

    const handleIncrease = () => {
        setQuantity(prequantity + 1)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const product = {
            id: id,
            img: img,
            name: name,
            price: price,
            quantity: quantity,
            size: size,
            color: color,
            coupon: coupon
        }
        const existingCart = JSON.parse(localStorage.getItem("cart")) || []

        const existingProductIndex = existingCart.findIndex((item) => item.id === id)

        if(existingProductIndex !== -1){
            existingCart[existingProductIndex].quantity += prequantity
        }else{
            existingCart.push(product)
        }

        localStorage.setItem("cart", JSON.stringify(existingCart))

        setQuantity(1)
        setSize("Select Size")
        setColor("Select Color")
        setCoupon("")
    }
  return (
    <div>
        <div>
            <h4>{name}</h4>
            <p className='rating'>
                <i className='icofont-star'></i>
                <i className='icofont-star'></i>
                <i className='icofont-star'></i>
                <i className='icofont-star'></i>
                <i className='icofont-star'></i>
                <span>{ratingsCount} review</span>
            </p>
            <h4>${price}</h4>
            <h6>{seller}</h6>
            <p>description</p>
        </div>

        <div>
            <form onSubmit={handleSubmit}>
                <div className='select-product size'>
                    <select value={size} onChange={handleSizeChange}> 
                        <option value="Select Size">Select Size</option>
                        <option value="S">S</option>
                        <option value="M">M</option>
                        <option value="L">L</option>
                        <option value="XL">XL</option>
                        <option value="XXL">XXL</option>
                    </select>
                    <i className='icofont-rounded-down'></i>
                </div>

                <div className='select-product color'>
                    <select value={color} onChange={handleColorChange}> 
                        <option value="Select Color">Select Color</option>
                        <option value="pink">Pink</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                        <option value="grey">Grey</option>
                        <option value="black">Black</option>
                    </select>
                    <i className='icofont-rounded-down'></i>
                </div>

                <div className='cart-plus-minus'>
                    <div className='dec qtybutton' onClick={handleDecrease}>-</div>
                    <input className='cart-plus-minus-box' type='text' name="qtybutton" id='qtybutton' value={prequantity} onChange={(e) => setQuantity(parseInt(e.target.value, 10))}></input>
                    <div className='inc qtybutton' onClick={handleIncrease}>+</div>
                </div>

                <div className='discount-code mb-2'>
                    <input type='text' value={coupon} placeholder='Enter Discount Code' onChange={(e) => setCoupon(e.target.value)}></input>
                </div>

                <button type='submit'className='lab-btn'>
                    <span>Add to Cart</span>
                </button>
                
                <Link to="/cart-page" className="lab-btn bg-primary">
                    <span>Check Out</span>
                </Link>
            </form>
        </div>
    </div>
  )
}

export default ProductDisplay 