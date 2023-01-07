import Component from '../../tempates/components';
import { PageIds } from '../../interfaces/PageId';

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
    cartInit() {
        const cartButtons: NodeListOf<Element> | null = document.querySelectorAll('.menu__button');
        // console.log(cartButs);
        if (cartButtons != null) {
            cartButtons.forEach((cartItem) => {
                if (cartItem.innerHTML == 'Cart') {
                    cartItem.closest('.menu__item')?.classList.add('cart');
                    cartItem.classList.add('_icon-cart');
                    cartItem.innerHTML = '';
                    const cartQuantity = document.createElement('span');
                    cartQuantity.innerText = '0';
                    cartItem.append(cartQuantity);
                    // console.log(cartQuantity);
                    const quantity = Number(cartQuantity.innerText);
                    // console.log(quantity);
                }
            });
        }
        const cartHeader: Element | null = document.querySelector('.cart');
        // console.log(cartHeader);
        const cartHeaderBody = document.createElement('div');
        cartHeaderBody.className = 'cart__body';
        const cartList = document.createElement('ul');
        cartList.className = 'cart__list cart-list';
        cartHeaderBody.append(cartList);
        cartHeader?.append(cartHeaderBody);
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
            menuLink.className = 'menu__button button';
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
        this.cartInit();
        return this.container;
    }
}

export default Header;
