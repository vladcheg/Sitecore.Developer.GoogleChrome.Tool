var ContextMenuView = Backbone.View.extend({
  tagName: "tr",
  className: "context-menu-row",
  form: $('#context-layout-form'),

  template: _.template($('#tpl-context-menu').html()),

  events: {
      "change .select-open-in": "selectOpenIn",
      "click button.btn-edit": "openEditForm",
      "click button.btn-danger": "deletePage",
  },

  initialize: function () {
      this.model.bind('change', this.render, this);
      this.model.bind('destroy', this.remove, this);
  },

  render: function () {
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  },

  selectOpenIn: function (e) {
    var value = $(e.target).children('option:selected').val();
    this.model.set({ tab: value });
  },

  deletePage: function () {
      this.model.destroy();
  },

  openEditForm: function () {
      var view = new FavouritesForm({ collection: ContextMenus, model: this.model });
      this.form.html(view.editRender().el);
      this.form.slideDown(100);
      return false;
  }
});


var AppContextMenusView = Backbone.View.extend({

  el: $('#context-menu-options'),
  tbody: $('#context-menu-options tbody'),
  form: $('#context-layout-form'),


  events: {
      "click .btn.open-form": "openForm"
  },

  initialize: function () {
    this.addAll();
    this.collection.bind('add', this.addOne, this);
    this.collection.bind('remove', this.remove, this);
    this.collection.bind('change', this.change, this);
  },

  render: function () {
    return this;
  },

  addOne: function (con) {
    var view = new ContextMenuView({ model: con });
    this.tbody.append(view.render().el);
    localStorage['sdt_contextmenu'] = JSON.stringify(this.collection);
  },

  addAll: function () {
    this.collection.each(this.addOne, this);
    return this;
  },

  change: function () {
    localStorage['sdt_contextmenu'] = JSON.stringify(this.collection);
  },

  remove: function () {
    localStorage['sdt_contextmenu'] = JSON.stringify(this.collection);
  },


  openForm: function () {
      var view = new FavouritesForm({ collection: this.collection });
      this.form.html(view.render().el);
      this.form.slideDown(100);
      return false;
  }

});

var ContextMenuForm = Backbone.View.extend({
    tagName: "div",
    template: _.template($('#tpl-page-form').html()),

    events: {
        "click #page-layout-cancel": "cancelForm",
        "click #page-layout-add": "addPage",
        "click #page-layout-edit": "editPage"
    },

    initialize: function () {

    },

    editRender: function () {
        this.$el.html(this.template(_.extend(this.model.toJSON(), { "action": "edit" })));
        return this;
    },

    render: function () {
        this.$el.html(this.template({ "tab": "currenttab", "action": "add", "url": "" }));
        return this;
    },

    cancelForm: function () {
        this.$el.slideUp(100);
        this.remove();
        return false;
    },

    addPage: function () {
        var pageName = this.$el.find('#page-layout-name').val();
        var path = this.$el.find('#page-layout-path').val();
        var tabValue = this.$el.find('.select-open-in option:selected').val();
        if (pageName && path) {
            this.collection.add(new ContextMenu({ name: pageName, tab: tabValue, url: path }));
        }
        return false;
    },

    editPage: function () {
        var pageName = this.$el.find('#page-layout-name').val();
        var path = this.$el.find('#page-layout-path').val();
        var tabValue = this.$el.find('.select-open-in option:selected').val();
        if (pageName && path) {
            this.model.set({ name: pageName, tab: tabValue, url: path });
        }
        return false;
    }
});


var appContextMenus = new AppContextMenusView({ collection: ContextMenus });