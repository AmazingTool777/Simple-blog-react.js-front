// API network config
const apiConfig = {
	host: "localhost",
	port: 5000,
	domain: null,
	protocol: "http",
	URL: "",
};

// Getter for the URL
Object.defineProperty(apiConfig, "URL", {
	get: function () {
		return this.protocol + "://" + (this.domain ? this.domain : `${this.host}:${this.port}`) + "/api";
	},
});

export default apiConfig;
