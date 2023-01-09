import { ISource } from '../../interfaces/Products';
import Page from '../../tempates/page';
import Controller from '../../controller';

class ProductPage extends Page {
    constructor(public id: string, public idProduct?: string) {
        super(id);
        this.idProduct = idProduct;
    }
    static TextObject = {
        tagName: 'div',
        className: 'product product--page',
        Product: `
        <div class="product__container">
        
        </div>`,
    };

    static draw(data: ISource) {
        // const dataId: ISource = Object(data);
        const fragment = document.createDocumentFragment();
        const productTemp = document.querySelector('#product') as HTMLTemplateElement;
        const productClone = productTemp.content.cloneNode(true) as HTMLDivElement;
        for (let i = 0; i < 5; i++) {
            const img = document.createElement('img');
            const imagesSlide = document.createElement('div');
            imagesSlide.className = 'product__slide';

            img.src = data.images[i];
            img.alt = data.title;
            imagesSlide.append(img);
            productClone.querySelector('.product__wrapper')?.append(imagesSlide);
        }
        (productClone.querySelector('.product__title') as HTMLTemplateElement).textContent = data.title;
        (productClone.querySelector('.product__discount') as HTMLTemplateElement).textContent = data.discountPercentage;
        (productClone.querySelector('.product__brand') as HTMLTemplateElement).textContent = data.brand;
        (productClone.querySelector('.product__category') as HTMLTemplateElement).textContent = data.category;

        (productClone.querySelector('.product__rating') as HTMLTemplateElement).textContent = data.rating;
        (productClone.querySelector('.product__description') as HTMLTemplateElement).textContent = data.description;

        fragment.append(productClone);

        document.querySelector('.product__container')?.prepend(fragment);
    }

    async fetchProduct(id: string) {
        await new Controller().productsRout(id).then((data) => {
            console.log(data);
            
            ProductPage.draw(data);
        });
    }
    render() {
        const text = this.createPage(
            ProductPage.TextObject.tagName,
            ProductPage.TextObject.className,
            ProductPage.TextObject.Product
        );
        this.container.append(text);
        if (this.idProduct) {
            this.fetchProduct(this.idProduct);
        }

        return this.container;
    }
}

export default ProductPage;
