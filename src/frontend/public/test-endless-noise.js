var audioContext =AudioSystem.audioContext;

var bufferSize = 4096;
var myPCMProcessingNode = audioContext.createScriptProcessor(bufferSize, 1, 1);
myPCMProcessingNode.onaudioprocess = function(e) {
  var output = e.outputBuffer.getChannelData(0);
  for (var i = 0; i < bufferSize; i++) {
     // Generate and copy over PCM samples.
     output[i] =Math.random() * 2 - 1;
  }
}
myPCMProcessingNode.connect(audioContext.destination);
myPCMProcessingNode.connect(AudioSystem.scopeNode);
//myPCMProcessingNode.start(0);
