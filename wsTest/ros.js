var ws;
(function() {
    ws = new WebSocket("ws://localhost:9090");
    ws.onopen = function(e) {
        document.getElementById("msg").innerText = "Connection Start";
    }
    ws.onerror = function(e) {
        document.getElementById("msg").innerText = "Error";
        console.log(e);
    }
    ws.onclose = function(e) {
        document.getElementById("msg").innerText = "Connection End";
    }
    ws.onmessage = function(ev) {
        document.getElementById("msg").innerText = ev.data;
        console.log(ev.data);
    }

    console.log("Setup");
}());