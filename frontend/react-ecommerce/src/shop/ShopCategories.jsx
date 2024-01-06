import React, { useState } from 'react'
import Data from "../products.json"

const ShopCategories = ({filterItem, setItem, menuItems, setProduct, selectedCategory}) => {

  return (
    <>
        <div className='widget-header'>
            <h5 className='ms-2'>All Categories</h5>
        </div>
        <div>
            <button className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`} 
            onClick={() => setProduct(Data)}>All</button>
            {
                menuItems.map((Val, id) => {
                    return(
                        <button className={`m-2 ${selectedCategory === Val ? "bg-warning" : ""}`} 
                        key={id}
                        onClick={() => filterItem(Val)}>
                            {Val}
                        </button>
                    )
                })
            }
        </div>
    </>
  )
}

export default ShopCategories