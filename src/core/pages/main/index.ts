import Page from '../../tempates/page';

export interface ISource {
    id: string;
    title: string;
    description: string;
    price: string;
    category: string;
    brand: string;
    images: string[];
}

class MainPage extends Page {
    static TextObject = {
        MainTitle: '',
        MainText: `
        <div class="listing">
                <div class="listing__iner">
                    <div class="listing__grid-aside">
                        <div class="filter">
                            <div class="filter-item">
                                <div class="filter-panel">
                                    <div class="panel__header">
                                        <span class="filter-panel__title">Price</span>
                                    </div>
                                    <div class="panel__content">
                                        <div class="filter-panel__content">
                                            <div class="filter-range">
                                                <label class="filter-range__label">
                                                    <input type="number" class="range-input" />
                                                    <span class="filter-range__label-text">from</span>
                                                </label>
                                                <label class="filter-range__label">
                                                    <input type="number" class="range-input" />
                                                    <span class="filter-range__label-text">to</span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="filter-item">
                                <div class="filter-panel">
                                    <div class="panel__header">
                                        <span class="filter-panel__title">Category</span>
                                    </div>
                                    <div class="panel__content">
                                        <div class="filter-panel__content">
                                            <div class="filter-tags">
                                                <div class="filter-tags__iner" id="filterCategory">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="listing__grid-main table">
                        <div class="listing__generated-container" id="products-list"></div>
                    </div>
                </div>
            </div>
        `,
    };
    constructor(public id: string) {
        super(id);
    }
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

        const fragment = document.createDocumentFragment();
        const cardTemp = document.querySelector('#cardTemp')! as HTMLTemplateElement;
        let categoryes: string[] = [];
        data.forEach((item) => {
            categoryes.push(item.category);

            const cardClone = cardTemp.content.cloneNode(true)! as HTMLDivElement;

            const img = document.createElement('img');
            img.src = item.images[0];

            (cardClone.querySelector('.product-block__image') as HTMLTemplateElement).append(img);
            (cardClone.querySelector('.product-block__name') as HTMLTemplateElement).textContent = item.title;
            (cardClone.querySelector('.product-block__type') as HTMLTemplateElement).textContent = item.category;
            (cardClone.querySelector('.product-block__visible-price') as HTMLTemplateElement).textContent = item.price;
            // (cardClone.querySelector('.card-text') as HTMLTemplateElement).textContent = item.description;
            (cardClone.querySelector('.product-block') as HTMLTemplateElement).setAttribute('data-card-id', item.id);

            fragment.append(cardClone);
        });

        categoryes = Array.from(new Set(categoryes));

        document.querySelector('#products-list')!.append(fragment);

        console.log(data);

        const fragmentTags = document.createDocumentFragment();
        const tagsTemp = document.querySelector('#categoryTemp')! as HTMLTemplateElement;

        categoryes.forEach((category) => {
            const tagClone = tagsTemp.content.cloneNode(true)! as HTMLDivElement;
            (tagClone.querySelector('.tag__name') as HTMLTemplateElement).textContent = category;

            fragmentTags.append(tagClone);
        });

        document.querySelector('#filterCategory')!.append(fragmentTags);
    }
    static fetchProducts() {
        fetch('https://dummyjson.com/products')
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => {
                this.draw(data.products);
            })
            .catch((err) => console.error(err));
    }
    render() {
        const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
        const text = this.createPage(MainPage.TextObject.MainText);
        this.container.append(title);
        this.container.append(text);
        MainPage.fetchProducts();
        return this.container;
    }
}

export default MainPage;
