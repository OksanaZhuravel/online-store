import Page from '../../tempates/page';
export interface ISource {
    id: string;
    title: string;
    description: string;
}
class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Main Page',
        MainText: `
        <div class="listing__iner">
            <div class="listing__grid-aside">
                <div class="filter">
                    <div class="filter-item">
                        <div class="filter-panel">
                            <div class="panel__header">
                                <div class="panel__header__icon">^</div>
                                <span class="filter-panel__title">Цена руб. </span>
                            </div>
                            <div class="panel__content">
                                <div class="filter-panel__content">
                                    <div class="filter-range">
                                        <label class="filter-range__label">
                                            <input type="number" class="range-input">
                                            <span class="filter-range__label-text">от</span>
                                        </label>
                                        <label class="filter-range__label">
                                            <input type="number" class="range-input">
                                            <span class="filter-range__label-text">до</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="filter-item">
                        <div class="filter-panel">
                            <div class="panel__header">
                                <div class="panel__header__icon">^</div>
                                <span class="filter-panel__title">Цена руб. </span>
                            </div>
                            <div class="panel__content">
                                <div class="filter-panel__content">
                                    <div class="filter-range">
                                        <label class="filter-range__label">
                                            <input type="number" class="range-input">
                                            <span class="filter-range__label-text">от</span>
                                        </label>
                                        <label class="filter-range__label">
                                            <input type="number" class="range-input">
                                            <span class="filter-range__label-text">до</span>
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
        </div>`
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

        data.forEach((item) => {
            const cardClone = cardTemp.content.cloneNode(true)! as HTMLDivElement;

            (cardClone.querySelector('.card-title') as HTMLTemplateElement).textContent = item.title;
            (cardClone.querySelector('.card-text') as HTMLTemplateElement).textContent = item.description;
            (cardClone.querySelector('.card-wrap') as HTMLTemplateElement).setAttribute('data-card-id', item.id);

            fragment.append(cardClone);
        });
        console.log(fragment);
        
        (document.querySelector('#products-list'))!.append(fragment);
    }
    static fetchProducts(){
        fetch('https://dummyjson.com/products')
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => this.draw(data.products))
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
