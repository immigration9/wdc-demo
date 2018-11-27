"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawXplot = drawXplot;
exports.drawYplot = drawYplot;
exports.drawXaxis = drawXaxis;
exports.drawYaxis = drawYaxis;

function drawXplot(ctx, args) {
  var options = args;
  var textWidth = ctx.measureText(options.format).width;
  var startTime = options.startTime,
      endTime = options.endTime,
      chartAttr = options.chartAttr,
      minOffset = options.minOffset,
      xPlotLine = options.xPlotLine;
  var x = chartAttr.x,
      y = chartAttr.y,
      w = chartAttr.w,
      h = chartAttr.h;
  var tickCount = 1;

  while (textWidth * tickCount + minOffset * 2 * tickCount < w) {
    tickCount++;
  }

  var timeDiff = (endTime - startTime) / tickCount;
  var widthInterval = w / tickCount;
  var textOffset = textWidth / 2;
  ctx.save();

  for (var i = 1; i < tickCount; i++) {
    ctx.beginPath();
    ctx.setLineDash([1, 2]);
    ctx.strokeStyle = xPlotLine.color;
    ctx.moveTo(x + i * widthInterval, y);
    ctx.lineTo(x + i * widthInterval, y + h);
    ctx.stroke();
  }

  ctx.restore();
}

function drawYplot(ctx, args) {
  var options = args;
  var chartAttr = options.chartAttr,
      plots = options.plots,
      maxValue = options.maxValue,
      minValue = options.minValue,
      yPlotLine = options.yPlotLine;
  var x = chartAttr.x,
      y = chartAttr.y,
      w = chartAttr.w,
      h = chartAttr.h;
  var heightInterval = h / plots;
  var tickValue = maxValue;
  ctx.save();

  for (var i = 0; i < plots + 1; i++) {
    ctx.beginPath();
    ctx.setLineDash([1, 2]);
    ctx.strokeStyle = yPlotLine.color;
    ctx.moveTo(x, y + i * heightInterval);
    ctx.lineTo(x + w, y + i * heightInterval);
    ctx.stroke();
  }

  ctx.restore();
}

function drawXaxis(ctx, args) {
  var options = args;
  var xAxisLine = options.xAxisLine,
      chartAttr = options.chartAttr;
  var x = chartAttr.x,
      y = chartAttr.y,
      w = chartAttr.w,
      h = chartAttr.h;
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = xAxisLine.color;
  ctx.moveTo(x, y + h);
  ctx.lineTo(x + w, y + h);
  ctx.stroke();
  ctx.restore();
}

function drawYaxis(ctx, args) {
  var options = args;
  var yAxisLine = options.yAxisLine,
      chartAttr = options.chartAttr;
  var x = chartAttr.x,
      y = chartAttr.y,
      w = chartAttr.w,
      h = chartAttr.h;
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = yAxisLine.color;
  ctx.moveTo(x, y);
  ctx.lineTo(x, y + h);
  ctx.stroke();
  ctx.restore();
}