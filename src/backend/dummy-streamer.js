// dummy streaming
var Readable = require('stream').Readable;
var dummyStreamer = {
  stream: null,
  maxIterations: 20,
  currentIterations: 0,
  intervalInst: null,
  paused: false,
  packetInterval: 100,
  packetContent: null, // four byte array
  packetSize: 512,
  start: function(){
    this.setupDummyPacket(this.packetSize);
    console.log(`packets starting`);
    if(this.stream == null) {
      this.stream = new Readable();
      this.stream._read = function noop() {}; // redundant? see update below
    }

    this.intervalInst = this.customSetInterval(function(){
      dummyStreamer.pushPacket(dummyStreamer.packetContent.buffer);
    }, this.packetInterval);
    // this.intervalInst = setInterval(function(){
    //   dummyStreamer.pushPacket(dummyStreamer.packetContent);
    // }, this.packetInterval);
  },
  setupDummyPacket:function(elements){
    this.packetContent = new Float32Array(elements);
    //var myData = [];
    //var myData = [];

    //this kinda worlks
  //   for(var j = 0; j < elements; j++)
  //       this.packetContent[j] = Math.sin(0.01 * j);
  //   }
  //

    var counter = 0;
    // 100 iterations
    var increase = Math.PI * 4 / elements;
    var elNum = 0;
    for ( i = 0; i <= 1; i += (1/elements) ) {
      x = i;
      this.packetContent[elNum] = Math.sin( counter ) / 2.0 + 0.5;
      elNum++;
      counter += increase;
    }

    // for (var i = 0; i < elements; i++) {
    //    // Generate and copy over PCM samples.
    //    this.packetContent[i] = Math.random() * 2.0 - 1.0;
    //    console.log(this.packetContent[i]);
    // }
  },
  pushPacket: function(arrayBuffer) {
    //console.log(`${arrayBuffer}`);
    //var arrayBuffer = Buffer.from(data.buffer); // convert to buffer
    if(arrayBuffer == undefined){
      return;
    } else {
      this.stream.push(Buffer.from(arrayBuffer)); // ensure we have Buffer type object
      //console.log(`pushed packet`);
    }
  },
  setRate: function(rate){
    this.end();
    this.packetInterval = 1000 * (1/rate);
    this.start();
  },
  pause: function(){
    this.paused = true;
    this.end();
    console.log(`readable paused`);
  },
  resume: function(){
    this.paused = false;
    this.start();
  },
  getStream: function(){
    return this.stream;
  },
  end: function(){
    clearTimeout(this.intervalInst.id);
    console.log(`packets stopping`);
  },
  isPaused: function() {
    return this.paused;
  },
  destroy: function() {
    //this.stream.destroy();
    this.stream = null;
  },
  customSetInterval: function (func, time){
    var lastTime = Date.now(),
        lastDelay = time,
        outp = {};

    function tick(){
        func();

        var now = Date.now(),
            dTime = now - lastTime;

        lastTime = now;
        lastDelay = time + lastDelay - dTime;
        outp.id = setTimeout(tick, lastDelay);
    }
    outp.id = setTimeout(tick, time);

    return outp;
  }
};
module.exports = dummyStreamer;
