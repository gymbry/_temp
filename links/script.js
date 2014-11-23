$.getJSON('../res/settings.json', function (data) {
  var ti = 1;
  for (var src in data.links) {
    $('.links .' + src).prev().attr('data-class', src);
    for (var item in data.links[src]) {

      $('.links .' + src).append('<li><a target="_blank" href="' + data.links[src][item].url + '">' + data.links[src][item].title + '</a></li>');

      $('.editable .' + src).append(
        '<li><fieldset>' +
          '<table>' +
            '<tbody>' +
              '<tr>' +
                '<td>' +
                  '<input type="text" class="title" name="title" placeholder="title" value="' + data.links[src][item].title + '" tabindex="' +  (ti + 0) + '" />' +
                '</td>' +
                '<td rowspan="2">' +
                  '<input type="checkbox" name="' + data.links[src][item].title + '" title="remove" class="remove" tabindex="99" />' +
                '</td>' +
              '</tr>' +
              '<tr>' +
                '<td>' +
                  '<input type="text" class="url" name="url" placeholder="url" value="' + data.links[src][item].url + '" tabindex="' +  (ti + 1) + '" />' +
                '</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</fieldset></li>' +
        '<br />'
      );
      ti += 2;
    }
    $('.editable .' + src).append('<input type="button" name="add" class="add" value="+" />');
    $('.editable .' + src).append('<input type="button" name="removeLast" class="removeLast" value="-" />');
  }
  ti -= 2;
  $('input[type="radio"], input[type="button"], input[type="submit"], button, .button, a, summary').click(function () {
    $(this).blur();
    parent.focus();
  });
  $('.delete[type="checkbox"]').change(function () {
    if ($(this).prop('checked'))
      $(this).val(true);
    else
      $(this).val(false);
  });
  $('#edit').click(function () {
    $('.editable, .links, #save, #cancel').toggle();
    $(this).toggle();
  });
  $('#cancel').click(function () {
    $('.editable, .links, #save, #edit').toggle();
    $(this).toggle();
  });
  $('summary').dblclick(function () {
    var src = $(this).attr('data-class');
    if (src === 'reddit') {
      if (!localStorage.getItem('over_18')) {
        localStorage.setItem('over_18', true);
        window.open('http://www.reddit.com/over18', 'reddit.com: over 18?');
      }
      else {
        for (var items in data.links[src])
          window.open(data.links[src][items].url, data.links[src][items].title);
      }
    }
  });
  $('.add').click(function () {
    $(this).before(
      '<li><fieldset class="new">' +
        '<table>' +
          '<tbody>' +
            '<tr>' +
              '<td>' +
                '<input type="text" class="title" name="title" placeholder="title" value="" tabindex="' +  (ti + 1) + '" />' +
              '</td>' +
              '<td rowspan="2">' +
                '<input type="checkbox" name="' + data.links[src][item].title + '" title="remove" class="remove" tabindex="99" />' +
              '</td>' +
            '</tr>' +
            '<tr>' +
              '<td>' +
                '<input type="text" class="url" name="url" placeholder="url" value="" tabindex="' +  (ti + 2) + '" />' +
              '</td>' +
            '</tr>' +
          '</tbody>' +
        '</table>' +
      '</fieldset></li>' +
      '<br />'
    );
    ti += 2;
    /*if ($(this).parents('reddit'))
      alert();*/
  });
  $('#links a').click(function () {
    if (($(this).attr('href').indexOf('imgur') === -1) && (!localStorage.getItem('over_18')) && ($(this).closest('.reddit').length > 0))
      localStorage.setItem('over_18', true);
  });
  $(document).keydown(function (e) {
    var tag = e.target.tagName.toLowerCase();
    if ((tag !== 'input') && (tag !== 'textarea')) {
      if (e.which === 27)
        $('.editable, .links, #save, #edit, #cancel').toggle();
    }
    else {
      if (e.which === 27) {
        $('input').blur();
        parent.focus();
      }
    }
  });
  $('#editLinks').submit(function () {
    $('.editable, .links, #save, #edit, #cancel').toggle();

    var formData = {
      'formData': {
        'reddit': [],
        'tumblr': []
      }
    };
    for (var src in data.links) {
      var
        title = '',
        url = '',
        remove = false
      ;
      for (var i = 0; i < document.getElementsByClassName('editable')[0].getElementsByClassName(src)[0].getElementsByClassName('title').length; i++) {
        title = document.getElementsByClassName('editable')[0].getElementsByClassName(src)[0].getElementsByClassName('title')[i].value.trim();
        url = document.getElementsByClassName('editable')[0].getElementsByClassName(src)[0].getElementsByClassName('url')[i].value.trim();
        remove = JSON.parse(document.getElementsByClassName('editable')[0].getElementsByClassName(src)[0].getElementsByClassName('remove')[i].value.trim());

        var newIndex = document.getElementsByClassName('editable')[0].getElementsByClassName(src)[0].getElementsByTagName('fieldset').className.indexOf('new');
        if (newIndex === i) {

        }
        if ((title === '') || (title === ' ') || !title)
          title = data.links[src][i].title;
        if ((url === '') || (url === ' ') || !url)
          url = data.links[src][i].url;
        formData.formData[src].push({
          'title': title,
          'url': url,
          'remove': remove
        });
      }
    }
    $.ajax({
      url: "update_links.php",
      type: "POST",
      data: formData,
      success: function() {
        setTimeout(function () {
          window.location = document.URL;
        }, 10);
      }
    });
    
    return false;
  });
});