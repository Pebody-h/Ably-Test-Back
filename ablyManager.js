const Ably = require('ably');
const ABLY_API_KEY = process.env.ABLY_API_KEY;

class AblyManager {
    constructor() {
        this.realtime = new Ably.Realtime(ABLY_API_KEY);
        this.channel = this.realtime.channels.get('data-sync');
    }

    publish(messageType, payload) {
        this.channel.publish(messageType, JSON.stringify(payload));
    }
}

module.exports = new AblyManager()
