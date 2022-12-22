import MainPage from '../main/index';
import CartPage from '../cart/Cart';
import Page from '../../tempates/page';
import Header from '../../components/header/Header';

export const enum PageIds {
    Mainpage = 'main-page',
    Cartpage = 'cart-page',
}
export interface ISource {
    id: string;
    title: string;
    description: string;
}

class App {
    static container: HTMLElement = document.body;
    private static defaultPageId: string = 'current-page';
    private initialPage: MainPage;
    private header: Header;

    constructor() {
        this.initialPage = new MainPage('main-page');
        this.header = new Header('header', 'header');
    }

    static renderNewPage(idPage: string) {
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.Mainpage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.Cartpage) {
            page = new CartPage(idPage);
        }

        if (page) {
            const pageHTML = page.render();
            pageHTML.id = App.defaultPageId;
            App.container.append(pageHTML);
        }
    }

    private routeChange() {
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            App.renderNewPage(hash);
        });
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
        const sourceItemTemp = document.querySelector('#sourceItemTemp')! as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true)! as HTMLDivElement;

            (sourceClone.querySelector('.source__item-name') as HTMLTemplateElement).textContent = item.title;
            (sourceClone.querySelector('.source__item') as HTMLTemplateElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('.sources') as HTMLTemplateElement).append(fragment);
    }
    static fetchProducts(){
        fetch('https://dummyjson.com/products')
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => this.draw(data.products))
            .catch((err) => console.error(err));
    }

    run() {
        App.container.append(this.header.render());
        App.renderNewPage('main-page');
        this.routeChange();
        App.fetchProducts();
    }
}

export default App;
