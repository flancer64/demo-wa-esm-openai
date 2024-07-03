/**
 * The navigator for the right drawer.
 */
// IMPORTS
import DEF from '../../Defaults.mjs';

// VARS
const template = `
<q-list>
    <q-item clickable v-ripple to="${DEF.ROUTE_HOME}">
        <q-item-section avatar>
            <q-icon name="chat"/>
        </q-item-section>
        <q-item-section>Chat</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="${DEF.ROUTE_CONFIG}">
        <q-item-section avatar>
            <q-icon name="settings"/>
        </q-item-section>
        <q-item-section>Config</q-item-section>
    </q-item>
    <q-item clickable v-ripple to="${DEF.ROUTE_ABOUT}">
        <q-item-section avatar>
            <q-icon name="help"/>
        </q-item-section>
        <q-item-section>About</q-item-section>
    </q-item>
</q-list>
`;

// MAIN
export default {
    template,
};