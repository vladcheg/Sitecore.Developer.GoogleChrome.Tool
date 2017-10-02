var DataBaseView = Backbone.View.extend({
  tagName: "tr",
  className: "db-row",
  form: $('#database-layout-form'),

  template: _.template($('#tpl-db').html()),

  events: {
    "change .select-open-in": "selectOpenIn",
    "click button.btn-edit": "openEditForm",
    "click button.btn-danger": "deleteDataBase",
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

  deleteDataBase: function () {
    this.model.destroy();
    return false;
  },

  openEditForm: function () {
      var view = new DataBaseForm({ collection: DBList, model: this.model });
      this.form.html(view.editRender().el);
    this.form.slideDown(100);
    return false;
  }
});


var AppDataBaseView = Backbone.View.extend({

  el: $('#database-options'),
  tbody: $('#database-options tbody'),
  form: $('#database-layout-form'),

  events: {
    "click #btn-open-dbform": "openForm"
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

  addOne: function (db) {
    var view = new DataBaseView({ model: db });
    this.tbody.append(view.render().el);
    localStorage['sdt_databases'] = JSON.stringify(this.collection);
  },

  addAll: function () {
    this.collection.each(this.addOne, this);
    return this;
  },

  change: function () {
    localStorage['sdt_databases'] = JSON.stringify(this.collection);
  },

  remove: function () {
    localStorage['sdt_databases'] = JSON.stringify(this.collection);
  },

  openForm: function () {
      var view = new DataBaseForm({ collection: this.collection });
      this.form.html(view.render().el);
      this.form.slideDown(100);
      return false;
  }

});

var DataBaseForm = Backbone.View.extend({
    tagName: "div",
    template: _.template($('#tpl-database-form').html()),

    events: {
        "click #database-layout-cancel": "cancelForm",
        "click #database-layout-add": "addDataBase",
        "click #database-layout-edit": "editDataBase"
    },

    initialize: function () {

    },

    editRender: function(){
        this.$el.html(this.template(_.extend(this.model.toJSON(), { "action": "edit" })));
        return this;
    },

    render: function () {
        this.$el.html(this.template({ "tab": "currenttab", "action": "add" }));
        return this;
    },

    cancelForm: function () {
        this.$el.slideUp(100);
        this.remove();
        return false;
    },

    addDataBase: function () {
        var dbName = this.$el.find('#database-layout-name').val();
        var tabValue = this.$el.find('.select-open-in option:selected').val();
        if (dbName) {
            this.collection.add(new DataBase({ name: dbName, tab: tabValue }));
        }
        return false;
    },

    editDataBase: function () {
        var dbName = this.$el.find('#database-layout-name').val();
        var tabValue = this.$el.find('.select-open-in option:selected').val();
        if (dbName) {
            this.model.set({ name: dbName, tab: tabValue });
        }
        return false;
    }
});

var foo = new AppDataBaseView({ collection: DBList });

/* -------------------------  */