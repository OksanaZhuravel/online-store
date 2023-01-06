export interface AImage {
    [index: number]: string;
}

export interface ISource {
    favorite: boolean;
    id: string;
    title: string;
    description: string;
    brand: string;
    category: string;
    discountPercentage: string;
    images: AImage;
    thumbnail: string;
    price: string;
    rating: string;
    stock: string;
}
