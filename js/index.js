window.onload= function () {
    var innerbox=getClass("innerbox")[0];
    var t=setInterval(move,3000);
    var flge=true;
    var index=0;
    function move(){
        if(flge){
            index++;
            if(index>=btns.length){
                index=0;
            }
            flge=false;
            animate(innerbox,{marginLeft:-600},500,Tween.Linear,function(){
                var fir=getFirstChild(innerbox);
                innerbox.appendChild(fir);
                this.style.marginLeft=0;
                flge=true;
            });
                for(var j=0;j<btns.length;j++){
                    btns[j].style.background="#eee";
                    btns[j].style.color="#000";
                }
                btns[index].style.background="darkorange";
                btns[index].style.color="#fff";
        }
    }
    //左右按钮轮播和鼠标放上去停止轮播
    var left=getClass("btn-left")[0];
    var right=getClass("btn-right")[0];
    var flge1=true;
    left.onclick= function () {
        if(flge1){
            flge1=false;
            var num=index;
            num--;
            if(num==-1){
                num=btns.length-1;
            }
            var fir=getFirstChild(innerbox);
            var last=getLastChild(innerbox);
            innerbox.insertBefore(last,fir);
            innerbox.style.marginLeft="-600px";
            animate(innerbox,{marginLeft:0},500,function(){
                flge1=true;
            });
            for(var i=0;i<btns.length;i++){
                for(var j=0;j<btns.length;j++){
                    btns[j].style.background="#eee";
                    btns[j].style.color="#000";
                }
                btns[num].style.background="darkorange";
                btns[num].style.color="#fff";
            }
           index=num;
        }
    };
    right.onclick= function () {
        move();
    };
    left.onmouseover=right.onmouseover=innerbox.onmouseover= function(){
        clearTimeout(t);
    }
    left.onmouseout=right.onmouseout=innerbox.onmouseout= function () {
        t=setInterval(move,3000);
    }
    //圆点按钮轮播
    var btns=getClass("dian");
    var imgs=getClass("imglist");
    for(var i=0;i<btns.length;i++){
        btns[i].index=i;
        btns[i].onclick=function(){
            var next=this.index;
            if(flge) {
                flge = false;
                if (next >= index) {
                    var num = next - index;
                    animate(innerbox, {marginLeft: -600 * num}, 300, function () {
                        for (var j = 0; j < num; j++) {
                            var fir = getFirstChild(innerbox);
                            innerbox.appendChild(fir);
                        }
                        innerbox.style.marginLeft = 0;
                        index = next;
                        flge = true;
                    })
                } else {
                    var num = index - next;
                    flge = false;
                    for (var j = 0; j < num; j++) {
                        var fir = getFirstChild(innerbox);
                        var last = getLastChild(innerbox);
                        innerbox.insertBefore(last, fir);
                        innerbox.style.marginLeft = (-600 * num) + "px";
                    }
                    animate(innerbox, {marginLeft: 0}, 300, function () {
                        index = next;
                        flge = true;
                    })
                }
            }
                for(var i=0;i<btns.length;i++){
                    btns[i].style.background="#eee";
                    btns[i].style.color="#000";
                }
                btns[this.index].style.background="darkorange";
                btns[this.index].style.color="#fff";
        }
    }
}