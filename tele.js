var ws;
var camera = document.getElementById('camera').getContext('2d');
var imgData = camera.createImageData(640, 480);
(function() {
    //ws = new WebSocket("ws://18.183.9.119:8080");
    ws = new WebSocket("ws://10.6.18.130:8080");
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
                var rawData = atob(data.msg.data);
                console.log(data.msg.step);
                for (var i = 0; i < 480; i++) {
                    for (var j = 0; j < 640; j++) {

                        imgData.data[j * 4 + i * imgData.width * 4] = rawData[j * 3 + i * imgData.width * 3];

			imgData.data[1 + j * 4 + i * imgData.width * 4] = rawData[1 + j * 3 + i * imgData.width * 3];

                        imgData.data[2 + j * 4 + i * imgData.width * 4] = rawData[2 + j * 3 + i * imgData.width * 3];

                        imgData.data[3 + j * 4 + i * imgData.width * 4] = 255;

                    }
                }
		console.log(rawData);
     
		blob = new Blob([rawData], {type:'application/octet-stream'});
		a = document.createElement("a");
			a.href=URL.createObjectURL(blob);
			document.body.appendChild(a);
			a.download='image.raw';
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(a.href);

		camera.putImageData(imgData, 0, 0);
		ws.close();
		break;
        }
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
                z: az[idx] * 0.5
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
