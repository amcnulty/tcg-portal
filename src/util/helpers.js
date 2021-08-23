const tabViewMap = {
    TAB_GENERAL: 'General',
    TAB_THUMBNAIL: 'Thumbnail',
    TAB_UNIT: 'Unit',
    TAB_PAYMENT: 'Payment',
    TAB_MEDIA: 'Media'
}

export const HELPERS = {
    /**
     * Gets the display text of the tab view from the given tab view constant.
     * @param {String} tabView The tab view constant from the constants file.
     * @returns The string representation of the tab.
     */
    getTabNameFromTabView: (tabView) => tabViewMap[tabView]
}
