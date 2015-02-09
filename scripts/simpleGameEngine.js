	var board = document.getElementById("board");
	var Context = board.getContext("2d");
	var x = -1, y = -1, moveStep = 5;
	var cubeHeight = 10, cubeWidth = 10;
	var mainMapHeight = $(document).height();
	var mainMapWidth = $(document).width();
	cubeWidth = Math.floor(cubeWidth+(mainMapWidth % cubeWidth)/(mainMapWidth / cubeWidth));
	cubeHeight = Math.floor(cubeHeight+(mainMapHeight % cubeHeight)/(mainMapHeight / cubeHeight));
	console.log('cube: '+cubeWidth+'*'+cubeHeight);
	var blocksHeightCount=Math.floor(mainMapHeight / cubeHeight);
	var blocksWidthCount=Math.floor(mainMapWidth / cubeWidth);
	console.log('count: '+blocksHeightCount+'*'+blocksWidthCount);
	var speed = 33;
	var renderMap = [], renderMapTmp = [];
	var colors = [ "#3498db", "#2ecc71", "#e74c3c", "#ffc40f" ];
	var background = "#ecf0f1";

$(function(){
	$('body').bind('touchmove', function(e){e.preventDefault();return false;});
	// get click location
	$(board).mousemove(function(event) {
		x = event.pageX - this.offsetLeft;
		y = event.pageY - this.offsetLeft;
		console.log('click: '+x+'*'+y);
		event.preventDefault();
		return false;
	});


	function startNewGame() {
		board.width = mainMapWidth;
		board.height = mainMapHeight;
		renderMap = [];
		for (var i = 0; i < blocksHeightCount; i++) {
			renderMap[i] = [];
			renderMapTmp[i] = [];
			for (var j = 0; j < blocksWidthCount; j++) {
				// renderMap[i][j] = Math.floor((Math.random() * (colors.length - 1)) + 1);
				renderMap[i][j] = background;
				renderMapTmp [i][j] =0;
			}
		}
	}
	setTimeout(startNewGame, 0);

	setInterval(function() {
		Rules();
		for (var i = 0; i < blocksHeightCount; i++) {
			for (var j = 0; j < blocksWidthCount; j++) {
				if (renderMapTmp[i][j]==renderMap[i][j])continue;
					Block = renderMap[i][j];
					renderMapTmp[i][j] = Block;
					if(Block!=background){
					Context.fillStyle = background;
					Context.fillRect(j * cubeWidth, i * cubeHeight,
							cubeWidth, cubeHeight);
					Context.fillStyle = Block;
					Context.fillRect(j * cubeWidth, i * cubeHeight,
							cubeWidth, cubeHeight);
					}else{
						Context.fillStyle = background;
						Context.fillRect(j * cubeWidth, i * cubeHeight,
							cubeWidth, cubeHeight);

					}
			}
		}
	}, speed);

	// static vars
	var movex=0;
	var right=true;
	var tv = false;
	getImage('images/tv.png', function(imageMap){
		tv = imageMap;
	});

	function Rules(){
	// edit renderMap array that is printing blocks 
	//renderMap[col][row]=color[color index];
	//x & y is click location that can use
	//color can change in top
	//loop blocks using blocksHeightCount & blocksWidthCount
	if(right){
		if(movex>blocksWidthCount-tv['width'])
			right=false;
		drawImage(tv,++movex ,0,movex-1,0);
	}else{
		if(movex<0)
			right=true;
		drawImage(tv,--movex ,0,movex+1,0);
	}
	if(x!==-1&&y!==-1){
		renderMap[Math.floor(y/cubeHeight)][Math.floor(x/cubeWidth)]=
			colors[Math.floor((Math.random() * (colors.length - 1)) + 1)];
		x=-1;y=-1;
	}

		for (var i = 0; i < blocksHeightCount; i++) {
			//renderMap[i][1]=Math.floor((Math.random() * (colors.length - 1)) + 1);
			for (var j = 0; j < blocksWidthCount; j++) {
				//if ((i*j)%5 == 0)continue;
				if (i!=j/2)continue;
				renderMap[i][j]=colors[Math.floor((Math.random() * (colors.length - 1)) + 1)];

			}
		}
		for (var j = 0; j < blocksWidthCount; j++) {
			i = Math.pow(j,.7);
			if(i>blocksHeightCount)continue;
			if (typeof(renderMap[Math.round(i)]) != "undefined")
			renderMap[Math.round(i)][j]=colors[0];
			i = (Math.sin(j/10)*10)+(blocksHeightCount/2);
			if(i>blocksHeightCount)continue;
			if (typeof(renderMap[Math.round(i)]) != "undefined")
				renderMap[Math.round(i)][j]=colors[1];
			i = (1/j)*10+(blocksHeightCount/1.8);
			if(i>blocksHeightCount)continue;
			if (typeof(renderMap[Math.round(i)]) != "undefined")
			renderMap[Math.round(i)][j]=colors[2];
		}
	}
		//have fun, hooman
});