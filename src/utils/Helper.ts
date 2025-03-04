import { Product } from "../interface/Product";
import { ProductService } from "../service/ProductService";

export const productService = new ProductService();

const validateProductFields = (product: { [k: string]: any; }, setPriceValidation: any, setQuantityValidation: any, setNameValidation: any) => {
    if (!product.name) {
        setNameValidation(true);
        return {
            success: false,
            msg: "Product name is missing.",
            product: null
        }
    }

    if (!parseFloat(product.price)) {
        setPriceValidation(true);
        return {
            success: false,
            msg: "Product price needs to be a number.",
            product: null
        }
    }

    if (!parseFloat(product.quantity)) {
        setQuantityValidation(true);
        return {
            success: false,
            msg: "Product quantity needs to be a number.",
            product: null
        }
    }

    return { success: true };
}

export const addProduct = (products: Product[], setProducts: any, setValidated: any, setPriceValidation: any, setQuantityValidation: any, setNameValidation: any) => async (previousState: any, formData: any) => {
    const product = (Object.fromEntries(formData.entries()))
    const isValidated = validateProductFields(product, setPriceValidation, setQuantityValidation, setNameValidation);
    if (!isValidated.success) {
        return isValidated;
    }

    const response = await productService.createProduct(product as Product);
    setValidated(false);
    if (response.length > 0) {
        let newProducts = [...products, response[0]]
        setProducts(newProducts)
        return {
            success: true,
            msg: "Your product was succesfuly Created.",
            product: response[0]
        }
    }

    return {
        success: false,
        msg: "Something went wrong we could not add new Product.",
        product: null
    }
}

export const searchProducts = async (name: string | null, setProducts: any) => {
    if (!name) {
        const response = await productService.getProducts();
        setProducts(response);
        return;
    }
    const response = await productService.getProducts(`name=${name}`);
    if (response.length > 0) {
        setProducts(response);
        return;
    }

    return;
}

export const deleteProducts = async (ids: number[], setProducts: any, setAlert: any, setDeleteProducts: any, setShow: any) => {
    if (ids.length === 0) {
        setAlert(true);
        setShow(true);
        return;
    }

    const response = await productService.deleteProduct(ids);
    if (response.length > 0) {
        const products = await productService.getProducts();
        setProducts(products);
        setDeleteProducts([]);
        return;
    }

    return;
}