export interface Product{
    id?: number
    name: string
    price: number
    image_urls: Array<string>
    quantity: number
    created_at?: Date
    updated_at?: Date
    is_active?: boolean
}