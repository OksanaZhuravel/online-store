import Page from '../../tempates/page';
import { ISource } from '../../interfaces/Products';
import Controller from '../../controller';
class MainPage extends Page {
    static TextObject = {
        tagName: 'div',
        className: 'catalog',
        Catalog: `
        <div class="catalog__container">
            <div class="catalog__body">
                <div class="catalog__filter filter" id="filterInner">
                    <button class="filter__title">Filtrs products</button>
                    <div class="filter__items">
                        <div class="filter__price price-filter">
                            <button type="button" class="price-filter__title">Price</button>
                            <div data-range class="price-filter__body">
                                <div class="price-filter__inputs">
                                    <input
                                        data-range-from="0"
                                        autocomplete="off"
                                        type="text"
                                        value="500"
                                        name="form[]"
                                        class="price-filter__input"
                                    />
                                    <input
                                        data-range-to="5000"
                                        autocomplete="off"
                                        type="text"
                                        value="2000"
                                        name="form[]"
                                        class="price-filter__input"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="catalog__content">
                    <div class="catalog__products"></div>
                    <div class="catalog__footer">
                        <a href="" class="catalog__more button">Show more</a>
                        <div class="catalog__pagging pagging">
                            <button
                                disabled
                                type="button"
                                class="pagging__arrow pagging__arrow--left _icon-arrow-down"
                            ></button>
                            <ul class="pagging__list">
                                <li class="pagging__item">
                                    <a href="" class="pagging__link active">1</a>
                                </li>
                                <li class="pagging__item">
                                    <a href="" class="pagging__link">2</a>
                                </li>
                                <li class="pagging__item">
                                    <a href="" class="pagging__link">3</a>
                                </li>
                                <li class="pagging__item">
                                    <a href="" class="pagging__link">...</a>
                                </li>
                                <li class="pagging__item">
                                    <a href="" class="pagging__link">15</a>
                                </li>
                            </ul>
                            <button
                                type="button"
                                class="pagging__arrow pagging__arrow--right _icon-arrow-down"
                            ></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    };

    constructor(public id: string) {
        super(id);
    }
    static draw(data: ISource[]) {
        const filters = ['category', 'brand'];
        // console.log(data);
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
            img.alt = item.title;
            (cardClone.querySelector('.product__item-image-ibg') as HTMLTemplateElement).append(img);
            (cardClone.querySelector(
                '.product__sale'
            ) as HTMLTemplateElement).textContent = `-${item.discountPercentage} %`;
            (cardClone.querySelector('.product__link-title') as HTMLTemplateElement).textContent = item.title;
            (cardClone.querySelector('.product__link-title') as HTMLLinkElement).href = `#products/${item.id}`;
            (cardClone.querySelector('.category--value') as HTMLTemplateElement).textContent = item.category;
            (cardClone.querySelector('.brand--value') as HTMLTemplateElement).textContent = item.brand;
            (cardClone.querySelector('.rating__value') as HTMLTemplateElement).textContent = item.rating;
            (cardClone.querySelector('.product__price') as HTMLTemplateElement).textContent = `${item.price} €`;
            (cardClone.querySelector('.product') as HTMLTemplateElement).setAttribute('data-card-id', item.id);
            // (cardClone.querySelector('.main-btn_buy') as HTMLLinkElement).href = `#products/${item.id}`;
            fragment.append(cardClone);
        });
        categoryes = Array.from(new Set(categoryes));
        brands = Array.from(new Set(brands));
        document.querySelector('.catalog__products')?.prepend(fragment);

        // Filter Item clone

        filters.forEach((filter) => {
            // Categoryes
            if (filter === 'category') {
                // берем темплейт фильтер итема категорий и вставляем его
                const fragmentFilterItemCategory = document.createDocumentFragment();
                const filterItemCategoryTemp = document.querySelector('#filterItemCategory')! as HTMLTemplateElement;
                const filterItemCategoryClone = filterItemCategoryTemp.content.cloneNode(true)! as HTMLDivElement;
                (filterItemCategoryClone.querySelector(
                    '.item-catalog__title'
                ) as HTMLTemplateElement).textContent = filter;
                fragmentFilterItemCategory.append(filterItemCategoryClone);
                document.querySelector('#filterInner')?.append(fragmentFilterItemCategory);
                // берем темлейт тегов категорий и вставляем каждую категорию
                const fragmentTags = document.createDocumentFragment();
                const tagsTemp = document.querySelector('#categoryTemp')! as HTMLTemplateElement;
                categoryes.forEach((category) => {
                    const tagClone = tagsTemp.content.cloneNode(true)! as HTMLDivElement;
                    (tagClone.querySelector('.item-catalog__name') as HTMLTemplateElement).textContent = category;
                    (tagClone.querySelector(
                        '.item-catalog__name'
                    ) as HTMLLinkElement).href = `#${category.toLocaleLowerCase()}`;
                    fragmentTags.append(tagClone);
                });
                document.querySelector('#filterCategory')?.append(fragmentTags);
                // brands
            } else if (filter === 'brand') {
                // берем темплейт фильтер итема категорий и вставляем его
                const fragmentFilterItemBrand = document.createDocumentFragment();
                const filterItemCategoryTemp = document.querySelector('#filterItemBrand')! as HTMLTemplateElement;
                const filterItemCategoryClone = filterItemCategoryTemp.content.cloneNode(true)! as HTMLDivElement;
                (filterItemCategoryClone.querySelector(
                    '.item-catalog__title'
                ) as HTMLTemplateElement).textContent = filter;
                fragmentFilterItemBrand.append(filterItemCategoryClone);
                document.querySelector('#filterInner')?.append(fragmentFilterItemBrand);
                // берем темлейт тегов категорий и вставляем каждый бренд
                const fragmentTags = document.createDocumentFragment();
                const tagsTemp = document.querySelector('#categoryTemp')! as HTMLTemplateElement;
                brands.forEach((brand) => {
                    const tagClone = tagsTemp.content.cloneNode(true)! as HTMLDivElement;
                    (tagClone.querySelector('.item-catalog__name') as HTMLTemplateElement).textContent = brand;
                    (tagClone.querySelector(
                        '.item-catalog__name'
                    ) as HTMLLinkElement).href = `#${brand.toLocaleLowerCase()}`;
                    fragmentTags.append(tagClone);
                });
                document.querySelector('#filterBrand')?.append(fragmentTags);
            }
        });
    }

    async fetchProducts() {
        await new Controller().frendsRout().then((data) => {
            MainPage.draw(data.products);
            // console.log(data.products);
        });
    }
    render() {
        const text = this.createPage(
            MainPage.TextObject.tagName,
            MainPage.TextObject.className,
            MainPage.TextObject.Catalog
        );
        this.container.append(text);
        this.fetchProducts();
        return this.container;
    }
}

export default MainPage;
