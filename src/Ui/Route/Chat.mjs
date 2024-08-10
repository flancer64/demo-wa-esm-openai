// IMPORTS
import DEFS from '../../Defaults.mjs';
import modApi from '../../Mod/Api.mjs';
import modConfig from '../../Mod/Config.mjs';
import modNotify from '../../Mod/Notify.mjs';
import Msg from '../../Dto/Msg.mjs';
import wgTitle from '../Widget/App/Title.mjs';

// VARS
const REF_MESSAGE = 'message';
const REF_SCROLL = 'scroll';

const template = `
<div>
    <q-scroll-area ref="${REF_SCROLL}"
                   @scroll="onScroll"
                   class="t-chat-scroll"
    >
        <div class="q-pa-xs q-gutter-xs">
            <template v-for="item in items">
                <q-chat-message :text="uiMsg(item)" :sent="item?.out"/>
            </template>
        </div>
    </q-scroll-area>
    <div class="row items-end q-gutter-xs t-chat-input">
        <q-input v-model="fldMessage"
                 autofocus
                 autogrow
                 dense
                 outlined
                 @keydown.enter="onSend"
                 ref="${REF_MESSAGE}"
                 style="flex-grow: 1;"
        />
        <q-btn icon="send" round color="primary" @click="onSend"/>
        <q-btn icon="clear" round color="primary" @click="onClear" v-if="!ifMobile"/>
        <q-btn icon="delete" round color="primary" @click="onDelete"/>
    </div>
    <q-inner-loading :showing="ifLoading">
        <q-spinner-gears size="50px" color="primary"/>
    </q-inner-loading>
</div>
`;

// MAIN
export default {
    template,
    data() {
        return {
            fldMessage: undefined,
            ifLoading: false,
            /** @type {Msg[]} */
            items: [],
        };
    },
    computed: {
        ifMobile() {
            const {Platform} = self.window.Quasar;
            return Boolean(Platform?.is?.mobile);
        }
    },
    methods: {
        doAutofocus() {
            const input = this.$refs[REF_MESSAGE];
            if (input) input.focus();
        },
        doScrollBottom() {
            const scroll = this.$refs[REF_SCROLL];
            if (scroll)
                setTimeout(() => {
                    scroll.setScrollPosition('vertical', 150000, 2000);
                    this.doAutofocus();
                }, 0);
        },
        onClear() {
            this.fldMessage = undefined;
            this.doScrollBottom();
        },
        onDelete() {
            const system = new Msg();
            system.body = modConfig.getPrompt();
            system.out = true;
            this.items.length = 0;
            this.items.push(system);
            this.doAutofocus();
        },
        async onSend() {
            // add outgoing message
            const user = new Msg();
            user.body = String(this.fldMessage); // remove reactivity
            user.out = true;
            this.items.push(user);
            this.doScrollBottom();
            // send request to OpenAI API
            this.ifLoading = true;
            const msg = await modApi.send(this.items.slice(1));
            this.ifLoading = false;
            // add incoming message
            this.fldMessage = undefined;
            this.items.push(msg);
            this.doScrollBottom();
        },
        uiMsg(item) {
            const msg = item.body;
            return [msg];
        },
    },
    mounted() {
        wgTitle.setTitle('Chat');
        if (!modConfig.getApiKey() || !modConfig.getModel()) {
            modNotify.negative('Please, configure the OpenAI API connection (Menu / Config).');
            setTimeout(() => {
                this.$router.push(DEFS.ROUTE_CONFIG);
            }, 2500);
        } else this.onDelete();
    }
};