/* Options  */

var Option = Backbone.Model.extend({
  defaults: {
    "tab": "newtab"
  }
});

var OptionList = Backbone.Collection.extend({ model: Favourite });

var DefaulOptionList = new FavouritList([
      new Option({ name: 'Reset...', url: '#', id: 'reset' }),
      new Option({ name: 'Options...', url: 'options.html', id: 'options' })

]);

var Options = DefaulOptionList;


var OptionView = Backbone.View.extend({
  tagName: "li",

  template: _.template($('#pp-tpl-option').html()),

  events: {
    "click a.link": "linkOnClick",
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

  linkOnClick: function (e) {
    if (this.model.get('id') == "options") {
      chrome.tabs.create({ 'url': chrome.extension.getURL("options.html") });
    }
    if (this.model.get('id') == "reset") {
      this.reset();
    }
    return false;
  },

  reset: function () {
    Favourits.reset(DefaultFavouritList.toJSON());
    localStorage['sdt_favourits'] = JSON.stringify(Favourits);
    
    AdminPages.reset(DefaultAdminPageList.toJSON());
    localStorage['sdt_adminpages'] = JSON.stringify(AdminPages);

    DBList.reset(DefaultDBList.toJSON());
    localStorage['sdt_databases'] = JSON.stringify(DBList);

    ContextMenus.reset(DefaultContextMenuList.toJSON());
    localStorage['sdt_contextmenu'] = JSON.stringify(DefaultContextMenuList);

    Options.reset(DefaulOptionList.toJSON());
  }

});


var AppOptionPageView = Backbone.View.extend({

  el: $('#options-menu'),
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

  addOne: function (adm, t) {
    var view = new OptionView({ model: adm });

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
      var t = index % 1 == 0;
      self.addOne(model, t);
    });
    return this;
  },
});

var appOption = new AppOptionPageView({ collection: Options });