const tabViewMap = {
    TAB_GENERAL: 'General',
    TAB_THUMBNAIL: 'Thumbnail',
    TAB_UNIT: 'Unit / Pricing',
    TAB_PAYMENT: 'Payment',
    TAB_MEDIA: 'Image',
    TAB_VIDEO: 'Video'
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
     * Derives the single display status for a location from its flags. The four states are
     * mutually exclusive: comingSoon only applies to a published (live) location and takes
     * visual precedence over the plain "Published" status.
     * @param {Object} location Object with isDraft, isPublished and comingSoon flags.
     * @returns {{label: String, className: String}} The badge label and Bootstrap classes.
     */
    getLocationStatus({ isDraft, isPublished, comingSoon } = {}) {
        if (isDraft) return { label: 'DRAFT', className: 'bg-black bg-opacity-75' };
        if (isPublished && comingSoon) return { label: 'COMING SOON', className: 'themeBackground text-white' };
        if (isPublished) return { label: 'PUBLISHED', className: 'bg-primary bg-opacity-75' };
        return { label: 'HIDDEN', className: 'bg-secondary bg-opacity-75' };
    },
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
