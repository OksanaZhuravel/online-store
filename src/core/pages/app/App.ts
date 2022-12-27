import MainPage from '../main/index';
import CartPage from '../cart/Cart';
import ErrorPage from '../error/Error';
import Page from '../../tempates/page';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';

export const enum PageIds {
    Mainpage = 'main-page',
    Cartpage = 'cart-page',
}

class App {
    static container: HTMLElement = document.getElementById('main')!;
    private static defaultPageId: string = 'current-page';
    private initialPage: MainPage;
    private header: Header;
    private footer: Footer;

    constructor() {
        this.initialPage = new MainPage('main-page');
        this.header = new Header('header', 'header');
        this.footer = new Footer('footer', 'footer');
    }

    static renderNewPage(idPage: string) {
        this.container.innerHTML = '';
        const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
        if (currentPageHTML) {
            currentPageHTML.remove();
        }
        let page: Page | null = null;

        if (idPage === PageIds.Mainpage) {
            page = new MainPage(idPage);
        } else if (idPage === PageIds.Cartpage) {
            page = new CartPage(idPage);
        } else {
            page = new ErrorPage(idPage);
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
        this.header.render();
        App.renderNewPage('main-page');
        this.routeChange();
        this.footer.render();
    }
}

export default App;
