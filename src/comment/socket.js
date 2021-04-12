var websock = null;
var global_callback = null;

function initWebSocket() { //初始化weosocket
<<<<<<< HEAD
    //ws地址
    var wsuri = "ws://" + process.env.VUE_APP_BASE_URL + "/syswebsocket";
    websock = new WebSocket(wsuri);
    websock.onmessage = function(e) {
        websocketonmessage(e);
    }
    websock.onclose = function(e) {
        websocketclose(e);
    }
    websock.onopen = function() {
        websocketOpen();
    }

    //连接发生错误的回调方法
    websock.onerror = function() {
        console.log("WebSocket连接发生错误");
    }
=======
	//ws地址
	var wsuri = "ws://" + process.env.VUE_APP_BASE_URL + "/syswebsocket";
	websock = new WebSocket(wsuri);
	websock.onmessage = function(e) {
		websocketonmessage(e);
	}
	websock.onclose = function(e) {
		websocketclose(e);
	}
	websock.onopen = function() {
		websocketOpen();
	}

	//连接发生错误的回调方法
	websock.onerror = function() {
		console.log("WebSocket连接发生错误");
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

// 实际调用的方法
function sendSock(agentData, callback) {
<<<<<<< HEAD
    global_callback = callback;
    if (websock.readyState === websock.OPEN) {
        //若是ws开启状态
        websocketsend(agentData)
    } else if (websock.readyState === websock.CONNECTING) {
        // 若是 正在开启状态，则等待1s后重新调用
        setTimeout(function() {
            sendSock(agentData, callback);
        }, 1000);
    } else {
        // 若未开启 ，则等待1s后重新调用
        setTimeout(function() {
            sendSock(agentData, callback);
        }, 1000);
    }
=======
	global_callback = callback;
	if (websock.readyState === websock.OPEN) {
		//若是ws开启状态
		websocketsend(agentData)
	} else if (websock.readyState === websock.CONNECTING) {
		// 若是 正在开启状态，则等待1s后重新调用
		setTimeout(function() {
			sendSock(agentData, callback);
		}, 1000);
	} else {
		// 若未开启 ，则等待1s后重新调用
		setTimeout(function() {
			sendSock(agentData, callback);
		}, 1000);
	}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

//数据接收
function websocketonmessage(e) {
<<<<<<< HEAD
    global_callback(JSON.parse(e.data));
=======
	global_callback(JSON.parse(e.data));
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

//数据发送
function websocketsend(agentData) {
<<<<<<< HEAD
    websock.send(JSON.stringify(agentData));
=======
	websock.send(JSON.stringify(agentData));
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

//关闭
function websocketclose(e) {
<<<<<<< HEAD
    console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e) {
    console.log("连接成功");
=======
	console.log("connection closed (" + e.code + ")");
}

function websocketOpen(e) {
	console.log("连接成功");
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
}

initWebSocket();

export {
<<<<<<< HEAD
    sendSock
}
=======
	sendSock
}
>>>>>>> c823db4e54d491eefefbdbbe1503b25dd47f1e95
