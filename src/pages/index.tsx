import React, { useState } from "react";
import type { NextPage } from 'next'
import Head from 'next/head'

import styles from '../styles/index.module.scss'

import { Header } from "../components/header";
import { Product } from '../components/product';

import { useProducts } from '../hooks/useProducts';
import { WarningModal } from "../components/modal";

const Home: NextPage = () => {
  const [productId, setProductId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const { products } = useProducts();

  return (
    <div className={styles.container}>
      <Head>
        <title>VISIE CHALLENGE - listagem de produtos</title>
          <meta name="description" content="Challenge: E-commerce" />
            <link rel="icon" href="/Users/ID/Desktop/valtonia/public/favicon.ico" />
      </Head>


      <main className={styles.main}>
          <Header headerTitle={"TELA DE LISTAGEM DE PRODUTOS"}/>
          <div className={styles.bodyContainer}> 
                {
                  products.map(
                      (product) => 
                          <Product
                              setProductId={setProductId}
                              setModalIsOpen={setModalIsOpen}  
                              key={product.id} 
                              id={product.id} 
                              title={product.title} 
                              data={product}
                          />
                  )
                }
          </div>

          <WarningModal 
            productId={productId}
            modalIsOpen={modalIsOpen}
            setModalIsOpen={setModalIsOpen}
          />
      </main>
    </div>
  )
}

export default Home
