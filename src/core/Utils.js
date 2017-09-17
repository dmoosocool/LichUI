/**
 * Utils 工具类.
 * @author DmooSoCool
 */
+(function (window, Zepto, _, undefined) {
    window.LichUI = window.LichUI !== undefined ? window.LichUI : {};
    var Utils = {
        /**
         * 解析模板
         *
         * @param {String} html 需要解析的字符串.
         * @param {Object} options 注入的变量
         *
         * @example
         * ###JS
         * ```javascript
         *  let template = `<div><%- this.words %></div>`;
         *  LichUI.render(template, {
         *      words: 'Hello, LichUI.'
         *  });
         * ```
         *
         * ###output:
         * ```html
         * <div>Hello, LichUI.</div>
         * ```
         */
        render: function (html, options) {
            var compiled = _.template(html);
            return compiled(options);
        },

        getPluginAlias: function (plugin) {
            var random = Math.random().toString(36).substring(2);
            return 'LichUI_' + plugin + '_' + (+new Date()) + random;
        }
    };
    window.LichUI.Utils = Utils;
}(window, Zepto, _));