abstract class Page {
    protected container: HTMLElement = document.body;
    constructor(public id: string) {
        this.container = document.createElement('div');
        this.container.id = id;
    }

    protected createHeaderTitle(text: string) {
        const title = document.createElement('h1');
        title.innerHTML = text;
        return title;
    }
    protected createPage(text: string) {
        const title = document.createElement('div');
        title.innerHTML = text;
        return title;
    }

    render() {
        return this.container;
    }
}

export default Page;
