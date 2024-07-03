// VARS
const template = `
<div class="t-layout-center">
    <q-card class="q-pa-md" flat bordered class="t-card">
        <q-card-section>
            <div class="text-h6">About This Web App</div>
        </q-card-section>

        <q-card-section>
            <p>
                This is an example of a browser-based application for using the OpenAI API. All application code is
                hosted on public servers (GitHub Pages, JSDelivr), so no private virtual server or cloud is needed for
                distribution.
            </p>
            <p>
                The application uses the following libraries:
            <ul>
                <li><a href="https://vuejs.org/" target="_blank">Vue</a></li>
                <li><a href="https://quasar.dev/" target="_blank">Quasar</a></li>
                <li><a href="https://openai.com/" target="_blank">OpenAI</a></li>
            </ul>
            </p>
            <p>
                The application runs on the client's device (in the browser of a mobile phone, tablet, or computer). To
                connect to the OpenAI API, you need to enter an API access key and select the desired model on the
                configuration page. You can create an access key
                <a href="https://platform.openai.com/api-keys" target="_blank">here</a>. Note that OpenAI charges for
                the use of its API.
            </p>
            <p>
                All data is transmitted only between the client and the OpenAI API. However, please delete your API
                access key after using the application.
            </p>
            <p>
                This application is created for educational purposes and is a demonstration of the ideas presented in
                this publication. You can find the source code on
                <a href="https://github.com/your-repo" target="_blank">GitHub</a>. Feel free to modify the
                application code and use it for any purpose within the bounds of applicable law.
            </p>
            <p>
                Best regards,
                <br/>
                Alex Gusev.
            </p>
        </q-card-section>
    </q-card>
</div>
`;

// MAIN
export default {
    template,
};