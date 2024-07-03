/**
 * The application object singleton.
 */
// import external libs
import * as Vue from 'https://cdn.jsdelivr.net/npm/vue@3.4.31/dist/vue.esm-browser.prod.js';
import {
    createRouter,
    createWebHashHistory
} from 'https://cdn.jsdelivr.net/npm/vue-router@4.4.0/dist/vue-router.esm-browser.js';


// import dev sources
import Main from './Ui/Main.mjs';
import DEF from './Defaults.mjs';

// Initialize Vue application
const {createApp} = Vue;

// create Router
const routes = [
    {path: DEF.ROUTE_ABOUT, component: () => import('./Ui/Route/About.mjs')},
    {path: DEF.ROUTE_CONFIG, component: () => import('./Ui/Route/Config.mjs')},
    {path: DEF.ROUTE_HOME, component: () => import('./Ui/Route/Chat.mjs')},
];
const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

// Create Vue App
const app = createApp(Main);
app.use(router);

// Import Quasar as UMD
window.Vue = Vue;
await import ( 'https://cdn.jsdelivr.net/npm/quasar@2.16.4/dist/quasar.umd.prod.js');
const Quasar = window.Quasar;
app.use(Quasar, {
    config: {
        dark: false,
    }
});

export default app;