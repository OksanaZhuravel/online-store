class Model {
    private static url: string = 'https://dummyjson.com/products';
    static errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }
    async fetchData(id?: string) {
        let url = Model.url;

        if (id) {
            url = `${url}/${id}`;
        }

        const response = await fetch(url);
        if (response.ok) {
            // если HTTP-статус в диапазоне 200-299
            // получаем тело ответа (см. про этот метод ниже)
            const json = await response.json();
            return json;
        } else {
            Model.errorHandler(response);
        }
    }

    async getData(id?: string | undefined) {
        if (id) {
            return await this.fetchData(id);
        } else {
            return await this.fetchData();
        }
    }
}

export default Model;
