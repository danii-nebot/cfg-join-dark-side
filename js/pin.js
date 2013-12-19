var images = [
              { url:"images/keep-calm-and-join-the-dark-side.png", height:240 }
              ,{ url:"images/y-u-no-join-the-dark-side.jpg", height:140 }
              ,{ url:"images/darth-vader-join.png", height:308 }
              ,{ url:"images/dark-side-color.jpg", height: 200 }
              ,{ url:"images/darth-vader-hate.jpg", height:310 }
              ,{ url:"images/dark-side-guiness.jpg", height:300 }
              ,{ url:"images/darth-vader-smokes.jpg", height:200 }
              ,{ url:"images/dark-side-thug.png", height:118 }
              ,{ url:"images/join-the-dark-side.jpg", height:283 }
              ,{ url:"images/just-met-you.jpg", height:283 }
              ,{ url:"images/dark-side-cookies.jpg", height:269 }
              ,{ url:"images/stormtrooper-join.png", height:211 }
          ];

var generateImageBoxes = function() {
  var $doc = $(".imgs-container");
  var $bareBox = $("<div class='box'></div>");

  for (var i = 0; i < images.length; i++) {
    var img = images[i];
    $box = $bareBox.clone().css('height', (img.height+24) + 'px')
    $box.html('<img src="'+img.url+'">')
    $doc.append($box);
  }

};

var generateRandomBoxes = function() {
  var $doc = $(".imgs-container");
  var $bareBox = $("<div class='box' style='position:absolute; border:1px solid black; width:250px;'></div>");
  var maxHeight = 500;
  var minHeight = 266;
  var height,
      $box;

  for (var i = 0; i < 100; i++) {
    height = Math.floor(Math.random() * (maxHeight - minHeight + 1)) + minHeight;
    $box = $bareBox.clone().css('height', height + 'px')
    $doc.append($box);
  }
};

var placeBoxes = function() {
  var $boxes = $('.box');
  var screenWidth = $('.container').width();
  var columnWidth = 266;

  // Initialize column array to 0
  var numColumns = Math.floor(screenWidth / columnWidth);
  var columns = [];
  var minIndex,
      $box;

  var offsetLeft = (screenWidth - numColumns*columnWidth)/2;

  while (numColumns--) {
    columns.push(0);
  }

  // Iterate over all the boxes and put it into the smallest column
  for (var i = 0; i < $boxes.length; i++) {
    $box = $($boxes[i]);
    minIndex = 0;

    for (var j = 0; j < columns.length; j++) {
      if (columns[j] < columns[minIndex]) {
        minIndex = j;
      }
    }

    $box.css('left', minIndex * columnWidth + offsetLeft);
    $box.css('top', columns[minIndex]);

    columns[minIndex] += $box.height();
  }
}

$(document).ready(function() {
  generateImageBoxes();
  placeBoxes();
});

$(window).resize(function() {
  placeBoxes();
});