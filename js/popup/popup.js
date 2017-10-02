!function ($) {

  var Tab = function() {
    var self = this;
    var $el = $('div.tabbable');
    var $navLinks = $el.find('.nav-tabs a.nav-link');
    var $tabContent = $el.find('.tab-content');
    var $links = $el.find('.link');
    var tabId;

    this.init = function() {
      events();
      getLocalStorageTabId();
      activateTab();
    };

    var events = function() {
      $navLinks.on('click', onClickNavLink);
    };

    var activateTab = function() {
      if (!tabId)
        return;
      hideTabs();
      showTab(tabId);
    };

    var getLocalStorageTabId = function() {
      tabId = localStorage["popup_tab_id"];
    };

    var setLocalStorageTabId = function(id) {
      localStorage["popup_tab_id"] = id;
    };

    var onClickNavLink = function() {
      if ($(this).parent().hasClass('active'))
        return false;

      var id = $(this).parent().attr('id');
      hideTabs();
      showTab(id);
      setLocalStorageTabId(id);

      return false;
    };

    var showTab = function(id) {
      var $id = $('#' + id);
      $id.addClass('active');
      var selector = $id.find('a').attr('href');
      $tabContent.find(selector).addClass('active');
    };

    var hideTabs = function () {
      $navLinks.parent().removeClass('active');
      $tabContent.find('.active').removeClass('active');
    };
  };


  new Tab().init();

}(window.jQuery);

