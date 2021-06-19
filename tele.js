var ws;
(function() {
    ws = new WebSocket("ws://18.183.9.119:8080");
    ws.onopen = function(e) {
        document.getElementById("turn").innerText;
        document.getElementById("msg").innerText = "Connection Start";

    }
    ws.onerror = function(e) {
        document.getElementById("msg").innerText = "Error";
        console.log(e);
    }
    ws.onmessage = function(e) {
        if (e.data == "You") {
            document.getElementById("turn").innerText = e.data;
            window.setTimeout(function() {
                document.getElementById("turn").innerText = "Pause";
            }, 1000 * 10);
        }
        console.log(e.data);
    }
    ws.onclose = function(e) {
        document.getElementById("msg").innerText = "Connection End";
    }

    console.log("Setup");
}());

var count = 0;

function send() {
    var msg = "Message: " + String(count++);
    ws.send(msg);
}