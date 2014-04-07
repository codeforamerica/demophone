$(document).ready(function() {
  // set cursor in the right place
  var $dialerInput = $('.dialerInput');
  $dialerInput.focus();

  var start = function(event) {
    event.preventDefault();

    var phoneNumber = $dialerInput.val();
    if (!phoneNumber) return;
    // TODO: additional phone number error checks here

    $('.dialButton').hide();
    $dialerInput.attr('disabled', 'disabled')
    $('.dialerInstructions').css('color', '#B3B3B3').html('Sending texts to:');

    $('.textInput')
      .removeAttr('disabled')
      .attr('placeholder', 'Type text to send.')
      .focus();

    setupTexting(phoneNumber);
  };

  $('.dialButton').click(start)
  $('#dialerForm').submit(start);
});

var setupTexting = function(phoneNumber) {
    // Grab DOM elements
  var $section = $('section');

  // Enable long-polling to get text responses.
  // When we get a text, append and scroll.
  (function poll(){
    $.ajax({ url: "/getResponses", success: function (data){
      var text = data.Body;
      $section.append('<div class="from-them"><p>' + text + '</p></div>')
      $section.append('<div class="clear"></div>');
      $section.animate({ scrollTop: $section.height() });
      $section.removeClass('showBackground');
    }, dataType: 'json', complete: poll, timeout: 30000 });
  })();

  // Hookup events for text sending
  $('#textForm').submit(function(event) {
    event.preventDefault();

    var $textInput = $('.textInput');
    var text = $textInput.val();
    $textInput.val('');

    // Don't send blank texts.
    if (text === '') return;

    $.post('/sendText', {
      to: phoneNumber,
      body: text,
    });

    $section.append('<div class="from-me"><p>' + text + '</p></div>')
    $section.append('<div class="clear"></div>');
    $section.animate({ scrollTop: $section.height() });
    $section.removeClass('showBackground');
  });
};