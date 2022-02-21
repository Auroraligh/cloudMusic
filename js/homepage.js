window.onload = function () {
    var imgList = document.querySelector('.imgList');
    var imgArr = imgList.getElementsByTagName("img");
    imgList.style.width = 540 * imgArr.length + "px";

    var outer = document.getElementById("outer");
    var navDiv = document.querySelector('.navDiv')
    navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth) / 2 + "px";

    var index = 0;
    var allA = navDiv.getElementsByTagName("a");
    allA[index].style.backgroundColor = "#ec4141";
    //图片手动播放
    for (i = 0; i < allA.length; i++) {
        allA[i].num = i;
        allA[i].onmousemove = function () {
            clearInterval(timer);
            index = this.num

            move(imgList, "left", -540 * index, 50, function () {
                autoChange();
            });
            setA(index);
        }

    }
    autoChange();
    //图片自动播放
    var timer;
    function autoChange() {
        timer = setInterval(function () {
            index++;
            index %= imgArr.length;

            move(imgList, "left", -540 * index, 20, function () { setA(index); });
        }, 2000);
    }
    function setA(index) {
        if (index >= imgArr.length - 1) {
            index = 0;
            imgList.style.left = 0;
        }
        for (i = 0; i < allA.length; i++) {
            allA[i].style.backgroundColor = "#e6e6e6";
        }
        allA[index].style.backgroundColor = "#ec4141";


    }

    //创建move函数
    function move(obj, attr, target, speed, callback) {
        clearInterval(obj.timer);
        var current = parseInt(getComputedStyle(obj, null)[attr]);
        if (current > target) {
            speed = -speed;
        }
        obj.timer = setInterval(function () {
            current += speed;
            if (speed < 0 && current < target || speed > 0 && current > target) {
                current = target;
            }
            obj.style[attr] = current + "px";
            if (current == target) {
                clearInterval(obj.timer);
                callback();
            }
        }, 30)
    }


}