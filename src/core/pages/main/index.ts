import Page from "../../tempates/page";

class MainPage extends Page {
    static TextObject = {
        MainTitle: 'Main Page'
    }
    constructor(public id: string){
        super(id)
    }
    render(){
        const title = this.createHeaderTitle(MainPage.TextObject.MainTitle)
        this.container.append(title);
        return this.container;
    }
}

export default MainPage;