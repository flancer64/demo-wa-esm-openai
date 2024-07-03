/**
 * The singleton model to handle configuration data.
 */
// IMPORTS
import MODELS from '../Enum/Model.mjs';

// VARS
const KEY = 'config';
const PROMPT = 'You are a helpful assistant.';

// CLASSES
/**
 * DTO to store configuration data in the localStorage.
 */
class Dto {
    /** @type {string} */
    key;
    /** @type {string} */
    model = MODELS.GPT_35_TURBO;
    /** @type {string} */
    prompt = PROMPT;
}

/**
 * The class to create singleton instance.
 */
class Config {
    /** @type {Dto} */
    #cache;

    #init() {
        if (!this.#cache) this.#load();
    }

    #load() {
        const data = self.localStorage.getItem(KEY);
        if (!data) this.#cache = new Dto();
        else this.#cache = JSON.parse(data);
    }

    #store() {
        const text = JSON.stringify(this.#cache);
        self.localStorage.setItem(KEY, text);
    }

    getApiKey() {
        this.#init();
        return this.#cache.key;
    }

    getModel() {
        this.#init();
        return this.#cache.model;
    }

    getPrompt() {
        this.#init();
        return this.#cache.prompt;
    }

    /**
     * @param {string} key
     * @param {string} model
     * @param {string} prompt
     */
    setData(key, model, prompt) {
        this.#cache.key = key;
        this.#cache.model = model;
        this.#cache.prompt = prompt;
        this.#store();
    }

    clear() {
        this.#cache = undefined;
        self.localStorage.removeItem(KEY);
    }
}

// MAIN
const singleton = new Config();
export default singleton;