/**
 * The Vue component for '/config' route.
 */
// IMPORTS
import MODEL from '../../Enum/Model.mjs';
import modConfig from '../../Mod/Config.mjs';
import modNotify from '../../Mod/Notify.mjs';

// VARS
const REF_KEY = 'key';

const template = `
<div class="t-layout-center">
    <q-card class="q-pa-md" flat bordered class="t-card">
    
        <q-card-section>
            <div class="text-h6">OpenAI API Configuration</div>
        </q-card-section>
        
        <q-card-section class="q-gutter-md">
            <q-input v-model="fldKey"
                     autofocus
                     dense
                     hint="The key to access the API: sk-...eR7T"
                     label="OpenAI API Key"
                     outlined
                     ref="${REF_KEY}"
            >
                <template v-slot:after>
                    <q-btn icon="add" @click="onOpenUrl" color="primary"/>
                </template>
            </q-input>
            <q-select v-model="fldModel"
                      :options="optsMapModel"
                      dense
                      emit-value
                      hint="The model to use in chat: gpt-4o"
                      label="GPT Model"
                      map-options
                      outlined
            />
            <q-input v-model="fldPrompt"
                     autofocus
                     autogrow
                     dense
                     hint="The first message in the dialog to setup the model."
                     label="System Prompt"
                     outlined
            />
        </q-card-section>

        <q-card-actions align="center" class="q-gutter-md">
            <q-btn label="OK" v-on:click="onOk"/>
            <q-btn label="Clear" v-on:click="onClear"/>
        </q-card-actions>
        
    </q-card>
</div>
`;


// MAIN
export default {
    template,
    data() {
        return {
            fldKey: undefined,
            fldModel: undefined,
            fldPrompt: undefined,
        };
    },
    computed: {
        optsMapModel() {
            return Object.values(MODEL);
        },
    },
    methods: {
        doAutofocus() {
            const input = this.$refs[REF_KEY];
            if (input) input.focus();
        },
        onClear() {
            modConfig.clear();
            this.fldKey = modConfig.getApiKey();
            this.fldModel = modConfig.getModel();
            this.fldPrompt = modConfig.getPrompt();
            modNotify.positive('Cleared.');
        },
        onOk() {
            modConfig.setData(this.fldKey, this.fldModel, this.fldPrompt);
            modNotify.positive('Saved.');
        },
        onOpenUrl() {
            self.window.open('https://platform.openai.com/api-keys', '_blank');
        },
    },
    mounted() {
        this.fldModel = modConfig.getModel();
        this.fldPrompt = modConfig.getPrompt();
        this.fldKey = modConfig.getApiKey();
        this.doAutofocus();
    },
};