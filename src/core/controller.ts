import Model from './model';

class Controller {
    async frendsRout(id?: string) {
        if (id) {
            const friend = await new Model().getData(id);
            return friend;
        } else {
            const friends = await new Model().getData();
            return friends;
        }
    }
}

export default Controller;
