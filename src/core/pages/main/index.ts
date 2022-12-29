import Page from '../../tempates/page';
import { ISource } from '../../interfaces/Products';
import Controller from '../../controller';
class MainPage extends Page {
    static TextObject = {
        MainTitle: '',
        MainText: `
        <div class="listing">
                    <div class="listing__iner">
                        <div class="listing__grid-aside">
                            <div class="filter" id="filterInner">
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
    static draw(data: ISource[]) {
        const filters = ['category', 'brand'];
        console.log(data);

        const fragment = document.createDocumentFragment();
        const cardTemp = document.querySelector('#cardTemp')! as HTMLTemplateElement;
        let categoryes: string[] = [];
        let brands: string[] = [];
        data.forEach((item) => {
            categoryes.push(item.category);
            brands.push(item.brand);

            const cardClone = cardTemp.content.cloneNode(true)! as HTMLDivElement;

            const img = document.createElement('img');
            img.src = item.images[0];

            (cardClone.querySelector('.product-block__image') as HTMLTemplateElement).append(img);
            (cardClone.querySelector('.product-block__name') as HTMLTemplateElement).textContent = item.title;
            (cardClone.querySelector('.product-block__type') as HTMLTemplateElement).textContent = item.category;
            (cardClone.querySelector('.product-block__visible-price') as HTMLTemplateElement).textContent = item.price;
            (cardClone.querySelector('.product-block') as HTMLTemplateElement).setAttribute('data-card-id', item.id);
            (cardClone.querySelector('.main-btn_buy') as HTMLLinkElement).href = `#products/${item.id}`;

            fragment.append(cardClone);
        });

        categoryes = Array.from(new Set(categoryes));
        brands = Array.from(new Set(brands));

        document.querySelector('#products-list')!.append(fragment);

        // Filter Item clone

        filters.forEach((filter) => {
            // Categoryes
            if (filter === 'category') {
                // берем темплейт фильтер итема категорий и вставляем его
                const fragmentFilterItemCategory = document.createDocumentFragment();
                const filterItemCategoryTemp = document.querySelector('#filterItemCategory')! as HTMLTemplateElement;

                const filterItemCategoryClone = filterItemCategoryTemp.content.cloneNode(true)! as HTMLDivElement;

                (filterItemCategoryClone.querySelector(
                    '.filter-panel__title'
                ) as HTMLTemplateElement).textContent = filter;
                fragmentFilterItemCategory.append(filterItemCategoryClone);
                document.querySelector('#filterInner')!.append(fragmentFilterItemCategory);
                // берем темлейт тегов категорий и вставляем каждую категорию
                const fragmentTags = document.createDocumentFragment();
                const tagsTemp = document.querySelector('#categoryTemp')! as HTMLTemplateElement;

                categoryes.forEach((category) => {
                    const tagClone = tagsTemp.content.cloneNode(true)! as HTMLDivElement;
                    (tagClone.querySelector('.tag__name') as HTMLTemplateElement).textContent = category;
                    (tagClone.querySelector('.tag__name') as HTMLLinkElement).href = `#${category.toLocaleLowerCase()}`;
                    fragmentTags.append(tagClone);
                });

                document.querySelector('#filterCategory')!.append(fragmentTags);

                // brands
            } else if (filter === 'brand') {
                // берем темплейт фильтер итема категорий и вставляем его
                const fragmentFilterItemBrand = document.createDocumentFragment();
                const filterItemCategoryTemp = document.querySelector('#filterItemBrand')! as HTMLTemplateElement;

                const filterItemCategoryClone = filterItemCategoryTemp.content.cloneNode(true)! as HTMLDivElement;

                (filterItemCategoryClone.querySelector(
                    '.filter-panel__title'
                ) as HTMLTemplateElement).textContent = filter;
                fragmentFilterItemBrand.append(filterItemCategoryClone);
                document.querySelector('#filterInner')!.append(fragmentFilterItemBrand);

                // берем темлейт тегов категорий и вставляем каждый бренд
                const fragmentTags = document.createDocumentFragment();
                const tagsTemp = document.querySelector('#categoryTemp')! as HTMLTemplateElement;

                brands.forEach((brand) => {
                    const tagClone = tagsTemp.content.cloneNode(true)! as HTMLDivElement;
                    (tagClone.querySelector('.tag__name') as HTMLTemplateElement).textContent = brand;
                    (tagClone.querySelector('.tag__name') as HTMLLinkElement).href = `#${brand.toLocaleLowerCase()}`;
                    fragmentTags.append(tagClone);
                });

                document.querySelector('#filterBrand')!.append(fragmentTags);
            }
        });
    }
    async fetchProducts() {
        await new Controller().frendsRout().then((data) => {
            MainPage.draw(data.products);
        });
    }
    render() {
        const text = this.createPage(MainPage.TextObject.MainText);
        this.container.append(text);
        this.fetchProducts();
        return this.container;
    }
}

export default MainPage;
