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
        switch (e.data) {
            case "You":
            case "Pause":
                document.getElementById("turn").innerText = e.data;
                break;
            default:
                var data = JSON.parse(e.data);
                console.log(data.topic);
                document.getElementById("image").src = "data:image/png;base64," + data.msg.data;
                break;
        }
    }
    ws.onclose = function(e) {
        document.getElementById("msg").innerText = "Connection End";
    }
    console.log("Setup");
}());

var count = 0;

var linearX = [1, 1, 1, 0, 0, 0, -1, -1, -1, ];

var angleZ = [1, 0, -1, 1, 0, -1, -1, 0, 1, ];

function send(idx) {
    var msg = {
        "op": "publish",
        "topic": "/cmd_vel",
        "msg": {
            angular: {
                x: 0,
                y: 0,
                z: angleZ[idx] * 0.5
            },
            linear: {
                x: linearX[idx] * 0.125,
                y: 0,
                z: 0
            }
        }
    };
    ws.send(JSON.stringify(msg));
}