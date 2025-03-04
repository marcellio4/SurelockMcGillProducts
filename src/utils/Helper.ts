import { Product } from "../interface/Product";
import { ProductService } from "../service/ProductService";

export const productService = new ProductService();

const validateMandatoryProductFields = (product: { [k: string]: any; }, setPriceValidation: any, setQuantityValidation: any, setNameValidation: any) => {
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
        console.log("product quantity", product.quantity);
        setQuantityValidation(true);
        return {
            success: false,
            msg: "Product quantity needs to be a number.",
            product: null
        }
    }

    return { success: true };
}

const isValidUrls = (urls: string[]) => {
    if (urls.length === 0) return;
    urls.forEach(url => new URL(url));
}

export const addProduct = (products: Product[], setProducts: any, setValidated: any, setPriceValidation: any, setQuantityValidation: any, setNameValidation: any) => async (previousState: any, formData: any) => {
    const product = (Object.fromEntries(formData.entries()))
    const isValidated = validateMandatoryProductFields(product, setPriceValidation, setQuantityValidation, setNameValidation);
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

export const updateProduct = (productId: number, setPriceValidation: any, setQuantityValidation: any, setNameValidation: any, setValidated: any) => async (previousState: any, formData: any) => {
    const product = (Object.fromEntries(formData.entries()))
    const isValidated = validateMandatoryProductFields(product, setPriceValidation, setQuantityValidation, setNameValidation);

    if (!isValidated.success) {
        return isValidated;
    }
    product.image_urls = product.image_urls.split(',').map((url: string) => url.trim()).filter((url: string) => url !== '');
    try {
        isValidUrls(product.image_urls);
    } catch (error) {
        return {
            success: false,
            msg: "You have entered invalid image url.",
            product: null
        }
    }
    product.is_active = !product.is_active ? false : true;
    product.id = productId;
    const response = await productService.updateProduct(product as Product);
    setValidated(false);
    if (response.length > 0) {
        return {
            success: true,
            msg: "Your product was succesfuly Updated.",
            product: response[0]
        }
    }

    return {
        success: false,
        msg: "Something went wrong we could not add new Product.",
        product: null
    }
}