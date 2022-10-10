import React, { 
    useState,
    FormEvent
} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { NextPage } from "next";
import Head from "next/head";

import { Header } from "../../components/header";
import styles from "./styles.module.scss";
import { useProducts } from "../../hooks/useProducts";


const AddProduct: NextPage = () => {
    const [brandInput, setBrandInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("")
    const [discountPercentageInput, setDiscountPercentageInput] = useState(0);
    const [priceInput, setPriceInput] = useState(0);
    const [ratingInput, setRatingInput] = useState(0);
    const [stockInput, setStockInput] = useState(0);
    const [titleInput, setTitleInput] = useState("");


    const { handleAddNewProductInApi } = useProducts();

    async function handleAddProduct(){
        const data = {
            brand: brandInput,
            category: categoryInput,
            description: descriptionInput,
            discountPercentage: discountPercentageInput,
            price: priceInput,
            rating: ratingInput,
            stock: stockInput,
            title: titleInput
        };

        console.log(data);

        let statusCode;
        const response = handleAddNewProductInApi(data);
        await response.then(res => statusCode = res);

        if(statusCode === 200){
            toast.success("Produto adicionado com sucesso!")
        }else{
            toast.error("falha ao adicionar o produto!")
        }
    }

    async function handleFormDataValidation(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if(brandInput === "") {
            return toast.error("Preencha o campo Brand");
        }else if(categoryInput === "") {
            return toast.error("Preencha o campo Category");
        }else if(descriptionInput === "") {
            return toast.error("Preencha o campo description");
        }else if(priceInput === 0) {
            return toast.error("Informe um valor no campo price");
        }else if(ratingInput === 0) {
            return toast.error("Informe um valor no campo Rating");
        }else if(stockInput === 0) {
            return toast.error("informe um valor no campo stock");
        }else if(titleInput === "") {
            return toast.error("Informe um valor no campo title");
        } else {
            handleAddProduct()
        }
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>VISIE CHALLENGE - adicionar produto</title>
                <meta name="description" content="Challenge: E-commerce" />
                    <link rel="icon" href="/Users/ID/Desktop/valtonia/public/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header headerTitle={"ADICIONAR PRODUTO"}/>
                <form  
                    onSubmit={(event) => handleFormDataValidation(event)}
                    className={styles.bodyContainer}
                > 
                    <div className={styles.titleAndCategoryContainer}>
                        <div className={styles.inputContainer}>
                            <h2>Title: </h2>
                            <input 
                                required
                                onChange={(event) => setTitleInput(event.target.value)}
                                className={styles.title}
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <h2>Category: </h2>
                            <input 
                                required
                                onChange={(event) => setCategoryInput(event.target.value)}
                                className={styles.category}
                            />
                        </div>
                    </div>
                    
                    <div className={styles.priceAndBrandContainer}>
                        <div className={styles.inputContainer}>
                            <h2>Price: </h2>
                            <input 
                                required
                                onChange={(event) => setPriceInput(Number((event.target.value)))}
                                type={"number"}
                                className={styles.price}
                            />
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <h2>Brand: </h2>
                            <input 
                                required
                                onChange={(event) => setBrandInput(event.target.value)}
                                className={styles.brand}
                            />
                        </div>
                    </div>

                    <div className={styles.ratingAndStockContainer}>
                        <div className={styles.inputContainer}>
                            <h2>Rating: </h2>
                            <input 
                                required
                                type={"number"}
                                step={".01"}
                                onChange={(event) => setRatingInput(Number(event.target.value))}
                                className={styles.rating}
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <h2>Stock: </h2>
                            <input 
                                required
                                type={"number"}
                                onChange={(event) => setStockInput(Number(event.target.value))}
                                className={styles.stock}
                            />
                        </div>
                    </div>

                    <div className={styles.descriptionAndDiscountPercentageContainer}>
                        <div className={styles.descriptionAndLabelContainer}>
                            <h2>Description: </h2>
                            <textarea 
                                required
                                onChange={(event) => setDescriptionInput(event.target.value)}     
                                className={styles.description}
                            />
                        </div>

                        <div className={styles.discountPercentageAndLabelContainer}>
                            <h2>Discount <br />
                            Percentage:</h2>
                            <input 
                                required
                                onChange={(event) => setDiscountPercentageInput(Number(event.target.value))}
                                type={"number"}
                                step={".01"}
                                className={styles.discountPercentage}
                            />
                        </div>
                    </div>
                    <button 
                        type={"submit"}
                        className={styles.updateButton}
                    >
                        alterar
                    </button>
                </form>
                <ToastContainer/>
            </main>
        </div>
    )
}

export default AddProduct;