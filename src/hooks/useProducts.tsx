import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import axios from "axios";

interface productProps {
    id?: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string; 
    thumbnail?: string;
    images?: [];
}

interface productContextData {
    products: productProps[];
    handleAddNewProductInApi: (data: productProps) => Promise<number>;
    handleUpdateProductInApi: (data: productProps) => Promise<number>;
    handleDeleteProductInApi: (id: number) => Promise<number>;
}

const productContext = createContext({} as productContextData);

interface productsProviderProps {
    children: ReactNode;
}


function ProductsProvider({ children }: productsProviderProps) {
    const [products, setProducts] = useState<productProps[]>([])

    async function getAllProducts(){
        await axios.get('https://dummyjson.com/products')
            .then(response => {
                setProducts(response.data.products);
            }).catch((error) => console.log(error));
    }

    async function handleAddNewProductInApi(data: productProps) {
        const response = await axios.post("https://dummyjson.com/products/add", {
            data: JSON.stringify(data)
        })

        console.log(response.data);

        return response.status;
    }

    async function handleUpdateProductInApi(data: productProps) {
        const response = await axios.put(`https://dummyjson.com/products/${data.id}`, {
            data: JSON.stringify(data)
        })

        return response.status;
    }

    async function handleDeleteProductInApi(id: number) {
        const response = await axios.delete(`https://dummyjson.com/products/${id}`);

        const newProducts = products.filter((product) => product.id !== id);

        setProducts(newProducts);

        return response.status;
    }

     useEffect(() => {
        getAllProducts();
     }, [])

     return (
        <productContext.Provider value={{
            products,
            handleAddNewProductInApi,
            handleUpdateProductInApi,
            handleDeleteProductInApi
        }}>
            { children }
        </productContext.Provider>
     )
}

function useProducts(): productContextData{
    return useContext(productContext);
}

export { ProductsProvider, useProducts };

