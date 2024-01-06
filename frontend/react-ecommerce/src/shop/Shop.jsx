import React, { useState } from 'react'
import PageHeader from '../components/PageHeader'
import Data from "../products.json"
import ProductCards from './ProductCards'
import Pagination from './Pagination'
import Search from './Search'
import ShopCategories from './ShopCategories'

const showResults = "Showing 01-12 of 139 Results"
const Shop = () => {
  const [GridList, setGridList] = useState(true)
  const [product, setProduct] = useState(Data)

  const [currentPage, setCurrentPage] = useState(1)
  const productPerPage = 12

  const indexOfLastProduct = currentPage + productPerPage
  const indexOfFirstProduct = indexOfLastProduct - productPerPage

  const currentProduct = product.slice(indexOfFirstProduct, indexOfLastProduct)

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const [selectedCategory, setSelectedCategory] = useState("All")
  const menuItems = [...new Set(Data.map((Val) => Val.category))]

  const filterItem = (curcat) => {
    const newItem = Data.filter((newVal) => {
      return newVal.category === curcat
    })

    setSelectedCategory(curcat)
    setProduct(newItem)
  }

  return (
    <div>
        <PageHeader title="Our Shop page" curPage="Shop" />

        <div className='shop-page padding-tb'>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-8 col-12'>
                <article>
                  <div className='shop-title d-flex flex-wrap justify-content-between'>
                    <p>{showResults}</p>
                    <div className={`product-view-mode ${GridList ? "gridActive" : "listActive"}`}>
                      <a className='grid' onClick={() => setGridList(!GridList)}>
                        <i className='icofont-ghost'></i>
                      </a>
                      <a className='list' onClick={() => setGridList(!GridList)}>
                        <i className='icofont-listine-dots'></i>
                      </a>
                    </div>
                  </div>

                  <div>
                    <ProductCards GridList={GridList} product={currentProduct}/>
                  </div>
                  
                  <Pagination productPerPage={productPerPage} totalProduct={product.length} paginate={paginate} activePage={currentPage}/>
                </article>
              </div>
              <div className='col-lg-4 col-12'>
                <aside>
                    <Search product={product} GridList={GridList}/>
                    <ShopCategories filterItem={filterItem} setItem={setProduct} menuItems={menuItems} setProduct={setProduct} selectedCategory={selectedCategory}/>
                </aside>
              </div>
            </div>
          </div>

        </div>
    </div>
  )
}

export default Shop