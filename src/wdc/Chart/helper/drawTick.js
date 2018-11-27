"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drawXtick = drawXtick;
exports.drawYtick = drawYtick;

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function drawXtick(ctx, args) {
  var options = args;
  var textWidth = ctx.measureText(options.format).width;
  var startTime = options.startTime,
      endTime = options.endTime,
      chartAttr = options.chartAttr,
      minOffset = options.minOffset;
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
  ctx.restore();

  for (var i = 1; i < tickCount; i++) {
    ctx.textAlign = "left";

    var timeValue = _moment.default.unix((options.startTime + i * timeDiff) / 1000).format(options.format);

    ctx.fillText(timeValue, x + i * widthInterval - textOffset, y + h + 9);
  }
}

function drawYtick(ctx, args) {
  var options = args;
  var chartAttr = options.chartAttr,
      plots = options.plots,
      maxValue = options.maxValue,
      minValue = options.minValue;
  var x = chartAttr.x,
      y = chartAttr.y,
      w = chartAttr.w,
      h = chartAttr.h;
  var heightInterval = h / plots;
  var tickValue = maxValue;
  ctx.save();

  for (var i = 0; i < plots + 1; i++) {
    ctx.textAlign = "right";
    ctx.fillText(tickValue, x - 2, y + 3 + i * heightInterval);
    tickValue -= maxValue / plots;
  }

  ctx.restore();
}