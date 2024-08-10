/**
 * A 'presenter' part of the widget that represents the title in the app.
 * The widget is a singleton object that can be accessible from any other ES module.
 */
// MODULE'S INTERFACES
// noinspection JSUnusedLocalSymbols
/**
 * The view for this presenter must implement this interface.
 * @interface
 * @memberOf Ui_Widget_App_Title
 * @mixin
 */
class IView {
    /**
     * Set the title of the top bar.
     * @param {string} data
     */
    setTitle(data) { };
}

// MODULE'S CLASSES
class Ui_Widget_App_Title {
    /** @type {Ui_Widget_App_Title.IView} */
    #view;

    /**
     * @return {Ui_Widget_App_Title.IView}
     */
    getView() {
        return this.#view;
    }

    /**
     * @param {string} data
     */
    setTitle(data) {
        const name = 'OpenAI Demo';
        self.document.title = (data) ? `${name}: ${data}` : name;
        this.#view?.setTitle(data ?? name);
    };

    /**
     * @param {Ui_Widget_App_Title.IView} view
     */
    setView(view) {
        this.#view = view;
    };
}

// MAIN
/* create and export the singleton object */
const res = new Ui_Widget_App_Title();
export default res;