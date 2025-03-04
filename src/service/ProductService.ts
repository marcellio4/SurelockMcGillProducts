import { Product } from "../interface/Product";
import { Request } from "../interface/Request";

export class ProductService {
    private url: string;

    constructor() {
        this.url = process.env.REACT_APP_API_URL as string;
    }

    public getProducts(queryParameter?: string): Promise<Product[]> | never {
        const url = queryParameter ? `${this.url}?${queryParameter}` : this.url;
        const request: Request = {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_APIKEY}`
            }
        }

        return this.fetch(request, url);
    }
    public createProduct(body: Product): Promise<Product[]> | never {
        const request: Request = {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_APIKEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
        return this.fetch(request);
    }
    public updateProduct(body: Product): Promise<Product[]> | never {
        const request: Request = {
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_APIKEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(body)
        }
        return this.fetch(request);
    }
    public deleteProduct(ids: number[]): Promise<Product[]> | never {
        const request: Request = {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${process.env.REACT_APP_APIKEY}`,
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(ids)
        }
        return this.fetch(request);
    }

    private async fetch(request: Request, url?: string) {
        const response = await fetch(url ?? this.url, request);
        if (response.status >= 400) {
            console.error("Response:", response);
            return [];
        }
        return await response.json() as Product[];
    }
}
