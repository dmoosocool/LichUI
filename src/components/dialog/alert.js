+(function (window, Zepto, undefined) {
    window.LichUI = window.LichUI || {};
    window.LichUI.Dialog = window.LichUI.Dialog || {};
    /**
     * LichUI - Dialog - Alert.
     *
     * 弹出对话框.
     *
     * @param {Object} options Alert配置项目.
     *
     * @param {String} options.title 标题
     * @param {String} options.content 内容 
     * @param {Enum} options.align 内容对齐方式. left|right|center
     *
     * @param {Object} options.btn 按钮配置
     * @param {String} options.btn.text 按钮文本
     * @param {Function} options.btn.callback 按钮回调
     *
     * @example 使用示例.
     *  let options = {
     *      title: '温馨提示',
     *      content: '提示内容, 提示内容.',
     *      align: 'left',
     *      btn: {
     *          text: '左边按钮',
     *          callback: function(){
     *              console.log('你点击了左边按钮.');
     *          }
     *      }
     *  };
     *
     *  LichUI.Dialog.Alert(options);
     */
    var Alert = function (options) {
        options = options || {};
        // 空函数.
        var emptyCallback = function () { },
            pluginAlias = LichUI.Utils.getPluginAlias('Alert');
        var tpl = '\
            <div class="mask"></div> \
            \
            <div class="lich-alert" id= "<%- pluginAlias %>"> \
                <div class="lich-alert-title"><%- title %></div> \
                <div class="lich-alert-content"><%= content %></div> \
                <div class="lich-alert-btns"> \
                    <button class="lich-alert-btn"><%- btn.text %></button> \
                </div> \
            </div>';

        // 默认配置项.
        var defaults = {
            title: '',
            content: '',
            align: 'center',
            btn: {
                text: '确定',
                callback: emptyCallback
            },
            pluginAlias: pluginAlias
        };

        options = $.extend(defaults, options);
        // 解析控件模板并返回一个zepto对象.
        var $el = $(LichUI.Utils.render(tpl, options));

        // 设置对话框的对齐方式.
        $el.find('.lich-alert-content').css('textAlign', options.align);

        // 如果标题为空的时候
        if (options.title == '') $el.find('.lich-alert-title').remove();

        // 输出到html.
        $('body').append($el);

        // 通过事件代理的方式进行事件绑定.

        $('body').on('click', '#' + pluginAlias + ' .lich-alert-btn', function () {
            // 销毁
            $el.remove();
            $('body').off('click', '#' + pluginAlias + ' .lich-alert-btn');

            // 执行用户回调.
            options.btn.callback && options.btn.callback();
        });

    };

    window.LichUI.Dialog.Alert = Alert;
}(window, Zepto))
