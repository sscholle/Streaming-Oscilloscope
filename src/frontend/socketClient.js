var StreamingSocketClient = {
  socket: null,
  packetCount: 0,
  createSocket: function (url, binarytype){

    this.socket = new WebSocket('ws://localhost:8080');
    this.socket.binaryType = 'arraybuffer'; // ensures data is received in correct format
    return this;
  },
  sendMessage: function(msg){
    this.socket.send(msg);
  },
  sendMessageToServer: function(message) {
    this.socket.send(message);
  },
  closeSocket() {
    this.socket.close();
  },
  togglePause() {
    this.socket.send('pause');
  },
  setRate: function(rate) {
    this.socket.send(`rate-${rate}`);
  }
};
