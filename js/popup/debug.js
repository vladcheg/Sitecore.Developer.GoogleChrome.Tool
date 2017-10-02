var DebugView = Backbone.View.extend({
    tagName: "li",

    template: _.template($('#pp-tpl-debug').html()),

    events: {
        "click button.btn": "setParam",
    },

    initialize: function () {
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    },

    updateQueryStringParameter: function(uri, key, value) {
        var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
        separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    },

    setParam: function (e) {
        var value = $(e.currentTarget).attr("value");
        var key = $(e.currentTarget).attr("parameter");
        var UQS = this.updateQueryStringParameter;
        chrome.tabs.getSelected(null, function (tab) {
            var url = UQS(tab.url, key, value);
            chrome.tabs.update(tab.id, { url: url });
        });
    }

});


var AppDebugView = Backbone.View.extend({

    el: $('#debug-menu'),
    template: _.template("<ul></ul>"),
    templateOnOff: _.template($('#pp-tpl-debug-onoff').html()),
    templatePagaMode: _.template($('#pp-tpl-pagemode').html()),

    events: {
        "click button.all": "setAllParam",
        "click .btn-page-mode": "setParam"
    },

    initialize: function () {
        this.addAll();
        this.collection.bind('add', this.addOne, this);
        this.collection.bind('reset', this.addAll, this);
    },

    render: function () {
        return this;
    },

    addOne: function (fav, t) {
        var view = new DebugView({ model: fav });

        if (t) {
            this.$el.append("<ul class='unstyled'></ul>");
        }
        this.$el.children("ul:last").append(view.render().el);
    },

    addAll: function () {
        this.$el.html("");
        this.$el.append(this.templateOnOff());
        this.$el.append(this.templatePagaMode());
        //this.collection.each(this.addOne, this);
        var self = this;
        this.collection.each(function (model, index) {
            var t = index % 4 == 0;
            self.addOne(model, t);
        });
        return this;
    },

    updateQueryStringParameter: function (uri, key, value) {
        var re = new RegExp("([?|&])" + key + "=.*?(&|$)", "i");
        separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        }
        else {
            return uri + separator + key + "=" + value;
        }
    },

    setAllParam: function (e) {
        var value = $(e.currentTarget).attr("value");
        var UQS = this.updateQueryStringParameter;
        var collection = this.collection;
        chrome.tabs.getSelected(null, function (tab) {
            var url = tab.url;
            collection.each(function (model, index) {
                url = UQS(url, model.get("parameter"), value);
            });
            chrome.tabs.update(tab.id, { url: url });
        });
    },

    setParam: function (e) {
        var value = $(e.currentTarget).attr("value");
        var key = $(e.currentTarget).attr("parameter");
        var UQS = this.updateQueryStringParameter;
        chrome.tabs.getSelected(null, function (tab) {
            var url = UQS(tab.url, key, value);
            chrome.tabs.update(tab.id, { url: url });
        });
    }
});

var appDebug = new AppDebugView({ collection: SitecoreParams });