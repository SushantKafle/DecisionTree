
var Canvastable = {

	X: 0,
	Y: 0,
	
	nRows:0,
	nCols:0,
	
	context:-1,
	
	cellWidth:80,
	
	shiftX:0,
	shiftY:0,
	
	selId1:-1,
	selId2:-1,
	
	values:[],
	colName:[],
	
	set: function(size,context){
	
		this.colName=[];
		this.context = context;
		this.nRows = size[0];
		this.nCols = size[1];
		
		for(i=0;i<this.nRows;i++)
		{
			this.values[i]=[];
			for(j=0;j<this.nCols;j++)
			{
				this.values[i][j]=0;
			}
		}
		
		for(j=0;j<this.nCols;j++)
		{
			if(j !=this.nCols-1)
				this.colName.push("Col"+String(j));
			else
				this.colName.push("Class");
		}
		

		
		this.draw();
	},
	
	
	getCNames: function()
	{
		return this.colName;
	},
	clearTable: function(color)
	{
		this.context.fillStyle = color;
		this.context.fillRect(0,0,$("#myCanvas").width(),$("#myCanvas").height());
	},
	
	drawColumnTitle: function()
	{
		for(i=0;i<this.nCols-1;i++)
		{
			drawX = this.shiftX + i* this.cellWidth + this.cellWidth*0.2;
			drawY = this.shiftY - 10;
			
			this.context.fillStyle="#FFAFA0";
			this.context.fillRect(drawX-this.cellWidth*0.2,drawY-20,this.cellWidth-2,28);
			
			this.context.fillStyle="brown";
			this.context.font="20px Arial";
			this.context.fillText(this.colName[i],drawX,drawY);
			
		}
		
		drawX = this.shiftX + (this.nCols-1)* this.cellWidth + this.cellWidth*0.2;
		drawY = this.shiftY - 10;
		
		this.context.fillStyle="#FFFFAA";
		this.context.fillRect(drawX-this.cellWidth*0.2,drawY-20,this.cellWidth-2,28);
			
		this.context.fillStyle="brown";
		this.context.font="20px Arial";
		this.context.fillText( this.colName[i],drawX,drawY);
	},
	
	draw: function(){
		
		this.clearTable("white");
		
		tableWidth = this.nCols * this.cellWidth;
		canvasWidth=$("#myCanvas").attr("width");
		
		this.shiftX = (canvasWidth/2) - (tableWidth/2)
		this.shiftY = 100;
		
		//this.context.fillStyle="red";					
		//this.context.fillRect(this.shiftX-2,this.shiftY-2,this.cellWidth*this.nCols+2,this.cellWidth*this.nRows+2);	
		
		this.drawColumnTitle();	
		
		for(i=0;i<this.nRows;i++)
		{
			for(j=0;j<this.nCols;j++)
			{
				drawX = this.cellWidth*j + this.shiftX;
				drawY = this.cellWidth*i + this.shiftY;
				
				if(i==this.selId1 && j==this.selId2)
				{
					this.context.fillStyle="brown";
				}
				else
					this.context.fillStyle="#A0A0ff";
					
				this.context.fillRect(drawX,drawY,this.cellWidth-2,this.cellWidth-2);
			}
		}
		
		
		this.drawData();
	},
	
	setValue: function(value)
	{
		if(this.selId2 != "col")
			this.values[this.selId1][this.selId2] = value;
		else
			this.colName[this.selId1] = value;
		
		this.draw();
	},
	
	reset: function()
	{
		this.selId1 = -1;
		this.setId2 = -1;
		this.set([2,2],this.context);
		this.draw();
	},
	
	isSelectionActive: function()
	{
		if(this.selId1 != -1 && this.selId2 != -1)
			return true;
			
		return false;
	},
	
	getValues: function()
	{
		return this.values;
	},
	
	drawData: function()
	{
		for(i=0;i<this.nRows;i++)
		{
			for(j=0;j<this.nCols;j++)
			{
				drawX = this.cellWidth*j + this.shiftX + this.cellWidth*0.3;
				drawY = this.cellWidth*i + this.shiftY + this.cellWidth*0.5;;
				
				if(i==this.selId1 && j==this.selId2)
				{
					this.context.fillStyle="white";
				}
				else
					this.context.fillStyle="black";
				
				this.context.font="15px Arial";
					
				this.context.fillText(String(this.values[i][j]),drawX,drawY);
			}
		}
	
	},
	
	getXY: function(event){
		canvas = document.getElementById("myCanvas");
		if(event.offsetX) {
			x = event.offsetX;
			y = event.offsetY;
		}
		else if(event.layerX) {
			x = event.layerX;
			y = event.layerY;
		}
		return [x,y];
	},
	
	check: function(event)
	{
		var canvas = document.getElementById("myCanvas");
		
		xy = this.getXY(event);
		x=xy[0];
		y=xy[1];
		
		
		
		if( x > this.shiftX && x < (this.shiftX+this.nCols*this.cellWidth)
		&&
		y > this.shiftY && y < (this.shiftY+this.nRows*this.cellWidth))
		{
			
			this.selId2 = Math.floor((x-this.shiftX) / this.cellWidth);
			this.selId1 = Math.floor((y-this.shiftY) / this.cellWidth);
			
			this.draw();
		
			return true;
		}
		
		
		
		drawX = this.shiftX + i* this.cellWidth + this.cellWidth*0.2;
		drawY = this.shiftY - 10;
		
		if( x > (this.shiftX) && x < (this.shiftX+this.nCols*this.cellWidth)
		&&
		y > this.shiftY-30 && y < this.shiftY + 30)
		
		{
			this.selId1 = Math.floor((x-this.shiftX) / this.cellWidth);
			this.selId2 = "col";
			
			this.draw();
			
			return true;
		}
		
		this.selId1 = -1;
		this.selId2 = -1;		
		
		this.draw();
		
		return false;
	}
}
