import RTCMultiConnection from "rtcmulticonnection";
import io from "socket.io-client";

window.io = io;

const RTCService = {
	connection: null,
	callbacks: null,
	config: {
		socketURL: "https://rtcmulticonnection.herokuapp.com:443/",
		session: {
			data: true,
		},
		iceServers: [
			{
				urls: [
					"stun:stun.l.google.com:19302",
					"stun:stun1.l.google.com:19302",
					"stun:stun2.l.google.com:19302",
					"stun:stun.l.google.com:19302?transport=udp",
				],
			},
		],
	},
	setup(callbacks) {
		this.connection = new RTCMultiConnection();
		this.connection.socketURL = this.config.socketURL;
		this.connection.session = this.config.session;
		this.connection.iceServers = this.config.iceServers;
		// this.connection.autoCreateMediaElement = false;
		this.connection.enableLogs = false;

		this.callbacks = callbacks;

		this.registerEventHandlers();

		return this;
	},
	registerEventHandlers() {
		// this.connection.onopen = () => {
		// 	console.log("onopen");
		// };
		this.connection.onmessage = (event) => {
			this.handleMessage(event);
		};
	},
	openOrJoin(roomName, joinMessage) {
		this.connection.checkPresence(roomName, (isRoomExist, roomName) => {
			if (isRoomExist === true) {
				this.connection.join(roomName);
				setTimeout(() => {
					this.broadcastMessage(joinMessage);
				}, 1000);
			} else {
				this.connection.open(roomName);
			}
		});
	},
	broadcastMessage(message) {
		this.connection.send(message);
	},
	handleMessage(event) {
		this.callbacks[event.data.type](event.data.payload);
	},
};

export default RTCService;
