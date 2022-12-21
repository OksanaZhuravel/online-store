import Component from '../../tempates/components';
import { PageIds } from '../../pages/app/App';
import './style.css';

const Buttons = [
    {
        id: PageIds.Mainpage,
        text: 'Main Page',
    },
    {
        id: PageIds.Cartpage,
        text: 'Cart Page',
    },
];

class Header extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }

    renderPageButtons() {
        const pageButtonsContainer = document.createElement('div');
        Buttons.forEach((button) => {
            const buttonHTMLElement = document.createElement('a');
            buttonHTMLElement.href = `#${button.id}`;
            buttonHTMLElement.innerText = `${button.text}`;
            pageButtonsContainer.append(buttonHTMLElement);
        });
        this.container.append(pageButtonsContainer);
    }

    render(): HTMLElement {
        this.renderPageButtons();
        return this.container;
    }
}

export default Header;
