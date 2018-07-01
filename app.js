var app = {};
app.menuVisible = false;
app.keyCodeESC = 27;

$(function() {
  if ($("body").hasClass("portfolio") || $("body").hasClass("single-page")) app.loadAndFadeInCaseImages();

  // Top menu
  $('.menu').click(function(e) {
    e.preventDefault();
    !app.menuVisible ? app.revealMenu() : app.hideMenu();
  });

  // Hide nav if clicked outside of a menu alternative
  $('.nav').click(function(e) {
    app.hideMenu();
  });
  // Make sure that links don't close the menu
  $('.nav a').click(function(e) {
    e.stopPropagation();
  });

  // Listen to ESC, close menu if visible
  $(document).keyup(function(e) {
    if (e.keyCode == app.keyCodeESC) app.handleESCKey();
  });
});

app.loadAndFadeInCaseImages = function() {
  // Load background images
  $("[data-image]").each(function(i, elem) {
    var $elem = $(elem),
    url = "/images/portfolio/" + $elem.attr('data-image');
    if (url == null || url.length <= 0 ) { return; }

    $elem.addClass('image-loading');
    $('<img/>').attr('src', url).load(function() {
      $(this).remove();
      $bg = $('<div class="case-item-bg"/>');
      $bg.css( 'background-image', 'url(' + url + ')');

      $elem.prepend($bg);
      $elem
        .removeClass('image-loading')
        .addClass('image-ready');
    });
  });
}

app.handleESCKey = function() {
  $(document).trigger("pressed:ESC");
  if (app.menuVisible) app.hideMenu();
}

app.toggleMenuStates = function() {
  $('body').toggleClass('no-scroll');
  $('.menu').toggleClass('menu-active');
  $('.nav').toggleClass('nav-active');
}

app.revealMenu = function() {
  app.menuVisible = true;
  app.toggleMenuStates();

  anime({
    targets:'.menu-animated-background',
    scale: [0.2, 3],
    opacity: [0.2,1],
    easing: "easeInCubic",
    duration: 300
  });

  var containerDelay = 200;
  anime({
    targets:'.js-nav',
    opacity: [0, 1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 200
  });

  var menuItemDelay = 90;
  containerDelay += 75;
  $(".js-nav-header").css("opacity", "0");
  anime({
    targets: ".js-nav-header",
    opacity: [0,1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 200
  });

  $(".js-nav-header-line").css("transform", "scale(0.2)");
  anime({
    targets:'.js-nav-header-line',
    scaleX: [0.28, 1],
    delay: containerDelay,
    easing: "easeInOutExpo",
    duration: 600
  });
  containerDelay += 350;

  $(".js-nav-animate").each(function(i) {
    $(this).css({
      "opacity": "0",
      "transform" : "scale(0.9)"
    });
  });

  anime({
    targets: '.js-nav-animate',
    translateY: ["-7px", 0],
    scale: [0.9, 1],
    opacity: [0, 1],
    delay: function(el, i) {
      return containerDelay + menuItemDelay * (i+1)
    },
    duration: 1100,
    easing: "easeOutExpo",
    complete: function() {
      $(document).trigger("app:menuDidReveal");
    }
  });
}

app.hideMenu = function() {
  app.menuVisible = false;
  app.toggleMenuStates();
  $(document).trigger("app:menuWillHide");

  var containerDelay = 200;
  anime({
    targets: '.menu-animated-background',
    scale: [3,0],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 300
  });

  anime({
    targets:'.js-nav',
    opacity: [1, 0],
    easing: "easeInOutExpo",
    duration: 200
  });

  anime({
    targets:'.js-nav-header-line',
    scale: [1, 0.5],
    easing: "easeInExpo",
    duration: 300
  });

  anime({
    targets: '.js-nav-animate',
    translateY: "10px",
    scale: [1, 0.9],
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 200
  });
}
