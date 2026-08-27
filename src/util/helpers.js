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
     * Today as YYYY-MM-DD in the browser's local timezone. Unit availability dates are
     * plain calendar dates, so they are compared as strings against this rather than
     * being turned into Date objects (a `new Date('2026-05-01')` parses as UTC midnight
     * and reads back as April 30 in every US timezone).
     * @returns {String} Today's date in YYYY-MM-DD form.
     */
    todayISO() {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${now.getFullYear()}-${month}-${day}`;
    },
    /**
     * Whether a YYYY-MM-DD availability date is still in the future. Dates in the past
     * are not cleaned up in the database — the live site simply shows those units as
     * available now, and the portal says the same thing.
     * @param {String} isoDate A YYYY-MM-DD date string.
     * @returns {Boolean} True when the date has not arrived yet.
     */
    isFutureDate(isoDate) {
        return !!isoDate && isoDate > this.todayISO();
    },
    /**
     * Formats a YYYY-MM-DD date for display, e.g. "May 1, 2026".
     * @param {String} isoDate A YYYY-MM-DD date string.
     * @returns {String} The formatted date, or an empty string if unparseable.
     */
    formatAvailableDate(isoDate) {
        if (!isoDate) return '';
        const [year, month, day] = isoDate.split('-').map(Number);
        if (!year || !month || !day) return '';
        return new Date(year, month - 1, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
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
