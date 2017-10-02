var FavouritView = Backbone.View.extend({
  tagName: "li",

  template: _.template($('#pp-tpl-favourite').html()),

  events: {
    "click a.link": "openPage",
  },

  initialize: function () {
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  isNewTab: function () {
    return this.model.get("tab") == "newtab";
  },

  openPage: function (e) {
    var href = this.model.get('url');
    if (this.isNewTab()) {
      this.openInNewTab(href);
    } else {
      this.openInCurrentTab(href);
    }
    return false;
  },

  openInNewTab: function (href) {
    chrome.tabs.getSelected(null, function (tab) {
      var tablink = tab.url;
      var origin = tablink.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[0];
      chrome.tabs.create({ url: origin + href });
    });
  },

  openInCurrentTab: function (href) {
    chrome.tabs.getSelected(null, function (tab) {
      var tablink = tab.url;
      var origin = tablink.match(/^[\w-]+:\/*\[?([\w\.:-]+)\]?(?::\d+)?/)[0];
      var id = tab.id;
      chrome.tabs.update(id, { url: origin + href });
    });
  }
});


var AppFavouritsView = Backbone.View.extend({

  el: $('#favourites-menu'),
  template: _.template("<ul></ul>"),

  events: {
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
    var view = new FavouritView({ model: fav });

    if (t) {
      this.$el.append("<ul class='unstyled'></ul>");
    }
    this.$el.children("ul:last").append(view.render().el);
  },

  addAll: function () {
    this.$el.html("");
    //this.collection.each(this.addOne, this);
    var self = this;
    this.collection.each(function (model, index) {
      var t = index % 4 == 0;
      self.addOne(model, t);
    });
    return this;
  },
});

var appFavourits = new AppFavouritsView({ collection: Favourits });