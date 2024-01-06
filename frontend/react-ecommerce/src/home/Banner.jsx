import React, { useState } from 'react'
import productData from '../products.json'
import { Link } from 'react-router-dom';
import SelectedCategory from '../components/SelectedCategory';
const title = (
    <h2>Search your <span>style</span> in our product</h2> 
)
const desc = "We have the collection of style"

const bannerList = [
    {
    iconName: "icofont-users-alt-4",
    text: "1.5 Million Customers",
    },
    {
    iconName: "icofont-notification",
    text: "More then 2000 Marchent",
    },
    {
    iconName: "icofont-globe",
    text: "Buy Anything Online",
    },
    ];

const Banner = () => {
    const [searchInput, setSearchInput] = useState("")
    const [filteredProduct, setFilteredProduct] = useState(productData)

    const handelSearch = e =>{
        const searchTerm = e.target.value
        setSearchInput(searchTerm)

        const filtered = productData.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        setFilteredProduct(filtered)
    }
  return (
    <div className='banner-section style-4'>
        <div className='container'>
            <div className='banner-content'>
                {title}
                <form>
                    <SelectedCategory select={"all"}/>
                    <input type='text' name="search" id="search" placeholder='search your product' value={searchInput} onChange={handelSearch}></input>
                    <button type="submit">
                        <i className='icofont-search'></i>
                    </button>
                </form>
                <p>{desc}</p>
                <ul className='lab-ul'>
                    {
                        searchInput && filteredProduct.map((product, i) => <li key={i}>
                            <Link to={`/shop/${product.id}`}>{product.name}</Link>
                        </li>)
                    }
                </ul>
            </div>

        </div>
        
    </div>
  )
}

export default Banner