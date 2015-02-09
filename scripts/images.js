function getImage(imgsrc, callback){
	var img = $( "<img>", {
		src: imgsrc
	});
	var imageMap = new Object();
	img.load(function() {
		var canvas = $('<canvas/>')[0].getContext('2d');
		canvas.width = this.width;
		canvas.height = this.height;
		canvas.drawImage(this, 0, 0, this.width, this.height);
		for(var i = 0;i < this.width;i++){
			imageMap[i] = new Object();
			for(var j = 0;j < this.width;j++){
				var pixelData = canvas.getImageData(j, i, 1, 1).data;
				imageMap[i][j] = rgbToHex(pixelData[0],pixelData[1],pixelData[2],pixelData[3]);
			}
		}
		imageMap['width']=this.width;
		imageMap['height']=this.height;
		callback(imageMap)
	});
}

function drawImage(imageMap,x ,y,oldX,oldY){
	if(imageMap){
		if(typeof oldY !== 'undefined'){
		xtmp = oldX;
		for(var i = 0;i<imageMap['height'];i++){
			if (typeof(renderMap[oldY]) != "undefined")
				for(var j = 0;j<imageMap['width'];j++){
					if (typeof(renderMap[oldY][xtmp]) != "undefined"&&imageMap[i][j])
						renderMap[oldY][xtmp] = background;
					xtmp++;
				}
			oldY++;
			xtmp = oldX;
			}
		}
		xtmp = x;
		for(var i = 0;i<imageMap['height'];i++){
			if (typeof(renderMap[y]) != "undefined")
				for(var j = 0;j<imageMap['width'];j++){
					if (typeof(renderMap[y][xtmp]) != "undefined"&&imageMap[i][j])
						renderMap[y][xtmp] = imageMap[i][j];
					xtmp++;
				}
			y++;
			xtmp = x;
		}
	}
}

function rgbToHex(r, g, b, a) {
	if (r > 255 || g > 255 || b > 255)
		throw "Invalid color component";
	if (a<127)return false;
	var hex = ''+((r << 16) | (g << 8) | b).toString(16);
	while(hex.length<6)
		hex = '0'+hex;
	return '#'+hex;
}
