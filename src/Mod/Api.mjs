/**
 * The singleton model to send requests to OpenAI API.
 */
// IMPORTS
import modConfig from './Config.mjs';
import MODELS from '../Enum/Model.mjs';
import modNotify from './Notify.mjs';
import Msg from '../Dto/Msg.mjs';
import QUALITY from '../Enum/DallE/Quality.mjs';
import SIZE from '../Enum/DallE/Size.mjs';
import STYLE from '../Enum/DallE/Style.mjs';
import {OpenAI} from 'https://cdn.jsdelivr.net/npm/openai@4.52.2/index.mjs';

// CLASSES
class Api {
    /**
     * @param {string} prompt
     * @param {string} size
     * @param {string} quality
     * @param {string} style
     * @return {Promise<{revisedPrompt: string, url: string}>}
     */
    async dalleCreate({prompt, size, quality, style}) {
        try {
            size = size ?? SIZE.X1024_1024;
            quality = quality ?? QUALITY.STANDARD;
            style = style ?? STYLE.NATURAL;
            const openai = new OpenAI({apiKey: modConfig.getApiKey(), dangerouslyAllowBrowser: true});
            const model = 'dall-e-3';
            const image = await openai.images.generate({model, prompt, size, quality, style});
            console.log(JSON.stringify(image));
            if (image?.data?.[0]) {
                const item = image.data[0];
                const revisedPrompt = item.revised_prompt;
                const url = item.url;
                return {url, revisedPrompt};
            }
        } catch (e) {
            modNotify.negative(e.message);
            debugger
        }
        return {};
    }

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