/**
* Set up constants
*/
console.log(GoogleImageSearch);
var ignore_onend;
var start_timestamp;

/**
* Define queue for recognized words
*/
var keywordsQueue = new Queue()

/**
* Define variable to track word to img progress
*/
word_to_image_inProgress = false;
/**
* Define cubes amount
*/
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
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
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
  displayText("no-speech");
  ignore_onend = true;
  recognition.start()
}
if (event.error == 'audio-capture') {
 console.log('audio-capture');
  ignore_onend = true;
}
if (event.error == 'not-allowed') {
    displayText("ERROR: not-allowed");
  ignore_onend = true;
}
};

// define recognition.onend() method
recognition.onend = function() {
    recognizing = false;
};

// define recognition.onresult() method
recognition.onresult = function(event) {
   var timerBool = false;
   var secCount = setTimeout(function(){
                    timerBool = true;
                      }, 1600);
   var interim_transcript = '';
   var final_transcript = '';
   for (var i = event.resultIndex; i < event.results.length; ++i) {
     if (event.results[i].isFinal || timerBool) {
       final_transcript += event.results[i][0].transcript;
     } else {
       interim_transcript += event.results[i][0].transcript;
     }
   }
   final_transcript = capitalize(final_transcript);


    // capitalize and linebreak recognized speech
    var keywords = linebreak(final_transcript);

    // response to User
    displayText("Recognized:  ", keywords);



    if (keywords != "") {
        // add Recognized keyword to the queue
        keywordsQueue.enqueue(keywords);

        voiceToImg(keywordsQueue.dequeue());
        interim_transcript = "";
    }

    word_to_image_inProgress = false;
};

// define function to display speech recognition response to User
function displayText(recognized) {
     document.querySelector('#mytext').setAttribute('value', recognized);
}

// define function, which searchs for image by keyword
function voiceToImg(keyword) {
    // check if keyword is correct
    if (keyword !="" && keyword !=" " && keyword !="  ") {
        // var params = {
        //     // Request parameters
        //     "q": keyword,
        // };

        // // response to User
        // displayText("Looking for " + keyword + " image...")

        // // call POST method and get images
        // $.ajax({
        //     url: "https://api.cognitive.microsoft.com/bing/v5.0/images/search?" + $.param(params),
        //     beforeSend: function(xhrObj){
        //         // Request headers
        //         xhrObj.setRequestHeader("Content-Type","multipart/form-data");
        //         xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key","d70179a9c38d44cd872e1624f88a8f20");
        //     },
        //     type: "POST",
        //     // Request body
        //     data: "{body}",
        // })

        // // if SUCCESS:
        // .done(function(data) {
        GoogleImageSearch.searchImage(keyword)
        .then((res) => {
            console.log(res); // This will return array of image URLs

            // response to User
            displayText(keyword + "image found")

            // response to User
            setTimeout(displayText("Ready for another image search"), 3000)

            // set up image to activeBox
            activeBox.setAttribute('src', res[0]);
            activeBox.setAttribute('material', 'opacity: 1');

            // stop (if needed) and start again recognition
            // recognizing = true;

        })
        // if fail try again
         .catch(function(data) {
          console.log("ERROR:     ", data)
          displayText("Something went wrong, please, try again")

          // stop (if needed) and start again recognition
          recognition.stop()
          recognition.start()
        });
    }
}

// define linebreak function to correct transcript from speech recognition
var two_line = /\n\n/g;
var one_line = /\n/g;
function linebreak(s) {
  return s.replace(two_line, '<p></p>').replace(one_line, '<br>');
}

// define capitalize function to correct transcript from speech recognition
var first_char = /\S/;
function capitalize(s) {
  return s.replace(first_char, function(m) { return m.toUpperCase(); });
}

// register Cursor and allow it to interact with the boxes
AFRAME.registerComponent('cursor-listener', {
  init: function () {
    var COLORS = ['red', 'green', 'blue'];
    // if Cursor was on box long enough:
    this.el.addEventListener('click', function (evt) {
      // if no img on box
      // if (!activeBox.getAttribute('src')) {
      //     activeBox.setAttribute('material', 'opacity: 0.2');
      // }

      // redefine activeBox to the box Cursor is on right now
      activeBox = this;
      activeBox.setAttribute('material', 'opacity: 0.5');

      // increase opacity to make box stand out
      // if (activeBox.getAttribute('material') !='opacity: 1') {
      //     activeBox.setAttribute('material', 'opacity: 0.5');
      // }

    });
  }
});
