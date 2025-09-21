import React, { useEffect, useState } from 'react'
import Layout from '../../Components/Layout/Layout'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { productUrl } from '../../API/endPoints';
import ProductCard from '../../Components/Product/ProductCard';
import Loder from '../../Components/Loader/Loader';

function ProductDetail() {
  const [detail, setDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { productId} = useParams();
  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productUrl}/products/${productId}`)
    .then((res)=>{
      setDetail(res.data)
      setIsLoading(false)
    })
    .catch((err)=>{
      console.log(err);
      setIsLoading(false);

    })
   
  }, [])
  
  return (
    <Layout>
      {isLoading ? (
        <Loder />
      ) : (
        <ProductCard
          product={detail}
          flex={true}
          renderDesc={true}
          renderAdd={true}
        />
      )}
    </Layout>
  );
}

export default ProductDetail;