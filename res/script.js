$.getJSON('./res/settings.json', function (data) {
  var
    my = {
      'images': new Rand(data.files.images),
      'all': new Rand(data.files.all),
      'videos': new Rand(data.files.videos),
      'webm': new Rand(data.files.webm)
    },
    getUrlQueries = function (toGet) {
      var queries = {};
      location.search.substr(1).split("&").forEach(function (item) {
        queries[item.split('=')[0].trim()] = item.split('=')[1];
      });
      if (!toGet) {
        if (Object.keys(queries).length === 1)
          return queries[toGet];
        else if (Object.keys(queries).length > 1)
          return queries;
      }
      else
        return queries[toGet];
    },
    updateLS = {
      'used': function (tab, newUsed) {
        var localUsed = JSON.parse(localStorage.getItem('used'));
        if (Array.isArray(newUsed)) {
          for (var g in newUsed) {
            if (localUsed.indexOf(newUsed[g]) === -1)
              localUsed[tab].push(newUsed[g]);
          }
        }
        else {
          if (localUsed[tab].indexOf(newUsed) === -1)
            localUsed[tab].push(newUsed);
        }
        
        localStorage.setItem('used', JSON.stringify(localUsed));
      },
      'backIndex': function (tab) {
        if (!localStorage.getItem('backIndex')) {
          var biTemp = {
            'all': 0,
            'images': 0,
            'videos': 0,
            'webm': 0
          };
          localStorage.setItem('backIndex', JSON.stringify(biTemp));
        }
        var localIndex = JSON.parse(localStorage.getItem('backIndex'));
        localIndex[tab] = my[tab].backIndex;
        localStorage.setItem('backIndex', JSON.stringify(localIndex));
      }
    },
    updateTab = function (tab, viaSeg) {
      var contentQ = '';
      if (getUrlQueries('content') === 'safe')
        contentQ = '&content=safe';
      if (!viaSeg) {
        $('#tabs input').prop('checked', false);
        $('#tabs input[value="' + tab + '"]').prop('checked', true);
      }
      window.history.pushState('str', 'stache', window.location.protocol + '//' + window.location.host + window.location.pathname + '?tab=' + tab + contentQ);
      if (my[tab].used.length > 0) {
        if (my[tab].backIndex === my[tab].used.length)
          content(tab, 'last');
        else
          content(tab, 'set', JSON.parse(my[tab].used[my[tab].backIndex - 1]));
      }
      else if (my[tab].used.length === 0)
        content(tab, 'new');
      tab = getUrlQueries('tab');
      for (var key in data.files[tab])
        $('#functions #files').append('<option data-index="' + key + '" value="' + data.files[tab][key].url + '" />');
      document.title = 'stache – ' + tab;
    },
    safety = {
      'toggle': function () {
        var
          tab = getUrlQueries('tab'),
          contentQ = ''
        ;
        if (getUrlQueries('content') !== 'safe')
          contentQ = '&content=safe';
        window.history.pushState('str', 'stache', window.location.protocol + '//' + window.location.host + window.location.pathname + '?tab=' + tab + contentQ);
        $('#toggleSafety').toggleClass('checked');
        $('#content :not(span):not(b)').toggle();
        $('#toggleLinks').parent().toggleClass('disabled');
        if ($('#toggleLinks').hasClass('checked')) {
          if (!$('#toggleLinks').parent().hasClass('disabled'))
            $('#links').show();
          else
            $('#links').hide();
        }
      },
      'on': function () {
        var
          tab = getUrlQueries('tab'),
          contentQ = '&content=safe'
        ;
        window.history.pushState('str', 'stache', window.location.protocol + '//' + window.location.host + window.location.pathname + '?tab=' + tab + contentQ);
        $('#toggleSafety').addClass('checked');
        $('#content :not(span):not(b)').hide();
        $('#toggleLinks').parent().addClass('disabled');
      },
      'off': function () {
        var tab = getUrlQueries('tab');
        window.history.pushState('str', 'stache', window.location.protocol + '//' + window.location.host + window.location.pathname + '?tab=' + tab);
        $('#toggleSafety').removeClass('checked');
        $('#content :not(span):not(b)').show();
        $('#toggleLinks').parent().removeClass('disabled');
      }
    },
    init = function (notFirst) {
      var contentQ = '';
      if (getUrlQueries('content') === 'safe')
        contentQ = '&content=safe';
      if (!location.search)
        window.history.pushState('str', 'stache', document.URL + '?tab=all' + contentQ);
      else if (getUrlQueries('content') === 'safe') {
        if (!getUrlQueries('tab'))
          window.history.pushState('str', 'stache', window.location.protocol + '//' + window.location.host + window.location.pathname + '?tab=all' + contentQ);
        else
          window.history.pushState('str', 'stache', window.location.protocol + '//' + window.location.host + window.location.pathname + '?tab=' + getUrlQueries('tab') + contentQ);
      }
      tab = getUrlQueries('tab');
      if (!notFirst) {
        var localUsedTemp = {
          'images': [],
          'all': [],
          'videos': [],
          'webm': []
        };
        localStorage.setItem('notFirst', true);
        localStorage.setItem('used', JSON.stringify(localUsedTemp));
        localStorage.setItem('totalFilesLen', data.files.all.length);
        updateTab(tab);
      }
      else {
        $('#notLoad').show();
        $.getJSON('./res/settings.json', function (data) {
          if (data.files.all.length !== JSON.parse(localStorage.getItem('totalFilesLen'))) {
            localStorage.clear();
            location.reload(true);
          }
        });
        var localUsed = JSON.parse(localStorage.getItem('used'));
        var localIndex = JSON.parse(localStorage.getItem('backIndex'));
        for (var h in localUsed) {
          my[h].addUsed(localUsed[h]);
          my[h].backIndex = localIndex[h];
        }
        updateTab(tab);
        content(tab, 'set', JSON.parse(my[tab].used[my[tab].backIndex - 1]));
        
        if (localStorage.getItem('over_18'))
          $('#over_18').attr('disabled', 'disabled');
      }
      $('input[type="radio"], input[type="checkbox"], input[type="button"], input[type="submit"], button, .button, a').click(function () { $(this).blur(); });
      $(window).bind("storage", function (e) {
        if (e.originalEvent.newValue === true/* || e.originalEvent.newValue === 'true'*/)
          $('#over_18').attr('disabled', 'disabled');
      });
      if (getUrlQueries('content') === 'safe') {
        $('#toggleSafety').addClass('checked');
        $('#content :not(span):not(b)').hide();
      }
      $('#links').hide();
      contentQ = '';
      $('#tabs label').each(function () { $(this).attr('title', data.files[$(this).prev().val()].length); });
      for (var key in data.files[tab])
        $('#functions #files').append('<option data-index="' + key + '" value="' + data.files[tab][key].url + '" />');
      $('#functions code').each(function () {
        if ($(this).text().length > 1) {
          $(this).css({
            'font-size': '8pt'
          });
        }
        else {
          $(this).css({
            'font-weight': 'lighter'
          });
        }
      });
      parent.focus();
    },
    content = function (tab, dir, index) {
      if (dir === 'new')
        r = my[tab].new();
      else if (dir === 'back')
        r = my[tab].back();
      else if (dir === 'set') {
        if (data.files[tab].length > index)
          r = index;
        else
          r = my[tab].new();
      }
      else if (dir === 'last')
        r = my[tab].used[my[tab].used.length - 1];
      else if (dir === 'first')
        r = my[tab].used[0];
      if ((data.files[tab][r].ext === 'mp4') || (data.files[tab][r].ext === 'webm'))
        $('#content video').unbind();
      if (getUrlQueries('tab') === 'all') {

      }
      else if (getUrlQueries('tab') !== 'all')
        my.all.addUsed(r);
      $('#content').html(data.fileType[data.files[tab][r].ext][0] + '' + data.files[tab][r].url + '' + data.fileType[data.files[tab][r].ext][1]);
      $('#content').append('<br /><span><b>' + r + '</b><i> – </i><a target="_blank" href="' + window.location.protocol + '//' + window.location.host + window.location.pathname + 'media/' + data.files[tab][r].url + '">' + data.files[tab][r].url + '</a></span>');
      updateLS.used(tab, r);
      updateLS.backIndex(tab);
      if ((getUrlQueries('content') === 'safe') || (index === 'hide')) {
        safety.on();
        if (data.files[tab][r].type === 'video')
          $('#content video').attr('muted', 'muted');
      }
    },
    tab = getUrlQueries('tab');
  
  init(JSON.parse(localStorage.getItem('notFirst')));

  $('#tabs label').mouseenter(function () {
    $tab = $(this).prev();
    var
      tabVal = $tab.val(),
      contentQ = ''
    ;
    $tab.click(function (e) {
      if (e.metaKey && $(this).not(':checked')) {
        if (getUrlQueries('content') === 'safe')
          contentQ = '&content=safe';
        window.open(window.location.protocol + '//' + window.location.host + window.location.pathname + '?tab=' + tabVal + contentQ);
        return false;
      }
      else {
        updateTab(tabVal, true);
        return true;
      }
    });
  });
  $('#content video').on('loadedmetadata', function () {
    $(document).keydown(function (e) {
      if (e.which === 32) {
        if ($('#content video')[0].paused)
          $('#content video')[0].play();
        else
          $('#content video')[0].pause();
        return false;
      }
    });

    $('#content video').click(function () {
      if ($(this)[0].paused)
        $(this)[0].play();
      else
        $(this)[0].pause();
    });
});
  $(document).keydown(function (e) {
    var
      tag = e.target.tagName.toLowerCase(),
      tab = getUrlQueries('tab'),
      tabs = []
    ;
    $('#tabs input').each(function () {
      tabs.push($(this).val().trim());
    });
    if ((tag !== 'input') && (tag !== 'textarea')) {
      if (!e.altKey && !e.ctrlKey) {
        if (e.which === 39)
          content(tab, 'new');
        else if (e.which === 37)
          content(tab, 'back');
      }
      else if ((e.ctrlKey || e.altKey) && e.shiftKey && ((e.which === 67) || (e.which === 82))) {
        localStorage.clear();
        location.reload(true);
      }
      else if ((e.ctrlKey || e.altKey) && (e.which === 68))
        $('#functions').toggleClass('active');
      else if ((e.altKey && e.shiftKey) && (e.which === 32))
        safety.toggle();
      else if (e.ctrlKey && e.altKey) {
        if (e.which === 39) {
          if (tabs.indexOf(tab) < tabs.length - 1)
            updateTab(tabs[tabs.indexOf(tab) + 1]);
          else if (tabs.indexOf(tab) === tabs.length - 1)
            updateTab(tabs[0]);
        }
        else if (e.which === 37) {
          if (tabs.indexOf(tab) > 0)
            updateTab(tabs[tabs.indexOf(tab) - 1]);
          else if (tabs.indexOf(tab) === 0)
            updateTab(tabs[tabs.length - 1]);
        }
      }
      else if ((e.ctrlKey || e.altKey) && (typeof JSON.parse(String.fromCharCode(e.which)) === 'number')) {
        var ind = JSON.parse(String.fromCharCode(e.which));
        if ((ind <= tabs.length) && (ind > 0))
          updateTab(tabs[ind - 1]);
      }
      if (getUrlQueries('content') !== 'safe') {
        if (e.which === 27) {
          $('#links').hide();
          $('#toggleLinks').removeClass('checked');
        }
        else if (e.which === 13) {
          $('#links').toggle();
          $('#toggleLinks').toggleClass('checked');
        }
      }
    }
  });
  $('#updateJSON').click(function () {
    $.ajax({
      url : "um/index.php",
      type: "POST",
      data: {},
      success: function () {
        $.getJSON('./res/settings.json', function (data) {
          if (data.files.all.length !== JSON.parse(localStorage.getItem('totalFilesLen'))) {
            localStorage.clear();
            location.reload(true);
          }
        });
      }
    });
  });
  $('#over_18').click(function () {
    if (!localStorage.getItem('over_18')) {
      window.open('http://www.reddit.com/over18', 'reddit.com: over 18?');
      localStorage.setItem('over_18', true);
      $(this).attr('disabled', 'disabled');
    }
  });
  $('#toggleSafety').click(function () {
    safety.toggle();
  });
  $('#toggleLinks').change(function () {
    if ($(this).parent().hasClass('disabled')) {
      $('#links').hide();
      return false;
    }
    else {
      $(this).toggleClass('checked');
      if ($(this).hasClass('checked'))
        $('#links').show();
      else
        $('#links').hide();
    }
  });
  $('#search').submit(function () {
    //content(getUrlQueries('tabs'), 'set', $());
    return false;
  });
  $('#clearData').click(function () {
    localStorage.clear();
    location.reload(true);
  });
});