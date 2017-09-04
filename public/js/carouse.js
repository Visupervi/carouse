/**
 * Created by Administrator on 2017/8/29 0029.
 */
(function () {
  Tools.setSize();
  var config = [
    {
      "width": 400,
      "top": 20,
      "left": 50,
      "opacity": 0.2,
      "zIndex": 2
    },//0
    {
      "width": 600,
      "top": 70,
      "left": 0,
      "opacity": 0.8,
      "zIndex": 3
    },//1
    {
      "width": 800,
      "top": 100,
      "left": 200,
      "opacity": 1,
      "zIndex": 4
    },//2
    {
      width: 600,
      top: 70,
      left: 600,
      opacity: 0.8,
      zIndex: 3
    },//3
    {
      "width": 400,
      "top": 20,
      "left": 750,
      "opacity": 0.2,
      "zIndex": 2
    }//4
  ];//其实就是一个配置单 规定了每张图片的大小位置层级透明度
//  初始化数据
  var oLefet = Tools.getElem(".prev");//向左的箭头
  var oRight = Tools.getElem(".next");//向右的箭头
  var oWrap = Tools.getElem(".wrap");
  var oLis = Tools.getElem("li",oWrap[0]);
  var oArrow = Tools.getElem(".arrow");
  var timer = null;
  var flag = true;
  changePosition();
  function changePosition() {
    for(var i=0 ;i< oLis.length;i++){
      Tools.animate(oLis[i],config[i],function () {
        flag=true;
      });
    }
  }
  oRight[0].addEventListener("click",playnext);
  oLefet[0].addEventListener("click",playpre);
  timer = setInterval(playnext,3000);
  function playnext() {
    if(flag === true){
      //原理就是把数组的最后一个元素添加到数组的最前面
      config.unshift(config.pop());
      changePosition();
      flag = false;
    }
  }
  function playpre() {
    if(flag === true){
      //把数组的第一个元素删除添加到数组的最后面
      config.push(config.shift());
      changePosition();
      flag = false;
    }
  }
  oWrap[0].addEventListener("mouseenter",function () {
    clearInterval(timer);
  });
  oWrap[0].addEventListener("mouseleave",function () {
    timer = setInterval(playnext,3000);
  });
})();