import React, { 
    createRef,
    useEffect,
    useState
} from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";

import { Header } from "../../components/header";
import styles from "./styles.module.scss";
import { useProducts } from "../../hooks/useProducts";


const UpdateProduct: NextPage = () => {
    const [brandInput, setBrandInput] = useState("");
    const [categoryInput, setCategoryInput] = useState("");
    const [descriptionInput, setDescriptionInput] = useState("")
    const [discountPercentageInput, setDiscountPercentageInput] = useState(0);
    const [priceInput, setPriceInput] = useState(0);
    const [ratingInput, setRatingInput] = useState(0);
    const [stockInput, setStockInput] = useState(0);
    const [titleInput, setTitleInput] = useState("");

    const brandInputRef = createRef<HTMLInputElement>();
    const categoryInputReft = createRef<HTMLInputElement>();
    const descriptionInputRef = createRef<HTMLTextAreaElement>();
    const discountPercentageInputRef = createRef<HTMLInputElement>();
    const priceInputRef = createRef<HTMLInputElement>();
    const ratingInputRef = createRef<HTMLInputElement>();
    const stockInputRef = createRef<HTMLInputElement>();
    const titleInputRef = createRef<HTMLInputElement>();

    const router = useRouter();
    const { handleUpdateProductInApi } = useProducts();

    const { 
        query: {
            id,
            brand,
            category,
            description,
            discountPercentage,
            price,
            rating,
            stock,
            title,
        } 
    } = router;


    useEffect(() => {
        brandInputRef.current!.value = brand as string;   
        categoryInputReft.current!.value = category as string;
        descriptionInputRef.current!.value = description as string;
        discountPercentageInputRef.current!.value = discountPercentage as string;
        priceInputRef.current!.value = price as string;
        ratingInputRef.current!.value = rating as string;
        stockInputRef.current!.value = stock as string;
        titleInputRef.current!.value = title as string;

        setBrandInput(brandInputRef.current!.value);
        setCategoryInput(categoryInputReft.current!.value);
        setDescriptionInput(descriptionInputRef.current!.value);
        setDiscountPercentageInput(Number(discountPercentageInputRef.current!.value));
        setPriceInput(Number(priceInputRef.current!.value));
        setRatingInput(Number(ratingInputRef.current!.value));
        setStockInput(Number(ratingInputRef.current!.value));
        setTitleInput(titleInputRef.current!.value);
    }, [])

    async function prepareDateToUpdateProduct() {
        const data = {
            id: Number(id),
            brand: brandInput,
            category: categoryInput,
            description: descriptionInput,
            discountPercentage: discountPercentageInput,
            price: priceInput,
            rating: ratingInput,
            stock: stockInput,
            title: titleInput
        };

        let statusCode;
        const response = handleUpdateProductInApi(data);
        await response.then(res => statusCode = res);

        if(statusCode === 200){
            toast.success("Alteração realizada com sucesso!");
        }else{
            toast.error("Falha ao alterar os parâmetros do produto");
        }
    }

    return(
        <div className={styles.container}>
            <Head>
                <title>VISIE CHALLENGE - detalhes do produto</title>
                <meta name="description" content="Challenge: E-commerce" />
                    <link rel="icon" href="/Users/ID/Desktop/valtonia/public/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <Header headerTitle={"ALTERAR PRODUTO"}/>
                <div className={styles.bodyContainer}> 
                    <div className={styles.titleAndCategoryContainer}>
                        <div className={styles.inputContainer}>
                            <h2>Title: </h2>
                            <input 
                                onChange={(event) => setTitleInput(event.target.value)}
                                ref={titleInputRef}
                                className={styles.title}
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <h2>Category: </h2>
                            <input 
                                onChange={(event) => setCategoryInput(event.target.value)}
                                ref={categoryInputReft}
                                className={styles.category}
                            />
                        </div>
                    </div>
                    
                    <div className={styles.priceAndBrandContainer}>
                        <div className={styles.inputContainer}>
                            <h2>Price: </h2>
                            <input 
                                onChange={(event) => setPriceInput(Number((event.target.value)))}
                                type={"number"}
                                ref={priceInputRef}
                                className={styles.price}
                            />
                        </div>
                        
                        <div className={styles.inputContainer}>
                            <h2>Brand: </h2>
                            <input 
                                onChange={(event) => setBrandInput(event.target.value)}
                                ref={brandInputRef}
                                className={styles.brand}
                            />
                        </div>
                    </div>

                    <div className={styles.ratingAndStockContainer}>
                        <div className={styles.inputContainer}>
                            <h2>Rating: </h2>
                            <input 
                                type={"number"}
                                step={".01"}
                                onChange={(event) => setRatingInput(Number(event.target.value))}
                                ref={ratingInputRef}
                                className={styles.rating}
                            />
                        </div>

                        <div className={styles.inputContainer}>
                            <h2>Stock: </h2>
                            <input 
                                type={"number"}
                                onChange={(event) => setStockInput(Number(event.target.value))}
                                ref={stockInputRef}
                                className={styles.stock}
                            />
                        </div>
                    </div>

                    <div className={styles.descriptionAndDiscountPercentageContainer}>
                        <div className={styles.descriptionAndLabelContainer}>
                            <h2>Description: </h2>
                            <textarea 
                                onChange={(event) => setDescriptionInput(event.target.value)}     
                                ref={descriptionInputRef}
                                className={styles.description}
                            />
                        </div>

                        <div className={styles.discountPercentageAndLabelContainer}>
                            <h2>Discount <br />
                            Percentage:</h2>
                            <input 
                                onChange={(event) => setDiscountPercentageInput(Number(event.target.value))}
                                type={"number"}
                                step={".01"}
                                ref={discountPercentageInputRef}
                                className={styles.discountPercentage}
                            />
                        </div>
                    </div>

                    <div className={styles.buttonsContainer}>
                        <button 
                            className={styles.cancelButton}
                            onClick={() => router.push('/')}
                            >
                            cancelar
                        </button>
                        
                        <button 
                            className={styles.updateButton}
                            onClick={() => prepareDateToUpdateProduct()}
                            >
                            alterar
                        </button>
                    </div>
                </div>
                <ToastContainer/>
            </main>
        </div>
    )
}

export default UpdateProduct;