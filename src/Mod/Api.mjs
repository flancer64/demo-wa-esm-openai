/**
 * The singleton model to send requests to OpenAI API.
 */
// IMPORTS
import {OpenAI} from 'https://cdn.jsdelivr.net/npm/openai@4.52.2/index.mjs';
import modConfig from './Config.mjs';
import modNotify from './Notify.mjs';
import Msg from '../Dto/Msg.mjs';
import MODELS from '../Enum/Model.mjs';

// CLASSES
class Api {

    /**
     * @param {Msg[]} items
     * @return {Promise<Msg>}
     */
    async send(items) {
        try {
            const apiKey = modConfig.getApiKey();
            const prompt = modConfig.getPrompt();
            const model = modConfig.getModel() ?? MODELS.GPT_35_TURBO;
            const dangerouslyAllowBrowser = true;
            const openai = new OpenAI({apiKey, dangerouslyAllowBrowser});
            // add the first message: system prompt
            const messages = [{role: 'system', content: prompt}];
            for (const one of items) {
                const role = one.out ? 'user' : 'assistant';
                const content = one.body;
                messages.push({role, content});
            }
            const completion = await openai.chat.completions.create({
                messages,
                model,
            });
            const answer = completion?.choices?.[0]?.message?.content;
            const msg = new Msg();
            msg.out = false;
            msg.body = answer;
            return msg;
        } catch (e) {
            modNotify.negative(e.message);
        }
        return undefined;
    }

}

// MAIN
const singleton = new Api();
export default singleton;