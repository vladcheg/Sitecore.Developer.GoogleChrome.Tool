
  var Tab = function () {
    var self = this;
    var $el = $('div.tabbable');
    var $navLinks = $el.find('.nav-tabs > li > a');
    var $tabContent = $el.find('.tab-content');

    this.init = function () {
      this.events();
    };

    this.events = function () {
      $navLinks.on('click', showTab);
    };

    var showTab = function () {
      if ($(this).parent().hasClass('active'))
        return false;

      hideTab();
      $(this).parent().addClass('active');

      var selector = $(this).attr('href');
      $tabContent.find(selector).addClass('active');
      return false;
    };

    var hideTab = function () {
      $navLinks.parent().removeClass('active');
      $tabContent.find('.active').removeClass('active');
    };

  };


  var SelectTabApp = function (id) {
    var self = this;
    var $el = $('div#'+id);
    var $selectNodes = $el.find('select.select-open-in');
    
    this.init = function () {
      this.setOption();
      this.events();
    };

    this.events = function () {
      $selectNodes.change(onSelectChange);
    };

    this.setOption = function() {
      $selectNodes.each(function () {
        var id = $(this).attr('id');
        var value = localStorage['sdt_' + id];
        if (!value)
          return;

        $(this).children('option[value=' + value + ']').prop('selected', true);
      });
    };

    var onSelectChange = function() {
      var id = $(this).attr('id');
      var value = $(this).children('option:selected').val();
      localStorage["sdt_"+id] = value;
    };
  };

  new Tab().init();
  //new SelectTabApp('favourites-options').init();
  //new SelectTabApp('admin-options').init();
  //new SelectTabApp('database-options').init();

 

