import Model from './model';

class Controller {
    async productsRout(id?: string) {
        console.log(id);
        
        if (id) {
            const product = await new Model().getData(id);
            return product;
        } else {
            const products = await new Model().getData();
            return products;
        }
    }
}

export default Controller;
