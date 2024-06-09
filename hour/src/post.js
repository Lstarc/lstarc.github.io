var myUrl = "https://hour.uxnz.net:6/api/"
var myHeader_json = { 'Content-Type': 'application/json; charset=utf-8' }	// 处理json文件的请求头
var myHeader = { 'Content-Type': 'application/x-www-form-urlencoded' }

// get请求:
function request_get() {
	var httpRequest = new XMLHttpRequest();	// 第一步：建立所需的对象
	httpRequest.open('GET', myUrl, true);	// 第二步：打开连接，将请求参数写在url中
	httpRequest.send();	// 第三步：发送请求，将请求参数写在URL中
	// 获取数据后的处理程序
	httpRequest.onreadystatechange = function () {
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {
			var json = httpRequest.responseText; //获取到json字符串，还需解析
			console.log(json);
		}
	};
}

// post请求：
function request_post(data) {
	var httpRequest = new XMLHttpRequest();//第一步：创建需要的对象
	httpRequest.open('POST', myUrl, true); //第二步：打开连接
	httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");//设置请求头 注：post方式必须设置请求头（在建立连接后设置请求头）
	httpRequest.send(data);//发送请求 将情头体写在send中
	/**
	 * 获取数据后的处理程序
	 */
	httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
			var json = httpRequest.responseText;//获取到服务端返回的数据
			console.log(json);
		}
	};
}

// post方式发送json
function request_postSendJson() {
	var httpRequest = new XMLHttpRequest();	//第一步：创建需要的对象
	httpRequest.open('POST', myUrl, true);	//第二步：打开连接
	/***发送json格式文件必须设置请求头 ；如下 - */
	httpRequest.setRequestHeader("Content-type", "application/json; charset=utf-8");	// 设置请求头,注：post方式必须设置请求头（在建立连接后设置请求头）
	var obj = { "busiCode": "deviceInfo", "x_token": "", "body": { "device_imei": "" } }
	httpRequest.send(JSON.stringify(obj));//发送请求 将json写入send中
	/**
	 * 获取数据后的处理程序
	 */
	httpRequest.onreadystatechange = function () {//请求后的回调接口，可将请求成功后要执行的程序写在其中
		if (httpRequest.readyState == 4 && httpRequest.status == 200) {//验证请求是否发送成功
			var json = httpRequest.responseText;//获取到服务端返回的数据
			console.log(json);
		}
	};
}
