import React, { 
    Dispatch, 
    SetStateAction 
} from "react";
import Modal from 'react-modal';

import { useProducts } from "../../hooks/useProducts";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#__next');

import styles from "./styles.module.scss";

interface WarningModalProps {
    productId: number;
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function WarningModal({ modalIsOpen, setModalIsOpen, productId }: WarningModalProps){
    const { handleDeleteProductInApi } = useProducts();

    function closeModal() {
        setModalIsOpen(false);
    }

    async function deleteProduct(){
        const response = handleDeleteProductInApi(productId)

        let statusCode;
        await response.then(res => statusCode = res);

        if(statusCode === 200){
            toast.success("PRODUTO EXCLUIDO COM SUCESSO!")
            setModalIsOpen(false);
            
        } else {
            toast.error("NÃO FOI POSSÍVEL DELETAR O PRODUTO")
        }
    }

    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: 320,
            height: 150,
            borderRadius: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
    };

    return (
        <>
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => closeModal()}
            style={customStyles}
        >
                <div className={styles.container}>
                    <h1>VOCÊ TEM CERTEZA DA EXCLUSÃO?</h1>

                    <div className={styles.buttonContainer}>
                        <button 
                            onClick={() => closeModal()}
                        >
                        CANCELAR
                        </button>
                        <button 
                            className={styles.button}
                            onClick={() => deleteProduct()}
                        >
                        excluir
                        </button>
                    </div>
                </div>
        </Modal>
        <ToastContainer/>
        </>
    )
}