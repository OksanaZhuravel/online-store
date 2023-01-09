import Page from '../../tempates/page';

class CartPage extends Page {
    cartList = document.querySelector('.cart-list') as Element;
    static TextObject = {
        CartTitle: ``,
    };
    constructor(public id: string) {
        super(id);
    }
    cartInitList() {
        const cartList = document.querySelector('.cart-list');
        console.log(cartList);
        // console.log(localStorage.getItem('cart'));
    }
    render() {
        // const title = this.createHeaderTitle(CartPage.TextObject.CartTitle);
        const element = this.cartList;
        this.container.append(element);
        // this.container.append(title);
        this.cartInitList();
        return this.container;
    }
}

export default CartPage;
