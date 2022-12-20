import { App } from './app/App';

const root = document.getElementById('root') as HTMLDivElement;

const app = new App();

root.innerHTML = app.render();


