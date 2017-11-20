odoo.define('queue_management.views', function (require) {
'use strict';

var core = require('web.core');
var Screen = require('queue_management.classes').Screen;
var Widget = require('web.Widget');

var qweb = core.qweb;
var _t = core._t;

require('web.dom_ready');

var ScreenApp = Widget.extend({
    template: 'queue_management.app',
    xmlDependencies: ['/queue_management/static/src/xml/screen_views.xml'],
    init: function (parent, options) {
        this._super.apply(this, arguments);
        this.screen = new Screen();
    },
    willStart: function () {
        return $.when(this._super.apply(this, arguments),
                      this.screen.fetchAllLines()
        );
    },
    start: function () {
        var self = this;
        return this._super.apply(this, arguments).then(function () {
            self.list = new ScreenList(self, self.screen.lines);
            self.list.appendTo($('.o_screen_list'));
        });
    },
});

var ScreenList = Widget.extend({
    template: 'queue_management.screen_list',
    init: function (parent, lines) {
        this._super.apply(this, arguments);
        this.lines = lines;
    },
    _rerender: function () {
        this.replaceElement(qweb.render('queue_management.screen_list', {widget: this}));
    },
});


var $elem = $('.o_screen_app');
var app = new ScreenApp(null);
app.appendTo($elem);
});
