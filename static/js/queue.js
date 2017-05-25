// queue.js - Array based queue

function Queue(){
  var queue = [], i = 0;

  // Returns true if the queue is empty, else returns false.
  this.isEmpty=function(){ return 0 === queue.length };

  // Returns the length of the queue.
  this.Length=function(){ return queue.length - i };

  // Adds item to the queue
  this.enqueue=function(item){ queue.push(item) };

	// Removes item from the queue if queue is not empty. Else returns NULL
  this.dequeue=function(){

    if (queue.length === 0) return NULL;

    var item = queue[i];

    // Increments the offset and removes the free space if necessary
    if (++ i * 2 >= queue.length){
      queue = queue.slice(i);
      i = 0;
    }

    return item;
    };


  // Returns item on top of queue if queue is not empty. Else returns NULL
  this.peek=function(){ return 0 < queue.length ? queue[i] : NULL}
}
