import react, {
    Dispatch, 
    SetStateAction 
} from "react";
import Router from "next/router";

import styles from './styles.module.scss';

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

interface ProductProps {
    id: number | undefined;
    title: string;
    callProductDetailsScreen?: () => void;
    callUpdateProductScreen?: () => void;
    callDeleteProduct?: () => void;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
    setProductId: Dispatch<SetStateAction<number>>;
    data: productPropsComponent;
}

export function Product({
    id,
    title,
    data,
    setProductId,
    setModalIsOpen
}: ProductProps){

    function handleCallScreenProductDetails(data: productPropsComponent) {
        const { 
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
        
        Router.push({
            pathname: "/productDetails",
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
        
        Router.push({
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
    
    function handleCallModalAndDeleteProduct(id: number){
        setProductId(id);
        setModalIsOpen(true);
    }
    return(
        <div className={styles.ProductContainer}>
            <div className={styles.RightSection}>
                <h2> {id} </h2>
                <h3 className={styles.ProductName}>
                    {title}
                </h3>
            </div>
 

            <div className={styles.LeftSection}>
                <button onClick={() => handleCallScreenProductDetails(data)}>
                    VER DADOS
                </button>

                <button onClick={() => handleCallScreenUpdateProduct(data)}>
                    ALTERAR
                </button>

                <button onClick={() => handleCallModalAndDeleteProduct(Number(id))}>
                    EXCLUIR
                </button>
            </div>   
        </div>
    )
}