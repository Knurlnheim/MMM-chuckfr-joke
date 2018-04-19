var NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    console.log('MMM-chuckfr-joke helper started...');
  },

  getJoke: function (url) {
      var self = this;

      request({ url: url, method: 'GET' }, function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var temp = body.replace('[','').replace(']','');
            var result = JSON.parse(temp).fact;
            self.sendSocketNotification('JOKE_RESULT', result);
    //        console.log('Got' + body);
    //        console.log('Sent' + result);
          }
      });

  },

  //Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    if (notification === 'GET_JOKE') {
  //    console.log('Got GET_JOKE');
      this.getJoke(payload);
    }
  }

});
