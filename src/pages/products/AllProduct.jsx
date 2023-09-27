import React from 'react'
import Layout from '../../components/layout/Layout'
import ProductCard from '../../productCard/ProductCard'

const AllProduct = () => {
  return (
    <Layout>
    <ProductCard showAll={true} /> 
    </Layout>
  )
}

export default AllProduct