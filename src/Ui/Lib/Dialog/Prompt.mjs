/**
 * The librarian Vue component to view/edit prompts.
 * @namespace Ui_Lib_Dialog_Prompt
 */
// IMPORTS

// VARS
const EVT_OK = 'onOk';

// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * @interface
 * @memberOf Ui_Lib_Dialog_Prompt
 */
class IUi {
    /**
     * Hide the dialog.
     */
    hide() { }

    /**
     * Set the information data and display the dialog.
     * @param {string} title
     * @param {string} msg
     * @param {boolean} [edit] - view/edit mode for the dialog
     */
    show(title, msg, edit = false) { }
}

// VARS
const REF_SELF = 'self';

const template = `
<q-dialog ref="${REF_SELF}">
    <q-card style="min-width: min(80vw, 400px);">
        <q-bar>
            <div>{{fldTitle}}</div>
            <q-space/>
            <q-btn dense flat icon="close" v-close-popup/>
        </q-bar>
        
        <q-card-section class="column justify-center items-center">
            <q-input v-model="fldBody"
                     autofocus
                     autogrow
                     dense
                     outlined  
                     style="flex-grow: 1; width: 100%;"
            />
        </q-card-section>
        
        <q-card-actions align="center">
            <q-btn outline label="OK"  @click="onOk"/>
        </q-card-actions>
        
    </q-card>
</q-dialog>
`;


// MAIN
export default {
    template,
    data() {
        return {
            fldBody: undefined,
            fldTitle: undefined,
            ifEdit: false,
        };
    },
    computed: {},
    /**
     * @implements Ui_Lib_Dialog_Prompt.IUi
     */
    methods: {
        hide() {
            const ui = this.$refs[REF_SELF];
            ui.hide();
        },
        onOk() {
            const prompt = (this.ifEdit) ? String(this.fldBody) : null;
            this.$emit(EVT_OK, prompt, this.ifEdit);
            this.hide();
        },
        show(title, body, edit = false) {
            this.fldTitle = title;
            this.fldBody = (body) ? String(body) : null;
            this.ifEdit = edit;
            const ui = this.$refs[REF_SELF];
            ui.show();
        },
    },
    emits: [EVT_OK],
    mounted() { },
};