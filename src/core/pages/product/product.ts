import { ISource } from '../../interfaces/Products';
import Page from '../../tempates/page';

class ProductPage extends Page {
    
    constructor(public id: string, public idProduct?: string) {
        super(id);
        this.idProduct = idProduct;
    }
    static TextObject = {
        MainTitle: `ProductPage Page`,
    };
    static errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }
    static draw(data: ISource[]) {
        console.log(data);
        
    }
    static fetchProducts(id:string) {
        fetch(`https://dummyjson.com/products/${id}`)
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => {
                this.draw(data);
            })
            .catch((err) => console.error(err));
    }
    render() {
        const title = this.createHeaderTitle(ProductPage.TextObject.MainTitle);
        this.container.append(title);
        console.log(this.idProduct);
        
        if (this.idProduct) {
          ProductPage.fetchProducts(this.idProduct);  
        }
        
        return this.container;
    }
}

export default ProductPage;