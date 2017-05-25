// Set up constants
var ignore_onend;
var start_timestamp;

// Define cubes amount
var WIDTH = 5;
var HEIGTH = 5;

// Define cube size
var BOX_SIDE = 5;

// Get scene element
var sceneEl = document.querySelector('a-scene');

// Build front wall of boxes
for (var i = 0; i < HEIGTH; i++) {
    for (var j = 0; j < WIDTH; j++) {
        var aBox = document.createElement('a-box');;
        aBox.setAttribute('id', 'myimg_1');
        aBox.setAttribute('depth', BOX_SIDE);
        aBox.setAttribute('width', BOX_SIDE);
        aBox.setAttribute('height', BOX_SIDE);
        aBox.setAttribute('color', 'white');
        aBox.setAttribute('material', 'opacity: 0.2');
        aBox.setAttribute('position', (-10+j*(BOX_SIDE+2)).toString()+' '+(10-i*(BOX_SIDE+2)).toString()+' 0');
        aBox.setAttribute('cursor-listener');

        sceneEl.appendChild(aBox);
    }
}

// Build right wall of boxes
var sceneEl = document.querySelector('a-scene');
for (var i = 0; i < HEIGTH; i++) {
    for (var j = 0; j < WIDTH; j++) {
        var aBox = document.createElement('a-box');;
        aBox.setAttribute('id', 'myimg_1');
        aBox.setAttribute('depth', BOX_SIDE);
        aBox.setAttribute('width', BOX_SIDE);
        aBox.setAttribute('height', BOX_SIDE);
        aBox.setAttribute('color', 'white');
        aBox.setAttribute('material', 'opacity: 0.2');
        aBox.setAttribute('position', '23 '+(-18+j*(BOX_SIDE+2)).toString()+' '+(5+i*(BOX_SIDE+2)).toString());
        aBox.setAttribute('cursor-listener');

        sceneEl.appendChild(aBox);
    }
}

// Build left wall of boxes
for (var i = 0; i < HEIGTH; i++) {
    for (var j = 0; j < WIDTH; j++) {
        var aBox = document.createElement('a-box');;
        aBox.setAttribute('id', 'myimg_1');
        aBox.setAttribute('depth', BOX_SIDE);
        aBox.setAttribute('width', BOX_SIDE);
        aBox.setAttribute('height', BOX_SIDE);
        aBox.setAttribute('color', 'white');
        aBox.setAttribute('material', 'opacity: 0.2');
        aBox.setAttribute('position', '-15 '+(-18+j*(BOX_SIDE+2)).toString()+' '+(5+i*(BOX_SIDE+2)).toString());
        aBox.setAttribute('cursor-listener');

        sceneEl.appendChild(aBox);
    }
}

// Build ceiling of boxes
for (var i = 0; i < HEIGTH; i++) {
    for (var j = 0; j < WIDTH; j++) {
        var aBox = document.createElement('a-box');;
        aBox.setAttribute('id', 'myimg_1');
        aBox.setAttribute('depth', BOX_SIDE);
        aBox.setAttribute('width', BOX_SIDE);
        aBox.setAttribute('height', BOX_SIDE);
        aBox.setAttribute('color', 'white');
        aBox.setAttribute('material', 'opacity: 0.2');
        aBox.setAttribute('position', (-10+j*(BOX_SIDE+2)).toString()+' ' +((BOX_SIDE+2)*WIDTH/2).toString()+' '+(5+i*(BOX_SIDE+2)).toString());
        aBox.setAttribute('cursor-listener');

        sceneEl.appendChild(aBox);
    }
}

// Set up activeBox
var activeBox = document.getElementById('myimg_1');

// Set up Voice Recognition
var recognition = new webkitSpeechRecognition();

// Set delay before the Voice Recognition Starts
var TIME_BEFORE_RECOGNITION = 1500;

// Set up recognition params
setTimeout(function () {
    var recognizing = true;
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.start();
}, TIME_BEFORE_RECOGNITION);

// define recognition.onstart() method
recognition.onstart = function() {
    recognizing = true;
};

// define recognition.onerror() method
recognition.onerror = function(event) {
if (event.error == 'no-speech') {
  console.log('no-speech');
  displayVoice("no-speech");
  ignore_onend = true;
}
if (event.error == 'audio-capture') {
 console.log('audio-capture');
  ignore_onend = true;
}
if (event.error == 'not-allowed') {
    displayVoice("ERROR: not-allowed");
  ignore_onend = true;
}
};

// define recognition.onend() method
recognition.onend = function() {
    recognizing = false;
};

// define recognition.onresult() method
recognition.onresult = function(event) {
    // stop recognition
    recognizing = false;

    // init variable for speech to string recognition
    var interim_transcript = '';
    for (var i = event.resultIndex; i < event.results.length; ++i) {
            console.log(event.results[i][0].transcript);
            interim_transcript = event.results[i][0].transcript;
    }

    // capitalize recognized speech
    interim_transcript = capitalize(interim_transcript);


    // console.log("SUCCESS RECOGNITION");
    var keywords = linebreak(interim_transcript);
    displayVoice("Recognized:  ", keywords);

    if (keywords != "") {
        // console.log(interim_transcript);
        voiceToImg(keywords);
        interim_transcript = "";
    }

};

function displayVoice(recognized) {
     document.querySelector('#mytext').setAttribute('value', recognized);
}

function voiceToImg(keyword) {
    if (keyword !="" && keyword !=" " && keyword !="  ") {
        var params = {
            // Request parameters
            "q": keyword,
        };

        displayVoice("Looking for " + keyword + " image...")
        $.ajax({
            url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
            beforeSend: function(xhrObj){
                // Request headers
                xhrObj.setRequestHeader("Content-Type","multipart/form-data");
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","9f4e6f80e80c4fe18572c9d93db93f22");
            },
            type: "POST",
            // Request body
            data: "{body}",
        })
        .done(function(data) {
            displayVoice(keyword + "image found")
            setTimeout(displayVoice("Ready for another image search"), 3000)

            activeBox.setAttribute('src', data.value[1].thumbnailUrl);
            activeBox.setAttribute('material', 'opacity: 1');

            recognition.stop()
            recognition.start()
            recognizing = true;

        })
        .fail(function(data) {
          console.log("ERROR:     ", data)
          displayVoice("Something went wrong, please, try again")
          recognition.start()
          recognition.start()
        });
    }
}

var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}


AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var COLORS = ['red', 'green', 'blue'];
    this.el.addEventListener('click', function (evt) {
    //   var randomIndex = Math.floor(Math.random() * COLORS.length);
    //   this.setAttribute('material', 'color', COLORS[randomIndex]);
      if (!activeBox.getAttribute('src')) {
          activeBox.setAttribute('material', 'opacity: 0.2');
      }
      activeBox = this;
      if (activeBox.getAttribute('material') !='opacity: 1') {
          activeBox.setAttribute('material', 'opacity: 0.4');
      }

      // console.log('I was clicked at: ', evt.detail.intersection.point);
    });
  }
});
