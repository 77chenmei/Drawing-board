(function(doc,win) {
		//判断是 pc端 移动端
		var userAgentInfo = navigator.userAgent; //声明了浏览器用于 HTTP 请求的用户代理头的值
		var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
		var pc = true;
		for(var i = 0;i<Agents.length;i++){
			if(userAgentInfo.indexOf(Agents[i]) > 0){ pc = false;break;} 
			//如何包含数组中的字符串，则表示是手机端登录，不是电脑端登录
		}

		//设置跟字体大小======
		var docEl = doc.documentElement,
			resizeEvt = 'orientationchage' in win ? 'orientationchage' : 'resize', //手机竖屏 横屏之间的切换
			wrap = doc.querySelector('.wrapper'),
			sc = 640 /1008, // 图片宽/高
			reScale = function(){ //事件监听的函数
				if(pc){
					var clientHeight = wrap.clientHeight;
					if(!clientHeight) return; //如果识别可以用clientHeight获取高度就继续，反则不在执行函数
					
					docEl.style.fontSize = 20 * (clientHeight * sc /320) + 'px';

				}else{
					var clientWidth = wrap.clientWidth;
					if(!clientWidth) return;

					docEl.style.fontSize = 20 * (clientWidth / 320) + 'px';
				}

			}; 
	
			if(!doc.addEventListener) return;
			doc.addEventListener(resizeEvt,reScale,false) //监听
			doc.addEventListener('DOMContentLoaded',reScale,false)
	})(document,window)

	
	var ruleBtn = document.getElementsByClassName('rule-btn')[0],
		myLottoBtn = document.getElementsByClassName('my-lotto')[0],
		btnStart = document.getElementsByClassName('btn-start')[0],
		rule = document.querySelector('.rule'),
		cover = document.querySelector('.cover'),
		close = document.querySelectorAll('.close'),
		login = document.querySelector('.login'),
		sub = document.querySelector('.sub'),
		myLotto = document.querySelector('.myLotto'),
		game = document.getElementById('game'),
		lottoBox = document.getElementById('lottoBox')
		upload = document.getElementById('upload')
		lotto = document.getElementById('lotto')
		toolsBOX = document.getElementById('toolsBOX')
		colorList = document.getElementById('colorList'),
		toolColor = document.getElementsByClassName('toolColor')[0];

	window.onload = function() {

		$('#colors_sketch').sketch();
		
		//生成colorList
		var colorArr = ['#f00', '#ffad02', '#0f0', '#0ff', '#00f', '#f0f', '#000'],
			colorLength = colorArr.length,
			fragment = document.createDocumentFragment();
		for(var i = 0 ;i < colorLength;i++){
			var a = document.createElement('a');
			a.style.background = colorArr[i];
			fragment.appendChild(a)
		}
		colorList.appendChild(fragment)

		toolColor.ontouchstart = function() {
			colorList.style.display = 'block';
		}

		var aList = colorList.querySelectorAll('a');
		colorList.addEventListener('touchstart',function(event){
			if(event.target.nodeName  == 'A'){
				for(var i = 0;i< colorLength;i++){
					aList[i].innerHTML = '';
				}
				//event.target.parentNode.children.innerHTML = '';
				event.target.innerHTML = '当前选择';
				setTimeout(function() {
					colorList.style.display = 'none';
				},500)
			}
		})

		var islotto = false, //判断是否有奖品
		islogin = false, //判断是否已登陆
		demo = {
		cover:function(){
			cover.style.display = "block";
		},
		showRule:function(){
			rule.style.display = 'block';
			demo.cover();
		},
		login:function(){
			if(!islogin){
				demo.cover();
				login.style.display = "block";
			}
		},
		showLotto:function(el){
			var lotto = el.querySelectorAll('.lotto');
			if(islotto){
				lotto[0].style.display = "block";
				lotto[1].Style.display = "none";
			}else{
				lotto[1].style.display = "block";
				lotto[0].style.display = "none";
			}
		},
		hide:function(argument) {
			cover.style.display = "none";
			login.style.display = "none";
			myLotto.style.display = "none";
			lottoBox.style.display = "none";
			rule.style.display = "none";
		},
		start:function(){
			demo.hide();
			fadeOut(home,500)
			fadeIn(game,500)
		},
	};

	//点击活动规则
	ruleBtn.ontouchstart= function(){
		demo.showRule();
	}

	//点击我的奖品
	myLottoBtn.ontouchstart = function(){
		myLotto.style.display = "block";
		demo.showLotto(myLotto);
	}

	//点击游戏开始
	btnStart.ontouchstart = function(){
		demo.login();
	}

	//登录提交
	sub.ontouchstart = function() {
		demo.start()
	}

	//提交作品
	upload.ontouchstart = function(argument) {
		toolsBOX.style.display = 'none';
		upload.style.display = 'none';
		lotto.style.display = 'block';
	}

	//参与抽奖
	lotto.ontouchstart = function() {
		lottoBox.style.display = 'block';
		demo.showLotto(lottoBox);
	}

	//点击关闭按钮 
	var length = close.length;
	for(var i = 0;i < length;i++){
		this.index = i;
		close[i].ontouchend = function(){
			demo.hide()
		}
	}

	//封装fadeIn fadeOut 
	function fadeIn(el,time) {
		//获取其opacity
		if(el.style.opacity == ''){
			el.style.opacity = 0;
		}
		if(el.style.display == '' || el.style.display == 'none'){
			el.style.display = 'block';
		} 

		var timer = setInterval(function() {
			if(el.style.opacity < 1){
				el.style.opacity = parseFloat(el.style.opacity) + 0.01;
			}else{
				clearInterval(timer)
			}
		},time/100)
	}

	function fadeOut(el,time) {
		//获取其opacity
		if(el.style.opacity == ''){
			el.style.opacity = 1;
		}
		if(el.style.display == '' || el.style.display == 'block'){
			el.style.display = 'block';
		} 

		var timer = setInterval(function() {
			if(el.style.opacity >0 ){
				el.style.opacity = el.style.opacity - 0.01;
			}else{
				clearInterval(timer)
				el.style.display = 'none';
			}
		},time/100)
	}
	}


	