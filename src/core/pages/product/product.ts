import { ISource } from '../../interfaces/Products';
import Page from '../../tempates/page';
import Controller from '../../controller';

class ProductPage extends Page {
    constructor(public id: string, public idProduct?: string) {
        super(id);
        this.idProduct = idProduct;
    }
    static TextObject = {
        MainTitle: `Нарисовать страницу карточки `,
    };

    static draw(data: ISource[]) {
        console.log(data);
    }
    async fetchProduct(id: string) {
        await new Controller().frendsRout(id).then((data) => {
            ProductPage.draw(data);
        });
    }
    render() {
        const title = this.createHeaderTitle(ProductPage.TextObject.MainTitle);
        this.container.append(title);

        if (this.idProduct) {
            this.fetchProduct(this.idProduct);
        }

        return this.container;
    }
}

export default ProductPage;
