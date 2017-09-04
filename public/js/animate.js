/**
 * Created by Administrator on 2017/8/28 0028.
 */
(function () {
  Tools.setSize();
  var timer = null;
  var num = 0;
  var square = 0;
  var oLeft = Tools.getElem(".left");
  var oRight = Tools.getElem(".right");
  var arrow = Tools.getElem(".arrow");
  console.log(arrow[0]);
  var outter = Tools.getElem(".wrap");
  var WrapWidth = Tools.getWH(outter[0]).width;
  console.log(WrapWidth);
  var inner = Tools.getElem("ul");
  var ulLis = Tools.getElem("li", inner[0]);
  var oOl = Tools.getElem("ol");
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
//  克隆第一张放在最后边
  var firsClone = ulLis[0].cloneNode(true);
  inner[0].appendChild(firsClone);
  //重新计算一下ul的宽度
  var cUlLis = Tools.getElem("li", inner[0]);
  var liWidth = Tools.getWH(cUlLis[0]);
  var ulWidth = (liWidth.width) * (cUlLis.length);
  inner[0].style.width = ulWidth + "px";
  //自动播放
  timer = setInterval(playNext, 1000);
  //实现鼠标划过小方块显示颜色
  var oOlis = Tools.getElem("li", oOl[0]);
  for (var i = 0; i < oOlis.length; i++) {
    oOlis[i].index = i;
    oOlis[i].onmouseover = function () {
      for (var i = 0; i < oOlis.length; i++) {
        oOlis[i].className = "";
      }
      oOlis[this.index].className = "active";
      var target = -this.index * WrapWidth;
      Tools.setPosition(inner[0], target, 10);
      num = this.index;
      square = this.index;
    }
  }
// 对左右箭头进行监听
  oLeft[0].addEventListener("click", function () {
    playPre();
  });
  oRight[0].addEventListener("click", function () {
    playNext();
  });
  //单击小方块对对应相应图片,同时小方块的索引也要同步
  for (var i = 0; i < oOlis.length; i++) {
    oOlis[i].index = i;
    oOlis[i].onclick = function () {
      for (var i = 0; i < oOlis.length; i++) {
        oOlis[i].className = "";
      }
      target = -this.index * WrapWidth;
      Tools.setPosition(inner[0], target, 10);
      this.className = "active";
      num = this.index;
    }
  }
  outter[0].onmouseover = function () {
    clearInterval(timer);
    arrow[0].style.display = "block";
  };
  outter[0].onmouseout = function () {
    arrow[0].style.display = "none";
    timer = setInterval(playNext, 1000);
  };
//  封装向右点击事件
  function playNext() {
    if (num === cUlLis.length - 1) {
      num = 0;
      inner[0].style.left = 0;
    }
    num++;
    target = -num * WrapWidth;
    Tools.setPosition(inner[0], target, 10);
    if (square < oOlis.length - 1) {
      square++;
    } else {
      square = 0;
    }
    for (var i = 0; i < oOlis.length; i++) {
      oOlis[i].className = "";
    }
    oOlis[square].className = "active";
  }

  function playPre() {
    if (num === 0) {
      num = cUlLis.length - 1;
      target = -num * WrapWidth + "px";
      inner[0].style.left = target;
    }
    num--;
    target = -num * WrapWidth;
    Tools.setPosition(inner[0], target, 10);
    if (square > 0) {
      square--;
    } else {
      square = oOlis.length - 1;
    }
    for (var i = 0; i < oOlis.length; i++) {
      oOlis[i].className = "";
    }
    oOlis[square].className = "active";
  }
})();