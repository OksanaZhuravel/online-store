import Page from '../../tempates/page';

class ErrorPage extends Page {
    static TextObject = {
        ErrorTitle: '404 not found',
    };
    constructor(public id: string) {
        super(id);
    }
    render() {
        const title = this.createHeaderTitle(ErrorPage.TextObject.ErrorTitle);
        this.container.append(title);
        return this.container;
    }
}

export default ErrorPage;
