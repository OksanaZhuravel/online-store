import Component from '../../tempates/components';
import { PageIds } from '../../pages/app/App';

const Buttons = [
    {
        id: PageIds.Mainpage,
        text: 'Main',
    },
    {
        id: PageIds.Cartpage,
        text: 'Cart',
    },
];

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    menuInit() {
        const btn: Element | null = document.querySelector('.icon-menu');
        if (btn != null) {
            btn.addEventListener('click', () => {
                if (btn.closest('.icon-menu') != null) {
                    document.documentElement.classList.toggle('menu-open');
                }
            });
        }
    }

    renderHeader() {
        const headerContainer = document.createElement('div');
        headerContainer.className = 'header__container';
        const headerBoby = document.createElement('div');
        headerBoby.className = 'header__boby';
        headerContainer.append(headerBoby);
        const headerLogo = document.createElement('a');
        headerLogo.setAttribute('href', '');
        headerLogo.className = 'header__logo';
        headerLogo.innerHTML = `<img src="./assets/img/logo.svg" alt="logo">`;
        headerBoby.append(headerLogo);
        const headerMenu = document.createElement('div');
        headerMenu.className = 'header__menu menu';
        const menuBody = document.createElement('nav');
        menuBody.className = 'menu__body';
        const menuList = document.createElement('ul');
        menuList.className = 'menu__list';
        Buttons.forEach((button) => {
            const menuItem = document.createElement('li');
            menuItem.className = 'menu__item';
            const menuLink = document.createElement('a');
            menuLink.className = 'button';
            menuLink.href = `#${button.id}`;
            menuLink.innerText = `${button.text}`;
            menuItem.append(menuLink);
            menuList.append(menuItem);
        });
        const menuButton = document.createElement('button');
        menuButton.type = 'button';
        menuButton.className = 'icon-menu';
        menuButton.innerHTML = `<span></span>`;
        menuBody.append(menuList);
        headerMenu.append(menuBody);
        headerBoby.append(headerMenu);
        headerBoby.append(menuButton);
        document.querySelector('.header')?.append(headerContainer);
    }

    render(): HTMLElement {
        this.renderHeader();
        this.menuInit();
        return this.container;
    }
}

export default Header;
