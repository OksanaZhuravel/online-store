import Page from '../../tempates/page';
export interface ISource {
    id: string;
    title: string;
    description: string;
}
class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Main Page',
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
        const sourceItemTemp = document.querySelector('#sourceItemTemp')! as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true)! as HTMLDivElement;

            (sourceClone.querySelector('.source__item-name') as HTMLTemplateElement).textContent = item.title;
            (sourceClone.querySelector('.source__item') as HTMLTemplateElement).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        (document.querySelector('#main') as HTMLTemplateElement).append(fragment);
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
        MainPage.fetchProducts();
        this.container.append(title);
        return this.container;
    }
}

export default MainPage;
