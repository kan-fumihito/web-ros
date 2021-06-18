var ws;
(function () {
    ws = new WebSocket("ws://192.168.0.20:9090");
    ws.onopen = function (e) {
        document.getElementById("msg").innerText = "Connection Start";
    }
    ws.onerror = function (e) {
        document.getElementById("msg").innerText = "Connection Error";
    }
    ws.onclose = function (e) {
        document.getElementById("msg").innerText = "Connection End";
    }
    console.log("Setup");
}());

function send_led() {
    var leds = document.leds.leds;
    var msg = {
        "op": "publish",
        "topic": "leds",
        "msg": {
            "left_side": leds[0].checked ? 1 : 0,
            "left_forward": leds[1].checked ? 1 : 0,
            "right_forward": leds[2].checked ? 1 : 0,
            "right_side": leds[3].checked ? 1 : 0,
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

function motor_on(){
    var call = {
        "op": "call_service",
        "service": "motor_on",
        "args": {},
        "id": "5000"
    };   
    ws.send(JSON.stringify(call));
}

function motor_on(){
    var call = {
        "op": "call_service",
        "service": "motor_off",
        "args": {},
        "id": "5000"
    };   
    ws.send(JSON.stringify(call));
}
