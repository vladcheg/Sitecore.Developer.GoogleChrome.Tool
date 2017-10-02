/* Favourites  */

var Favourite = Backbone.Model.extend({
  defaults: {
      "tab": "currenttab",
      "className": "def-page"
  }
});

var FavouritList = Backbone.Collection.extend({ model: Favourite });

var DefaultFavouritList = new FavouritList([
      new Favourite({ name: 'Home Page', url: '/?sc_mode=normal', className: 'home-page' }),
      new Favourite({ name: 'Desktop', url: '/sitecore/shell/default.aspx', className: 'desctop' }),
      new Favourite({ name: 'Content Editor', url: '/sitecore/shell/Applications/Content editor.aspx', className: 'content-editor' }),
      new Favourite({ name: 'Page Editor', url: '/?sc_mode=edit', className: 'page-editor' })
]);

var Favourits;
var favStore = localStorage['sdt_favourits'];
if (favStore) {
  var Favourits = new FavouritList(JSON.parse(favStore));
} else {
  Favourits = DefaultFavouritList;
}


/* admin pages  */
var AdminPage = Backbone.Model.extend({
  defaults: {
    "tab": "currenttab"
  }
});

var AdminPageList = Backbone.Collection.extend({ model: AdminPage });

var DefaultAdminPageList = new AdminPageList([
      new AdminPage({ name: 'Cache', url: '/sitecore/admin/cache.aspx' }),
      new AdminPage({ name: 'Database Browser', url: '/sitecore/admin/dbbrowser.aspx' }),
      new AdminPage({ name: 'Serialization', url: '/sitecore/admin/serialization.aspx' }),
      new AdminPage({ name: 'Show Config', url: '/sitecore/admin/showconfig.aspx' }),
      new AdminPage({ name: 'Stats', url: '/sitecore/admin/stats.aspx' }),
      new AdminPage({ name: 'Unlock Admin', url: '/sitecore/admin/unlock_admin.aspx' }),
      new AdminPage({ name: 'Update Installation Wizard', url: '/sitecore/admin/UpdateInstallationWizard.aspx' })
]);

var AdminPages;
var admStore = localStorage['sdt_adminpages'];
if (admStore) {
  var AdminPages = new AdminPageList(JSON.parse(admStore));
} else {
  AdminPages = DefaultAdminPageList;
}



/* Databases  */
var DataBase = Backbone.Model.extend({
  defaults: {
    "tab": "currenttab"
  }
});

var DataBases = Backbone.Collection.extend({ model: DataBase });

var DefaultDBList = new DataBases([
      new DataBase({ name: 'core' }),
      new DataBase({ name: 'master' }),
      new DataBase({ name: 'web' })
]);

var DBList;
var dbStore = localStorage['sdt_databases'];
if (dbStore) {
  DBList = new DataBases(JSON.parse(dbStore));
} else {
  DBList = DefaultDBList;
}


/* context menu  */
var ContextMenu = Backbone.Model.extend({
  defaults: {
    "tab": "newtab"
  }
});

var ContextMenuList = Backbone.Collection.extend({ model: ContextMenu });

var DefaultContextMenuList = new ContextMenuList([
      new ContextMenu({ name: 'Go To Item', url: '/sitecore/shell/sitecore/content/Applications/Content%20Editor.aspx?id={selectedText}&fo={selectedText}' })
]);

var ContextMenus;
var conStore = localStorage['sdt_contextmenu'];
if (conStore) {
  ContextMenus = new ContextMenuList(JSON.parse(conStore));
} else {
  ContextMenus = DefaultContextMenuList;
}

/* Debug  */
var SitecoreParam = Backbone.Model.extend({
    defaults: {
        "eventName": "pagemode"
    }
});

var SitecoreParamList= Backbone.Collection.extend({ model: SitecoreParam });

var DefaultSitecoreParamList = new SitecoreParamList([
      new SitecoreParam({ name: 'Debug', parameter: 'sc_debug' }),
      new SitecoreParam({ name: 'Trace', parameter: 'sc_trace' }),
      new SitecoreParam({ name: 'Profiler', parameter: 'sc_prof' }),
      new SitecoreParam({ name: 'Render Info', parameter: 'sc_ri' }),
      new SitecoreParam({ name: 'Render Borders', parameter: 'sc_rb' })
]);

var SitecoreParams = DefaultSitecoreParamList;
