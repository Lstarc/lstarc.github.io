url = 'https://hour.uxnz.net:6/api/index.php';

function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
	var expires = "expires=" + d.toGMTString();
	document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return "";
}

function login() {
	var username = document.getElementById('username').value;
	var password = document.getElementById('password').value;
	if (username == '' || password == '') {
		alert('请输入账号或密码');
		return;
	}
	axios({
		method: 'post',
		url,
		data: {
			"username": username,
			"password": password,
			"action": "login"
		}
	}).then(function (response) {
		console.log(response);
		if (response.data.login.code == 0) {
			alert('登陆成功');
			setCookie('token', response.data.login.token, 1);
			location.href = './index.html';
		}
		if (response.data.login.code == 2) {
			alert('用户名或密码错误');
		}
		if (response.data.login.code == 3) {
			alert('无效用户名');
		}
	})
}

function login_status() {
	var token = getCookie('token');
	if (token != '') {
		axios({
			method: 'post',
			url,
			data: {
				"token": token
			}
		}).then(function (response) {
			console.log(response);
			if (response.data.login.code == 0) {
				document.getElementById("username").innerHTML = response.data.login.username + ' <a id="exit" href="" onclick="userexit()">退出登陆</a>';
			} else {
				setCookie('token', null, 0);
				location.href = './login.html';
			}
		})
	} else {
		location.href = './login.html';
	}
}
function userexit() {
	setCookie('token', null, 0);
}
function pushhour() {
	var hour = document.getElementById("hour").value;
	var remark = document.getElementById("remark").value;
	if (hour == '') {
		hour = 7.5;
	}
	axios({
		method: "post",
		url,
		data: {
			"token": getCookie("token"),
			"action": "push",
			"date": "today",
			"hour":hour,
			"remark": remark
		}
	}).then(function (response) {
		console.log(response);
		if (response.data.push.code == 0) {
			alert("提交完成");
			hourtext();
		} else {
			alert("失败，错误代码 " + response.data.push.code);
		}
	})
}
function hourtext(){
	axios({
		method:"post",
		url,
		data:{
			"token":getCookie("token"),
			"action":"pull",
			"group":"month",
			"local":"month",
		}
	}).then(function (response) {
		console.log(response);
		if(response.data.pull.code == 0){
			document.getElementById("hourtext").innerHTML = "本月工时："+response.data.pull.data[0].sumhour;
		}
	})
}