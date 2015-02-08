$(function(){
	var board = document.getElementById("board");
	var Context = board.getContext("2d");
	var x = -1, y = -1, moveStep = 5;
	var cubeHeight = 5, cubeWidth = 5;
	var mainMapHeight = $(document).height();
	var mainMapWidth = $(document).width();
	cubeWidth += (mainMapWidth % cubeWidth)/(mainMapWidth / cubeWidth);
	cubeHeight += (mainMapHeight % cubeHeight)/(mainMapHeight / cubeHeight);
	console.log('cube: '+cubeWidth+'*'+cubeHeight);
	var blocksHeightCount=(mainMapHeight / cubeHeight);
	var blocksWidthCount=(mainMapWidth / cubeWidth);
	console.log('count: '+blocksHeightCount+'*'+blocksWidthCount);
	var speed = 80;
	var renderMap = [], renderMapTmp = [];
	var colors = [ "#ecf0f1", "#3498db", "#2ecc71", "#e74c3c", "#ffc40f" ];


	$('body').bind('touchmove', function(e){e.preventDefault();return false;});
	// get click location
	$(board).mousedown(function(event) {
		x = event.pageX - this.offsetLeft;
		y = event.pageY - this.offsetLeft;
		console.log('click: '+x+'*'+y);
		event.preventDefault();
		return false;
	});


	function startNewGame() {
		board.width = mainMapWidth;
		board.height = mainMapHeight;
		for (var i = 0; i < blocksHeightCount; i++) {
			renderMap[i] = [];
			renderMapTmp[i] = [];
			for (var j = 0; j < blocksWidthCount; j++) {
				// renderMap[i][j] = Math.floor((Math.random() * (colors.length - 1)) + 1);
				renderMap[i][j] = 0;
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
					if(Block!=0){
					Context.fillStyle = colors[0];
					Context.fillRect(j * cubeWidth, i * cubeHeight,
							cubeWidth-.4, cubeHeight-.4);
					Context.fillStyle = colors[Block];
					Context.fillRect(j * cubeWidth, i * cubeHeight,
							cubeWidth-.4, cubeHeight-.4);
					}
			}
		}
	}, speed);


	function Rules(){
	// edit renderMap array that is printing blocks 
	//renderMap[col][row]=color[color index];
	//x & y is click location that can use
	//color can change in top
	//loop blocks using blocksHeightCount & blocksWidthCount

		for (var i = 0; i < blocksHeightCount; i++) {
			//renderMap[i][1]=Math.floor((Math.random() * (colors.length - 1)) + 1);
			for (var j = 0; j < blocksWidthCount; j++) {
				//if ((i*j)%5 == 0)continue;
				if (i!=j/2)continue;
				renderMap[i][j]=Math.floor((Math.random() * (colors.length - 1)) + 1);

			}
		}
		for (var j = 0; j < blocksWidthCount; j++) {
			i = Math.pow(j,.7);
			if(i>blocksHeightCount)continue;
			renderMap[Math.round(i)][j]=1;
			i = (Math.sin(j/10)*10)+(blocksHeightCount/2);
			if(i>blocksHeightCount)continue;
			renderMap[Math.round(i)][j]=2;
			i = (1/j)*10+(blocksHeightCount/1.8);
			if(i>blocksHeightCount)continue;
			renderMap[Math.round(i)][j]=3;
		}
	}
		//have fun, hooman
});