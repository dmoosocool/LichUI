+(function (window, Zepto, undefined) {
    window.LichUI = window.LichUI || {};
    window.LichUI.Dialog = window.LichUI.Dialog || {};
    /**
     * LichUI - Dialog - Confirm.
     *
     * 弹出对话框.
     *
     * @param {Object} options Confirm配置项目.
     *
     * @param {String} options.title 标题
     * @param {String} options.content 内容 
     * @param {Enum} options.align 内容对齐方式. left|right|center
     * @param {Boolean} options.closeBtn 是否显示关闭按钮
     *
     * @param {Object} options.leftBtn 左边按钮配置
     * @param {String} options.leftBtn.text 左边按钮文本
     * @param {Function} options.leftBtn.callback 左边按钮回调
     *
     * @param {Object} options.rightBtn 右边按钮配置
     * @param {String} options.rightBtn.text 右边按钮文本
     * @param {Function} options.rightBtn.callback 右边按钮回调
     *
     * @example 使用示例.
     *  let options = {
     *      title: '温馨提示',
     *      content: '提示内容, 提示内容.',
     *      align: 'left',
     *      leftBtn: {
     *          text: '左边按钮',
     *          callback: function(){
     *              console.log('你点击了左边按钮.');
     *          }
     *      },
     *      rightBtn:{
     *          text: '右边按钮',
     *          callback: function(){
     *              console.log('你点击了右边按钮.');
     *          }
     *      }
     *  };
     *
     *  LichUI.Dialog.Confirm(options);
     */
    var Confirm = function (options) {
        options = options || {};
        // 空函数.
        var emptyCallback = function () {
                // console.log(123);
            },
            pluginAlias = LichUI.Utils.getPluginAlias('Confirm');

        var closeBtn = '\
        <svg class="icon" aria-hidden="true">\
            <use xlink:href="#icon-close"></use>\
        </svg>';
        var tpl = '\
            <div class="mask"></div> \
            \
            <div class="lich-confirm" id= "<%- pluginAlias %>"> \
                <div class="lich-confirm-closeBtn"></div>\
                <div class="lich-confirm-title"><%- title %></div> \
                <div class="lich-confirm-content"><%= content %></div> \
                <div class="lich-confirm-btns"> \
                    <button class="lich-confirm-btns-left"><%- leftBtn.text %></button> \
                    <button class="lich-confirm-btns-right"><%- rightBtn.text %></button> \
                </div> \
            </div>';

        // 默认配置项.
        var defaults = {
            title: '',
            content: '',
            align: 'center',
            closeBtn: false,
            leftBtn: {
                text: '取消',
                callback: emptyCallback
            },
            rightBtn: {
                text: '确定',
                callback: emptyCallback
            },

            pluginAlias: pluginAlias
        };

        options = $.extend(defaults, options);
        // 解析控件模板并返回一个zepto对象.
        var $el = $(LichUI.Utils.render(tpl, options));
        console.log($el);

        // 设置对话框的对齐方式.
        $el.find('.lich-confirm-content').css('textAlign', options.align);

        // 如果标题为空的时候
        if (options.title == '') $el.find('.lich-confirm-title').remove();

        // 如果有关闭按钮
        if (!!options.closeBtn) {
            $el.find('.lich-confirm-closeBtn').append(closeBtn);
            // 如果有关闭按钮, 则顶部得多预留写空隙.
            $el.find('.lich-confirm-content').css('marginTop', '.288rem');

            $('body').on('click', '#' + pluginAlias + ' .lich-confirm-closeBtn', function () {
                // 销毁
                $el.remove();
                $('body').off('click', '#' + pluginAlias + ' .lich-confirm-btns-left');
            });

        } else {
            $el.find('.lich-confirm-closeBtn').remove();
        }

        // 输出到html.
        $('body').append($el);

        // 通过事件代理的方式进行事件绑定.
        $('body').on('click', '#' + pluginAlias + ' .lich-confirm-btns-left', function () {
            // 销毁
            $el.remove();
            $('body').off('click', '#' + pluginAlias + ' .lich-confirm-btns-left');

            // 执行用户回调.
            options.leftBtn.callback && options.leftBtn.callback();
        });

        $('body').on('click', '#' + pluginAlias + ' .lich-confirm-btns-right', function () {
            // 销毁
            $el.remove();
            $('body').off('click', '#' + pluginAlias + ' .lich-confirm-btns-right');

            // 执行用户回调.
            options.leftBtn.callback && options.rightBtn.callback();
        });

    };

    window.LichUI.Dialog.Confirm = Confirm;
}(window, Zepto))