/**
 * Created by Administrator on 2017/8/28 0028.
 */
(function () {
  //实现rem响应
  Tools.setSize();
  // 获取carousel
  var outter = Tools.getElem(".carousel");
  // 获取ul和ul下面的li元素
  var inner = Tools.getElem("ul");
  var ulLis = Tools.getElem("li", inner[0]);
  var oOl = Tools.getElem("ol");
  // 动态生成小圆点添加到指定位置
  //使用文档片段
  var oFrag = document.createDocumentFragment();
  for (var i = 0; i < ulLis.length; i++) {
    var li = document.createElement("li");
    if (i === 0) {
      Tools.addClass(li, "active");
    }
    li.innerHTML = i + 1;
    oFrag.appendChild(li);
  }
  oOl[0].appendChild(oFrag);
//  获取ul下面li宽度，动态计算ul的宽度
  var liWidth = Tools.getWH(ulLis[0]);
  var ulWidth = (liWidth.width) * (ulLis.length);
  inner[0].style.width = ulWidth + "px";
  window.addEventListener('resize', function () {
    inner[0].style.height = ulLis[0].offsetHeight + 'px';
    screenWidth = document.documentElement.offsetWidth;
  });
// 先确定当前一张，当前一张的前一张，当前一张的后一张的位置
  var left = ulLis.length - 1;
  var right = 1;
  var now = 0;
  ulLis[now].style.transform = "translateX(0px)";
  ulLis[right].style.transform = "translateX(" + liWidth.width + "px)";
  ulLis[left].style.transform = "translateX(" + -liWidth.width + "px)";
  var timer = setInterval(playNext, 1000);
  //封装上一张下一张函数
  function playNext() {
    left = now;
    now = right;
    right++;
    if (right > ulLis.length - 1) {
      right = 0;
    }
    ulLis[now].style.transition = "transform 0.5s";
    ulLis[right].style.transition = "none";
    ulLis[left].style.transition = "transform 0.5s";//加过度的延迟一定要小于间隔时间

    ulLis[now].style.transform = "translateX(0px)";
    ulLis[right].style.transform = "translateX(" + liWidth.width + "px)";
    ulLis[left].style.transform = "translateX(" + -liWidth.width + "px)";
    setPoint();
  }
  function playPre() {
    right = now;
    now = left;
    left--;
    if (left < 0) {
      left = ulLis.length - 1;
    }
    ulLis[now].style.transition = "transform 0.5s";
    ulLis[right].style.transition = "transform 0.5s";
    ulLis[left].style.transition = "none";
    ulLis[now].style.transform = "translateX(0px)";
    ulLis[right].style.transform = "translateX(" + liWidth.width + "px)";
    ulLis[left].style.transform = "translateX(" + -liWidth.width + "px)";
    setPoint();
  }
//封装touch事件
  var beginPos = 0;
  var endPos = 0;
  var dx = 0;
  var startTime = 0;
  var endTime = 0;
  var time = 0;
  outter[0].addEventListener("touchstart", function (event) {
    clearInterval(timer);
    beginPos = event.changedTouches[0].clientX;
    startTime = Date.now();
    // console.log(startTime);
  });
  outter[0].addEventListener("touchmove", function (event) {
    endPos = event.changedTouches[0].clientX;
    dx = endPos - beginPos;
    ulLis[now].style.transition = "none";
    ulLis[right].style.transition = "none";
    ulLis[left].style.transition = "none";
    // console.log(dx);
    ulLis[now].style.transform = "translateX(" + dx + "px)";
    ulLis[right].style.transform = "translateX(" + (liWidth.width + dx) + "px)";
    ulLis[left].style.transform = "translateX(" + (-liWidth.width + dx) + "px)";
  });
  outter[0].addEventListener("touchend", function (event) {
    endTime = Date.now();
    time = startTime - endTime;
    if (time < 300 && Math.abs(dx) > 100 || Math.abs(dx) > liWidth.width / 2) {
      if (dx > 0) {
        playPre();
      } else {
        playNext();
      }
    } else {
      ulLis[now].style.transition = ".5s";
      ulLis[right].style.transition = ".5s";
      ulLis[left].style.transition = ".5s";
      ulLis[now].style.transform = "translateX(0px)";
      ulLis[right].style.transform = "translateX(" + liWidth.width + "px)";
      ulLis[left].style.transform = "translateX(" + -liWidth.width + "px)";
    }
    // console.log(endTime);
    clearInterval(timer);
    timer = setInterval(playNext, 1000);
  });
  //设置小圆点跟着你顺序转换
  //先获取页面生成的小圆点
  var oLis = Tools.getElem("li", oOl[0]);
  // console.log(oLis);
  function setPoint() {
    for (var i = 0; i < oLis.length; i++) {
      Tools.removeClass(oLis[i], "active");
    }
    Tools.addClass(oLis[now], "active");
  }
})();