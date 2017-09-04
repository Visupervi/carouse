/**
 * Created by Administrator on 2017/6/24 0024.
 */

(function (window) {
  var Tools = {
    getElem: getElem,//获取元素
    getFirst: getFirst,//获取元素第一个子元素
    getPre: getPre,//获取元素的前一个兄弟节点
    getNext: getNext,//获取元素的下一个兄弟节点
    getLast: getLast,//获取元素的最后一个子节点
    getStyle: getStyle,//获取元素的外联计算样式
    addClass: addClass,//给元素添加类
    arrIndexOf: arrIndexOf,//数组查找
    removeClass: removeClass,//移除一个类
    setScroll: setScroll,//滚动条高度和宽度的获取
    getClientSize: getClientSize,//可视区域的大小
    getDatetoString: getDatetoString,//返回指定格式的日期
    browserRedirect: browserRedirect,//判断设备
    getUrlParams: getUrlParams,//获取path的值，例如:name = "Tom"
    //eventTools:eventTools,//对事件的封装
    animate: animate,//轮播图动画实现函数
    setSize: setSize,//响应式设置rem
    mouseDrop: mouseDrop,//鼠标拖拽事件
    getWH: getWH,//获取元素不带单位的宽度和高度
    setPosition: setPosition,//对轮播图进行封装
    ajax: ajax,//对ajax封装
  };
  //通过标签名，类名，标签名获取元素
  function getElem(selector, parent) {
    parent = parent || document;
    var firstChar = selector.charAt(0);
    if (firstChar === "#") {
      return document.getElementById(selector.substring(1));
    } else if (firstChar === ".") {
      var allEles = parent.getElementsByTagName("*");
      var arr = [];
      for (var i = 0; i < allEles.length; i++) {

        var arrClassName = allEles[i].className.split(" ");
        for (var j = 0; j < arrClassName.length; j++) {
          if (arrClassName[j] == selector.slice(1)) {
            arr.push(allEles[i]);
            break;
          }
        }
      }
      return arr;
    } else {
      return parent.getElementsByTagName(selector);
    }
  }

  //获取元素的第一个子节点
  function getFirst(ele) {
    var firstEle = ele.firstElementChild || ele.firstChild;
    if (!firstEle || firstEle.nodeType != 1) {
      return null;
    } else {
      return firstEle;
    }
  }

  //获取前一个兄弟节点
  function getPre(ele) {
    var prevEle = ele.previousElementSibling || ele.previousSibling;
    if (!prevEle || prevEle.nodeType != 1) {
      return null;
    } else {
      return prevEle;
    }
  }

  //获取后一个兄弟节点
  function getNext(ele) {
    var nextEle = ele.nextElementSibling || ele.nextSibling;
    if (!nextEle || nextEle.nodeType != 1) {
      return null;
    } else {
      return nextEle;
    }
  }

  //获取最后一个元素
  function getLast(ele) {
    var lastEle = ele.lastElementChild || ele.lastChild;
    if (!lastEle || lastEle.nodeType != 1) {
      return null;
    } else {
      return lastEle;
    }
  }

  //获取元素外联样式
  function getStyle(obj, attr) {
    return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
  }

  //获取元素的实际宽度和高度
  function getWH(obj) {
    return {
      width: obj.offsetWidth,
      height: obj.offsetHeight
    }
  }

  //封装了一个添加类的函数
  function addClass(obj, myClass) {
    //如果没有类 使用直接添加类的方式
    if (obj.className == "") {
      obj.className = myClass;
    } else {
      //进来里面 说明 它原来有类
      // 将它的类 转化成数组
      var arrClassName = obj.className.split(" ");
      //调用数组的查找方法 返回索引
      var _index = arrIndexOf(arrClassName, myClass);
      // 判断索引是否为-1 说明没找到 则加进去
      if (_index == -1) {
        obj.className += " " + myClass;
      }
    }
  }

  // 用于数组查找的函数
  function arrIndexOf(arr, myClass) {
    //循环数组 进行比较 如果找到 返回对应下标
    for (var i = 0; i < arr.length; i++) {
      if (arr[i] === myClass) {
        return i;
      }
    }
    // 经过循环 之后说明没找到 则返回-1
    return -1;
  }

  //封装一个移除class的函数
  function removeClass(obj, myClass) {
    if (obj.className != "") {
      // 将标签上的class 转成数组
      var arrClassName = obj.className.split(" ");
      // 调用数组查找方法 返回一个索引
      var _index = arrIndexOf(arrClassName, myClass);//[xixi, gaga, haha, hehe, jiji]
      if (_index != -1) {
        // 如果不等于-1
        // 将类的数组 通过删除方法去删除那一项
        arrClassName.splice(_index, 1);
        // 将删除那一项之后的数组重新通过join方法 转换回字符串 赋给标签的class
        obj.className = arrClassName.join(" ");
      }
    }
  }

  //滚动条高度和宽度的获取
  function setScroll() {
    return {
      scrollTop: document.body.scrollTop ||
      window.pageYOffset ||
      document.documentElement.scrollTop || 0,
      scrollLeft: document.body.scrollLeft ||
      window.pageXOffset ||
      document.documentElement.scrollLeft || 0
    }
  }

  //可视区域的大小
  function getClientSize() {
    return {
      clientX: window.innerWidth ||
      document.body.clientWidth ||
      document.documentElement.clientWidth || 0,
      clientY: window.innerHeight ||
      document.body.clientHeight ||
      document.documentElement.clientHeight || 0
    }
  }

// 返回指定格式的日期
  function getDatetoString(date) {
    var strDate;//存储日期的字符串
    //获取年
    var year = date.getFullYear();
    //获取月
    var month = date.getMonth() + 1;
    //获取日
    var day = date.getDate();
    //获取小时
    var hour = date.getHours();
    //获取分钟
    var minute = date.getMinutes();
    //获取秒
    var second = date.getSeconds();
    hour = hour < 10 ? "0" + hour : hour;
    minute = minute < 10 ? "0" + minute : minute;
    second = second < 10 ? "0" + second : second;
    //拼接
    strDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;//隐藏问题,关于变量声明的位置
    return strDate;
  }

  //判断设备
  function browserRedirect() {
    var sUserAgent = navigator.userAgent.toLowerCase();
    var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
    var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
    var bIsMidp = sUserAgent.match(/midp/i) == "midp";
    var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
    var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
    var bIsAndroid = sUserAgent.match(/android/i) == "android";
    var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
    var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
    /*document.writeln("您的浏览设备为：");*/
    if (bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) {
      /* 链接到不同的网址  这个是手机的 */
      window.location.href = 'http://m.jd.com'
    } else {
      /* 链接到不同的网址  这个是PC的 */
      window.location.href = 'http://www.jd.com'
    }
  }

  //获取path的值，例如:name = "Tom"
  function getUrlParams(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); //定义正则表达式
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return decodeURI(r[2]);
    return null;
  }

  //所有属性都到达目标值之后才能清理定时器
  //封装 能够让 任意对象 的指定属性 变到指定值 的动画函数
  function animate(obj, json, fn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      var flag = true;
      for (var k in json) {
        if (k === "opacity") {//特殊处理
          //var leader = parseInt(getStyle(obj, k)) || 0;
          var leader = getStyle(obj, k) * 100;//1
          // 0 || 1 结果是1 那么如果透明度当前的值是0 就会变成1
          //所以这里不能给默认值 而且也没有必要
          //透明度没有单位px 所以也不用parseInt 参与运算自动变为数字
          var target = json[k] * 100;//0.5
          var step = (target - leader) / 10;//0.5-1=-0.5
          step = step > 0 ? Math.ceil(step) : Math.floor(step);//-1
          leader = leader + step;
          //obj.style[k] = leader + "px";
          obj.style[k] = leader / 100;//opacity没有单位
        } else if (k === "zIndex") {
          obj.style.zIndex = json[k];//无需渐变 直接设置即可
        } else {
          var leader = parseInt(getStyle(obj, k)) || 0;
          var target = json[k];
          var step = (target - leader) / 10;
          step = step > 0 ? Math.ceil(step) : Math.floor(step);
          leader = leader + step;
          obj.style[k] = leader + "px";
        }
        if (leader !== target) {
          flag = false;
        }
      }
      if (flag) {
        clearInterval(obj.timer);
        if (fn) {//如果有才调用
          fn();//动画执行完成后执行
        }
      }
    }, 15);
  }

  function getStyle(obj, attr) {
    if (window.getComputedStyle) {
      return window.getComputedStyle(obj, null)[attr];
    } else {
      return obj.currentStyle[attr];
    }
  }

  //封装rem设置实现响应式
  function setSize() {
    var oHtml = document.documentElement;
    // 获取屏幕的宽度
    var screenWidth = oHtml.offsetWidth;
    // 设计图的宽度，根据自己的设计图去填写
    var uiWidth = 750;
    // 自己设定的html的font值
    var fonts = 40;
    var rate = uiWidth / fonts;
    // 最开始的时候调用一次
    getSize();
    // resize的时候动态监听
    window.addEventListener('resize', getSize);
    function getSize() {
      screenWidth = oHtml.offsetWidth;
      // 如果说屏幕小于320 就限制在320对应的fontsize
      // 如果说大于设计图的宽度，就限制在设计图的宽度
      // 都不满足，就代表在正常的区间里面，就可以自由的动态计算
      if (screenWidth <= 320) {
        oHtml.style.fontSize = 320 / rate + 'px';
      } else if (screenWidth >= uiWidth) {
        oHtml.style.fontSize = uiWidth / rate + 'px';
      } else {
        // 动态设置当前屏幕对应的html的font值
        oHtml.style.fontSize = screenWidth / rate + 'px';
      }
    }
  }

  //对轮播图的移动进行的一个封装
  function setPosition(obj, target, num) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
      var leader = obj.offsetLeft,
        step = num;
      step = obj.offsetLeft < target ? step : -step;
      if (Math.abs(obj.offsetLeft - target) > Math.abs(step)) {
        leader = leader + step;
        obj.style.left = leader + "px";
      } else {
        // leader = leader + step;
        obj.style.left = target + "px";
        clearInterval(obj.timer);
      }
    }, 15);
  }

  //鼠标拖拽事件
  function mouseDrop(argus1, argus2) {//参数1，是整个被拖拽移动的元素，参数2是拖拽区域
    //鼠标在 拖动条上按下的时候可以拖动 鼠标移动的时候 获取鼠标的位置 整个盒子跟着鼠标的位置走
    argus2.onmousedown = function (event) {
      var event = event || window.event;
      var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
      var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
      var spaceX = pageX - argus1.offsetLeft;
      var spaceY = pageY - argus1.offsetTop;
      document.onmousemove = function (event) {
        var event = event || window.event;
        var pageX = event.pageX || event.clientX + document.documentElement.scrollLeft;
        var pageY = event.pageY || event.clientY + document.documentElement.scrollTop;
        argus1.style.left = pageX - spaceX + "px";
        argus1.style.top = pageY - spaceY + "px";
        //清理选中的文字
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();

      }
    };
    document.onmouseup = function () {
      document.onmousemove = null;
    }
  }

  //对ajax进行封装
  function ajax(options) {
    var xhr = new XMLHttpRequest();
    if (options.type.toLocaleString() === "get") {
      options.url = options.url + "?" + params(options.data);
      options.data = null
    } else {
      options.data = params(options.data)
    }
    xhr.open(options.type, options.url);
    if (options.type.toLocaleString() === "post") {
      xhr.setRequestHeader("Content-type','application/x-www-form-urlencoded");
    }
    options.beforeSend && options.beforeSend();
    xhr.send(options.data);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          var data = xhr.responseText;
          options.success && options.success(data);
        } else {
          options.error && options.error(xhr.status);
        }
        options.complete && options.complete();
      }
    }
  }

  function params(options) {
    var str = "";
    for (var attr in options) {
      str += attr + "=" + options[attr] + "&";
    }
    return str.slice(0, -1);
  }

  window.Tools = Tools;
})(window);
