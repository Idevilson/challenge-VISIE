import React, { useState } from "react";

import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

import { Header } from "../../components/header";

import styles from "./styles.module.scss";
import Carousel from "nuka-carousel";
import { WarningModal } from "../../components/modal";

interface productPropsComponent {
    id?: number | undefined;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string; 
    thumbnail?: string | undefined;
    images?: [] | undefined;
}

const ProductDetails: NextPage = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const router = useRouter();

    function handleCallScreenUpdateProduct(data: productPropsComponent) {
        const { 
            id,
            brand,
            category,
            description,
            discountPercentage,
            images,
            price,
            rating,
            stock,
            title,
         } = data;
        
         router.push({
            pathname: "/updateProduct",
            query: {
                brand,
                category,
                description,
                discountPercentage,
                id,
                images,
                price,
                rating,
                stock,
                title,
            }
        })
    }

    const { 
        query: {
            id,
            brand,
            category,
            description,
            discountPercentage,
            images,
            price,
            rating,
            stock,
            title,
        } 
    } = router;

    const data = {
        id,
        brand,
        category,
        description,
        discountPercentage,
        images,
        price,
        rating,
        stock,
        title,
    }


    let carouselImages: string[] = [];
    carouselImages = images as string[];

    return(
        <div className={styles.container}>
            <Head>
                <title>VISIE CHALLENGE - produto selecionado</title>
                <meta name="description" content="Challenge: E-commerce" />
                    <link rel="icon" href="/Users/ID/Desktop/valtonia/public/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header headerTitle={"PRODUTO SELECIONADO"}/>
                <div className={styles.bodyContainer}> 

                        <div className={styles.leftcontainer}>
                            <div className={styles.titleAndCategory}>
                                <div className={styles.productBoxInfo}>
                                    <h2>Title:</h2> <h2>{title}</h2>
                                </div>

                                <div className={styles.productBoxInfo}>
                                    <h2>Category:</h2> <h2>{category}</h2>
                                </div>
                            </div>

                            <div className={styles.priceAndBrand}>
                                <div className={styles.productBoxInfo}>
                                    <h2>Price:</h2> <h2>$ {price}</h2>
                                </div>

                                <div className={styles.productBoxInfo}>
                                    <h2>Brand:</h2> <h2>{brand}</h2>
                                </div>
                            </div>
                            
                            <div className={styles.ratingAndStock}>
                                <div className={styles.productBoxInfo}>
                                    <h2>Rating:</h2> <h2>{rating}</h2>
                                </div>

                                <div className={styles.productBoxInfo}>
                                    <h2>Stock:</h2> <h2>{stock}</h2>
                                </div>
                            </div>

                            <div className={styles.percentage}>
                                <h2>Discount Percentage:</h2> <h2>% {discountPercentage}</h2>
                            </div>

                            <div className={styles.description}>
                                <h2>Description:</h2> <h2>{description}</h2>
                            </div>

                            <div className={styles.buttonContainer}>
                                <button 
                                    onClick={() => handleCallScreenUpdateProduct(data)}
                                >
                                ALTERAR
                                </button>
                                <button 
                                    className={styles.button}
                                    onClick={() => setModalIsOpen(true)}
                                >
                                EXCLUIR
                                </button>
                            </div>
                    </div>
                    
                    <div className={styles.rightContainer}>
                        <Carousel 
                            autoplay={true}
                            animation={"fade"}
                            wrapAround={true}

                            defaultControlsConfig={{
                                pagingDotsStyle: {
                                    margin: 10,
                                },
                                nextButtonStyle: {
                                    display: "none"
                                },
                                prevButtonStyle: {
                                    display: "none"
                                }
                            }}
                            style={{
                                marginTop: -80,
                                height: 500,
                            
                            }}
                        >
                            {
                                carouselImages === undefined ? (
                                        <div className={styles.imageContainer} >
                                            <Image
                                                style={{
                                                    borderRadius: 20
                                                }}   
                                                src={"/assets/noImage.png"}
                                                width={250}
                                                height={250}
                                            
                                                alt="Image"
                                            />
                                        </div>
                                ) : carouselImages.map((imageUrl, index) => (
                                        <div 
                                            key={index}
                                            className={styles.imageContainer}
                                        >
                                            <Image
                                                style={{
                                                    borderRadius: 20
                                                }}   
                                                src={imageUrl}
                                                width={450}
                                                height={500}
                                            
                                                alt="Image"
                                            />
                                        </div> 
                                ))
                            }
                        </Carousel>
                    </div>
                </div>
                
                <WarningModal 
                    productId={Number(id)}
                    modalIsOpen={modalIsOpen}
                    setModalIsOpen={setModalIsOpen}
                />
            </main>
        </div>
    )
}

export default ProductDetails