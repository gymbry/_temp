/*


$('#autoShuffle input[type="submit"]').click(function () {
  startStop = $(this).attr('name');
});
$('#autoShuffle').submit(function () {alert('form');
  if (startStop === 'start') {
    var increment = $('#time').val();
    var holdIncr = increment;
    if ((increment > 0) && (increment < 10)) {
      $('[name="start"]').hide();
      $('[name="stop"]').show();
      
      autoIncrement = setInterval(function () {
        increment = holdIncr;
        content(tab, 'new');
        if (localStorage.getItem(vidLen))
          increment = vidLen;
      }, increment *= 1000);
      
      $(document).keydown(function (e) {
        if (e.which === 32) {
          clearInterval(autoIncrement);
          $('[name="stop"]').hide();
          $('[name="start"]').show();
        }
      });
    }
  }
  else if (startStop === 'stop') {
    clearInterval(autoIncrement);
    $('[name="stop"]').hide();
    $('[name="start"]').show();
  }
  
  return false;
});


$('.video').click(function () {
  var $_this = $(this).get(0);
  if ($_this.paused)
    $_this.play();
  else if (!$_this.paused)
    $_this.pause();
});


$('#edit').click(function () {
  $('.editable, .links, #save').toggle();
  $(this).toggle();
});
$('#editLinks').submit(function () {
  $('.editable, .links, #save, #edit').toggle();
  var formData = {
    'formData': {
      'reddit': [],
      'tumblr': []
    }
  };
  for (var src in data.links) {
    for (var i = 0; i < document.getElementsByClassName('editable')[0].getElementsByClassName(src)[0].getElementsByClassName('name').length; i++) {
      formData.formData[src].push({
        'name': document.getElementsByClassName('editable')[0].getElementsByClassName(src)[0].getElementsByClassName('name')[i].value,
        'url': document.getElementsByClassName('editable')[0].getElementsByClassName(src)[0].getElementsByClassName('url')[i].value
      });
    }
  }
  console.log(formData);
  $.ajax({
    url: "res/update_links.php",
    type: "POST",
    data: formData,
    success: function() {
      for (var src in data.links) {
        $('#links .links .' + src).html('');
        $('#links .editable .' + src).html('');

        for (var item in data.links[src]) {
          $('#links .links .' + src).append('<li><a href="' + data.links[src][item].url + '">' + data.links[src][item].name + '</a></li>');

          $('#links .editable .' + src).append('<li>' + '<input type="text" name="name" placeholder="name" value="' + data.links[src][item].name + '" />' + '</li><li>' + '<input type="text" name="url" placeholder="name" value="' + data.links[src][item].url + '" />' + '</li>' + '<br />');
        }
      }

      setTimeout(function () {
        alert('Links updated');
      }, 3000);
    }
  });

  return false;
});


*/