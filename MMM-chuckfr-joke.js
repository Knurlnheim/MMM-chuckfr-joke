/* Magic Mirror
 * Module: MMM-chuck-joke
 *
 * By Christian Handorf (mmm@kodejak.de)
 * MIT Licensed.
 */
Module.register("MMM-chuckfr-joke",{
	// Module config defaults.
	defaults: {
		updateInterval: 300,
		fadeSpeed: 4,
		url: 'https://www.chucknorrisfacts.fr/api/get?data=tri:alea;type:txt;nb:1'
	},

	start: function() {
		Log.info("Starting module: " + this.name);
		this.joke = '';
		this.getJoke();
    this.scheduleUpdate();
	},


		scheduleUpdate: function(delay) {
			var nextLoad = this.config.updateInterval*1000;
			if (typeof delay !== "undefined" && delay >= 0) {
				nextLoad = delay;
			}

			var self = this;
			setInterval(function() {
				self.getJoke();
			}, nextLoad);
		},





	getDom: function() {
		var jokeTxt = this.joke;
		var wrapper = document.createElement("div");
    wrapper.className = "small";
		wrapper.innerHTML = jokeTxt;

		//wrapper.appendChild(joke);

		return wrapper;
	},

	getJoke: function () {
	//	Log.info("Send GET_JOKE");
		this.sendSocketNotification('GET_JOKE', this.config.url);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === "JOKE_RESULT") {
			this.joke = payload;
	//		Log.info("Received " + notification + ":" + payload);
			var fade = this.config.fadeSpeed;
			this.updateDom(fade);
		}
	},

});
