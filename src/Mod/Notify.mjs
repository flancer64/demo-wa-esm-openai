/**
 * The singleton model to handle notification events.
 */
class Notify {

    positive(message) {
        const QNotify = self.window.Quasar.Notify; // the Quasar UMD should be included in the index.html
        QNotify.create({
            message,
            position: 'bottom-right',
            timeout: 2000,
            type: 'positive',
            actions: [
                {icon: 'close', round: true, color: 'white'},
            ]
        });
    }

    negative(message) {
        const QNotify = self.window.Quasar.Notify; // the Quasar UMD should be included in the index.html
        QNotify.create({
            message,
            position: 'bottom-right',
            timeout: 2000,
            type: 'negative',
            actions: [
                {icon: 'close', round: true, color: 'white'},
            ]
        });
    }
}

// MAIN
const singleton = new Notify();
export default singleton;