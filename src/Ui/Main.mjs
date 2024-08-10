/**
 * The main Vue component with the layout for all pages.
 */
// IMPORTS
import Navigator from './Layout/Navigator.mjs';
import wgTitle from './Widget/App/Title.mjs';
// VARS
const template = `
<q-layout view="hHh lpR fFf">

    <q-header elevated>
        <q-toolbar>
            <q-toolbar-title>
                <q-avatar>
                    <img src="https://www.svgrepo.com/show/306500/openai.svg" class="t-svg-white">
                </q-avatar>
                {{title}}
            </q-toolbar-title>
            <q-btn dense flat round icon="menu" @click="toggleNavigator"/>
        </q-toolbar>
    </q-header>

    <q-drawer v-model="ifNavigatorOpen" side="right" behavior="normal" elevated>
        <navigator/>
    </q-drawer>

    <q-page-container>
        <router-view/>
    </q-page-container>

</q-layout>  
`;

// MAIN
export default {
    template,
    components: {Navigator},
    data() {
        return {
            ifNavigatorOpen: false,
            title: 'OpenAI API',
        };
    },
    /**
     * @implements Ui_Widget_App_Title.IView
     */
    methods: {
        /**
         * @param {string} data
         */
        setTitle(data) {
            this.title = data;
        },
        toggleNavigator() {
            this.ifNavigatorOpen = !this.ifNavigatorOpen;
        }
    },
    created() {
        wgTitle.setView(this);
    },
};