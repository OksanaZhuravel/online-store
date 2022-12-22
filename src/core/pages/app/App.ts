import MainPage from '../main/index';
import CartPage from '../cart/Cart';
import Page from '../../tempates/page';
import Header from '../../components/header/Header';

export const enum PageIds {
    Mainpage = 'main-page',
    Cartpage = 'cart-page',
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

    run() {
        App.container.append(this.header.render());
        App.renderNewPage('main-page');
        this.routeChange();
    }
}

export default App;
