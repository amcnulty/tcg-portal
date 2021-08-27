const tabViewMap = {
    TAB_GENERAL: 'General',
    TAB_THUMBNAIL: 'Thumbnail',
    TAB_UNIT: 'Unit',
    TAB_PAYMENT: 'Payment',
    TAB_MEDIA: 'Media'
}

export const TOAST_TYPES = {
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
    WARNING: 'WARNING',
    ERROR: 'ERROR'
}

export const HELPERS = {
    /**
     * Gets the display text of the tab view from the given tab view constant.
     * @param {String} tabView The tab view constant from the constants file.
     * @returns The string representation of the tab.
     */
    getTabNameFromTabView: (tabView) => tabViewMap[tabView],
    /**
     * Toast Listener
     */
    listenerFunction: [],
    /**
     * Adds a listener function that will be called to show a toast message.
     * @param {Function} listener Listener function that will get called when a toast needs to be displayed.
     */
    addToastListener(listener) {
        this.listenerFunction = listener;
    },
    /**
     * Shows a toast message of the given type containing the given text.
     * @param {String} type The type of toast to display.
     * @param {String} message The message to show on the toast.
     */
    showToast(type, message) {
        this.listenerFunction(type, message);
    },
}
