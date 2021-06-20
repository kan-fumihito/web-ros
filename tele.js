var ws;
(function() {
    ws = new WebSocket("ws://18.183.9.119:8080");
    ws.onopen = function(e) {
        document.getElementById("turn").innerText;
        document.getElementById("msg").innerText = "Connection Start";
        var advertise = {
            "op": "advertise",
            "topic": "/cmd_vel",
            "type": "geometry_msgs/Twist",
        };

        ws.send(JSON.stringify(advertise));
    }
    ws.onerror = function(e) {
        document.getElementById("msg").innerText = "Error";
        console.log(e);
    }
    ws.onmessage = function(e) {
        document.getElementById("turn").innerText = e.data;
        console.log(e.data);
    }
    ws.onclose = function(e) {
        document.getElementById("msg").innerText = "Connection End";
    }

    console.log("Setup");
}());

var count = 0;

var lx = [1, 1, 1, 0, 0, 0, -1, -1, -1, ];
/*var ly = [

];
var lz = [

];
var ax = [

];
var ay = [

];*/
var az = [1, 0, -1, 1, 0, -1, -1, 0, 1, ];

function send(idx) {
    /*var msg = {
        angular: {
            x: 1,
            y: 0,
            z: 0
        },
        linear: {
            x: 0,
            y: 0,
            z: 0
        }
    };*/
    var msg = {
        "op": "publish",
        "topic": "/cmd_vel",
        "msg": {
            angular: {
                x: 0,
                y: 0,
                z: az[idx] * 0.25
            },
            linear: {
                x: lx[idx] * 0.125,
                y: 0,
                z: 0
            }
        }
    };
    console.log(idx);
    ws.send(JSON.stringify(msg));
}