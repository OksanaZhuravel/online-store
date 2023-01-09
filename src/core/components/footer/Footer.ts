import Component from '../../tempates/components';
const links = [
    {
        id: 1,
        href: 'https://rs.school/js/',
        text: '',
        class: 'school',
        imgsrc: './assets/img/school_logo.png',
    },
    {
        id: 2,
        href: 'https://github.com/OksanaZhuravel',
        text: 'Developer: Oksana',
        class: 'github',
        imgsrc: './assets/img/git_logo.png',
    },
    {
        id: 3,
        href: 'https://github.com/Svetlanahrhr',
        text: 'Developer: Svetlana',
        class: 'github',
        imgsrc: './assets/img/git_logo.png',
    },
];

class Footer extends Component {
    constructor(tagName: string, className: string) {
        super(tagName, className);
    }
    renderFooter() {
        const footerContainer = document.createElement('div');
        footerContainer.className = 'footer__container';
        const footerList = document.createElement('ul');
        footerList.className = 'footer__list';
        links.forEach((link) => {
            const footerItem = document.createElement('li');
            footerItem.className = 'footer__item';
            const footerLink = document.createElement('a');
            footerLink.href = `${link.href}`;
            footerLink.className = `footer__link ${link.class}`;
            footerLink.innerText = `${link.text}`;
            const footerImg = document.createElement('img');
            footerImg.src = `${link.imgsrc}`;
            footerImg.alt = 'Icon';
            footerLink.append(footerImg);
            footerItem.append(footerLink);
            footerList.append(footerItem);
        });
        const footerCopy = document.createElement('div');
        footerCopy.className = 'footer__copy';
        footerCopy.innerHTML = `<span class="footer__text">&copy;&nbsp; Rolling Scopes School,</span>
        <span class="footer__text">2022</span>`;
        footerContainer.append(footerList);
        footerContainer.append(footerCopy);

        document.querySelector('.footer')?.append(footerContainer);
    }
    render(): HTMLElement {
        this.renderFooter();
        return this.container;
    }
}
export default Footer;
