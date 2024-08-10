// IMPORTS
import DEFS from '../../Defaults.mjs';
import modApi from '../../Mod/Api.mjs';
import modConfig from '../../Mod/Config.mjs';
import modNotify from '../../Mod/Notify.mjs';
import QUALITY from '../../Enum/DallE/Quality.mjs';
import SIZE from '../../Enum/DallE/Size.mjs';
import STYLE from '../../Enum/DallE/Style.mjs';
import wgTitle from '../Widget/App/Title.mjs';
import uiPrompt from '../Lib/Dialog/Prompt.mjs';


// VARS
const REF_PROMPT = 'prompt';

const template = `
<div class="q-pa-xs row justify-center">
    <div style="max-width: 1024px;">
        <q-card>
            <q-card-section class="column q-gutter-xs">
                <div class="row q-gutter-xs">
                    <q-select v-model="fldQuality"
                              :options="optsQuality"
                              dense
                              emit-value
                              label="Quality"
                              map-options
                              outlined
                    />
                    <q-select v-model="fldSize"
                              :options="optsSize"
                              dense
                              emit-value
                              label="Size"
                              map-options
                              outlined
                    />
                    <q-select v-model="fldStyle"
                              :options="optsStyle"
                              dense
                              emit-value
                              label="Style"
                              map-options
                              outlined
                    />
                </div>        
                <div class="row q-gutter-xs">
                    <q-input v-model="fldPrompt"
                             autofocus
                             class="col"
                             dense
                             label="Type a Prompt to Create an Image"
                             outlined
                             readonly
                             @click="onPromptClick"
                    />
                    <q-btn class="col-auto" icon="play_arrow" v-on:click="onPlay" :disabled="!fldPrompt" />
                </div>
                <div class="row q-gutter-xs" v-if="fldPromptRevised">
                    <q-input v-model="fldPromptRevised"
                             class="col"
                             dense
                             label="The Revised Prompt"
                             outlined
                             readonly
                             @click="onPromptRevisedClick"
                    />
                </div>
            </q-card-section>
        </q-card>   
        <div>
        <img :src="fldImgSrc"
             v-if="fldImgSrc"
             style="max-width: 100%; max-height: 70%"
        />
        <aimg src="https://m.media-amazon.com/images/I/81De-iVUiRL._AC_UF894,1000_QL80_.jpg" style="max-width: 100%; max-height: 70%"/>
        </div>
        <q-inner-loading :showing="ifLoading">
            <q-spinner-gears size="50px" color="primary"/>
        </q-inner-loading>
        <ui-prompt ref="${REF_PROMPT}" @onOk="doPromptOk"/>
    </div>
</div>
`;

// MAIN
export default {
    template,
    components: {uiPrompt},
    data() {
        return {
            fldImgSrc: null,
            fldPrompt: null,
            fldPromptRevised: null,
            fldQuality: QUALITY.STANDARD,
            fldSize: SIZE.X1024_1024,
            fldStyle: STYLE.NATURAL,
            ifLoading: false,
        };
    },
    computed: {
        optsQuality() {
            return Object.values(QUALITY);
        },
        optsSize() {
            return Object.values(SIZE);
        },
        optsStyle() {
            return Object.values(STYLE);
        },
    },
    methods: {
        doPromptOk(prompt, edit) {
            if (edit) {
                if (prompt) this.fldPrompt = prompt;
                else this.fldPrompt = null;
                this.fldPromptRevised = prompt;
            }
        },
        async onPlay() {
            const prompt = this.fldPrompt;
            const quality = this.fldQuality;
            const size = this.fldSize;
            const style = this.fldStyle;

            // send request to OpenAI API
            this.ifLoading = true;
            const {url, revisedPrompt} = await modApi.dalleCreate({prompt, size, quality, style});
            this.ifLoading = false;
            this.fldImgSrc = url;
            this.fldPromptRevised = revisedPrompt;
        },
        onPromptClick() {
            /** @type {Ui_Lib_Dialog_Prompt.IUi} */
            const dlg = this.$refs[REF_PROMPT];
            dlg.show('Type/edit the prompt', this.fldPrompt, true);
        },
        onPromptRevisedClick() {
            /** @type {Ui_Lib_Dialog_Prompt.IUi} */
            const dlg = this.$refs[REF_PROMPT];
            dlg.show('The revised prompt', this.fldPromptRevised);
        },
    },
    mounted() {
        wgTitle.setTitle('Dall-E 3');
        if (!modConfig.getApiKey() || !modConfig.getModel()) {
            modNotify.negative('Please, configure the OpenAI API connection (Menu / Config).');
            setTimeout(() => {
                this.$router.push(DEFS.ROUTE_CONFIG);
            }, 2500);
        }
    }
};