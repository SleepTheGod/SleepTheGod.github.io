$(document).ready(function () {

  function second_passed() {
    $('.clock').removeClass('is-off');
  }
  setTimeout(second_passed, 2000)

  $('.switcher').on('click', function (e) {
    e.preventDefault();
    $('.screen').toggleClass('glitch');
  });

  // Update time to 24-hour format
  var newDate = new Date();
  newDate.setDate(newDate.getDate());

  setInterval(function () {

    var hours = new Date().getHours();
    var minutes = new Date().getMinutes();
    var seconds = new Date().getSeconds();

    // Update time string with 24-hour format
    var realTime = (hours < 10 ? '0' : '') + hours + ':' + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;

    $('.time').html(realTime);
    $('.time').attr('data-time', realTime);

  }, 1000);

});
