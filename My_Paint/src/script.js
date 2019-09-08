import $ from 'jquery';
import React from 'react';

class Draw extends React.Component
{  
    constructor(props) {
        super(props);
        // Some Function to Set State Parameter
        this.actifSwap = this.actifSwap.bind(this);
        this.setActive = this.setActive.bind(this);
        this.setColor = this.setColor.bind(this);

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.endDrawing = this.endDrawing.bind(this);
        this.onMouseClick = this.onMouseClick.bind(this);
        this.setFill = this.setFill.bind(this);
        this.saveCanvas = this.saveCanvas.bind(this);
    }

    canvas = "";
    ctx = "";
    selectedTool = "none";
    selectedColor = '#000000';
    selectedSize = 3;
    selectedFill = false;
    doubleClick = 0;
    startPos = { X: 0, Y: 0 };
    tmpPosX = "";
    tmpPosY = ""; 
    isDrawing = false;

    onMouseDown({ nativeEvent }) {
        const X = nativeEvent.offsetX;
        const Y = nativeEvent.offsetY;

        if(this.selectedTool !== "none") {
            this.isDrawing = true;
            this.startPos = {X, Y};
            this.ctx.save();
        }
    }

    onMouseClick({ nativeEvent }) {
        const X = nativeEvent.offsetX;
        const Y = nativeEvent.offsetY;
        const currPos = {X, Y};
        if(this.selectedTool === "line") {
            this.doubleClick++;
            this.drawWLine(this.startPos, currPos, this.selectedColor);
        }
        if(this.selectedTool === "square") {
            this.doubleClick++;
            this.drawWSquare(this.startPos, currPos, this.selectedColor);
        }
        if(this.selectedTool === "circle") {
            this.doubleClick++;
            this.drawWCircle(this.startPos, currPos, this.selectedColor);
        }
    }

    onMouseMove({ nativeEvent }) {
        if (this.isDrawing) {
            const X = nativeEvent.offsetX;
            const Y = nativeEvent.offsetY;
            const currPos = {X, Y};
            
            if(this.selectedTool === "pen") 
                this.drawWPen(this.startPos, currPos, this.selectedColor);
            if(this.selectedTool === "eraser")
                this.drawWEraser(this.startPos, currPos);
        }
    }

    drawWPen2(startPos, currPos, selectedColor) {
        this.ctx.beginPath();
        this.ctx.strokeStyle = selectedColor;
        this.ctx.lineWidth = this.selectedSize;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(startPos.X, startPos.Y);
        this.ctx.lineTo(currPos.X, currPos.Y);
        this.ctx.stroke();
        this.startPos = currPos;
    }

    drawWEraser(startPos, currPos) {
        this.ctx.beginPath();
        this.ctx.clearRect(startPos.X, startPos.Y, 25, 25);
        this.ctx.stroke();
        this.startPos = currPos;
    }

    drawWLine(startPos, currPos, selectedColor) {
        if(this.doubleClick === 1) {
            this.ctx.beginPath();
            this.ctx.strokeStyle = selectedColor;
            this.ctx.lineWidth = this.selectedSize;
            this.ctx.lineCap = "round";
            this.ctx.moveTo(startPos.X, startPos.Y);
        }

        if(this.doubleClick === 2) {
            this.ctx.lineTo(currPos.X, currPos.Y);
            this.ctx.stroke();
            this.doubleClick = 0;
        }
    }

    drawWSquare(startPos, currPos, selectedColor) {
        if(this.doubleClick === 1) {
            this.ctx.strokeStyle = selectedColor;
            this.ctx.fillStyle = selectedColor;
            this.ctx.lineWidth = this.selectedSize;
            this.tmpPosX = startPos.X;
            this.tmpPosY = startPos.Y;
        }

        if(this.doubleClick === 2) {
            this.ctx.beginPath();
            this.ctx.rect(this.tmpPosX, this.tmpPosY,  currPos.X - this.tmpPosX ,   currPos.Y - this.tmpPosY);
            (this.selectedFill === true) ? this.ctx.fill() : this.ctx.stroke();
            this.doubleClick = 0;
        }
    }

    drawWCircle(startPos, currPos, selectedColor) {
        if(this.doubleClick === 1) {
            this.ctx.strokeStyle = selectedColor;
            this.ctx.fillStyle = selectedColor;
            this.ctx.lineWidth = this.selectedSize;
            this.tmpPosX = startPos.X;
            this.tmpPosY = startPos.Y;
        }

        if(this.doubleClick === 2) {
            var radius = Math.sqrt((currPos.Y - this.tmpPosY) * (currPos.Y - this.tmpPosY) + (currPos.X - this.tmpPosX) * (currPos.X - this.tmpPosX));
            this.ctx.beginPath();
            this.ctx.lineWidth = this.selectedSize;
            this.ctx.arc(this.tmpPosX, this.tmpPosY, radius, 0, 2 * Math.PI);   
            (this.selectedFill === true) ? this.ctx.fill() : this.ctx.stroke();
            this.doubleClick = 0;
        }
    }

    endDrawing() {
        if (this.isDrawing) {
            this.ctx.closePath();
            this.isDrawing = false;
        }
    }

    drawWPen(startPos, currPos, selectedColor) {
        this.ctx.strokeStyle = selectedColor;
        this.ctx.lineWidth = this.selectedSize;
        this.ctx.beginPath();
        this.ctx.moveTo(startPos.X, startPos.Y);
        this.ctx.lineTo(currPos.X, currPos.Y);
        this.ctx.stroke();
        this.startPos = currPos;
    }


    saveCanvas() {
        if(this.canvas[0] !== undefined) {
            var image = this.canvas[0].toDataURL("image/png").replace("image/png", "image/octet-stream");
            window.location.href=image;
        }
    }

    // Some Functon to Set All Usefull Var
    setActive(nb) {
        this.canvas = $(".board");
        this.ctx = this.canvas[0].getContext('2d');
        this.actifSwap($('.btn')[nb]);
    }

    setSize(nb) { 
        (nb === 0) ? this.selectedSize++ : this.selectedSize--;
    }

    setFill() {
        (this.selectedFill === true) ? this.selectedFill = false : this.selectedFill = true;
    }

    actifSwap(btn) {
        for(let i = 0; i < $('.btn').length; i++) {
            let btnA  = $('.btn');
            $(btnA[i]).removeClass('active');
        }
        $(btn).addClass('active');
        this.selectedTool = $(btn).attr('id');
    }

    setColor() {
        var color = $($('.btn')[5]).val();
        this.selectedColor = color;
    }
}

const DrawCanvas = new Draw();
export default DrawCanvas;
