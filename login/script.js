$.getJON('../res/settings.json', function (data) {
  $.ajax({
    url: 'PASSWORD',
    type: 'HEAD',
    error: function() {
      
    },
    success: function(data) {
      pass = unescape(data);
      $('body').append('<p id="tempPass" style="display: none;">' + pass + '</p>');
      pass = $('#tempPass').text().trim();
      $('#tempPass').remove();
    }
  });
});