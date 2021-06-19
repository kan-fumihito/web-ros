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

    console.log("Setup");
}());

function send() {

}

function send_led() {
    var leds = document.leds.leds;
    var msg = {
        "op": "publish",
        "topic": "/leds",
        "msg": {
            "left_side": leds[0].checked,
            "left_forward": leds[1].checked,
            "right_forward": leds[2].checked,
            "right_side": leds[3].checked,
        }
    };
    console.log(msg);
    ws.send(JSON.stringify(msg));
}

function send_motor() {
    var msg = {
        "op": "call_service",
        "service": "motor_on",
        "args": {},
        "id": "5000"
    };
    console.log(msg);
    ws.send(JSON.stringify(msg));
}

function motor_on() {
    var call = {
        "op": "call_service",
        "service": "motor_on",
        "args": {},
        "id": "5000"
    };
    ws.send(JSON.stringify(call));
}

function motor_on() {
    var call = {
        "op": "call_service",
        "service": "motor_off",
        "args": {},
        "id": "5000"
    };
    ws.send(JSON.stringify(call));
}