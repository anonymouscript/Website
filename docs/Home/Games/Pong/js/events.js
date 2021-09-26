class EventEmitter {
    constructor() {
        this.events = {};
    }

    add(event) {
        this.events[event] = []
    }
    bind(event, func, params) {
        this.events[event].append((func, params));
    }
    raise(event) {
        for (e in this.events[event]) {
            e[0](...e[1]);
        }
    }
}


var events