/*-----------------------函数库  目录-------------------------------------------
 1.兼容获取元素，IE7  IE8（主要解决getElementsByClassName()方法）
    a.兼容获取多个类名
 2.兼容获取和修改文本内容
 3.兼容获取行内样式与嵌入样式
 4.获取元素子节点中的元素节点
 5.找父元素下的第一个子元素的元素节点
 6.找父元素下的最后一个子元素的元素节点
 7.找当前元素的下一个兄弟元素或上一个兄弟元素
 8.插入到父元素中的最后一个位置
 ------------------------------------------------------------------------------*/
//1.兼容获取元素，IE7  IE8（主要解决getElementsByClassName()方法）
    /*function getClass(className,obj){
        var obj1=obj||document;
        if(document.getElementsByClassName){
            return obj1.getElementsByClassName(className);
        }else{
            var tags=obj1.getElementsByTagName("*");
            var arr=[];
            for(var i=0;i<tags.length;i++){
                if(tags[i].className===className){
                    arr.push(tags[i]);
                }
            }
            return arr;
        }
    }*/
//1.a.兼容获取多个类名
function getClass(className,obj){
    var obj1=obj||document;
    if(document.getElementsByClassName){
        return obj1.getElementsByClassName(className);
    }else{
        var tags=obj1.getElementsByTagName("*");
        var arr=[];
        for(var i=0;i<tags.length;i++){
            if(check(tags[i].className,className)){
                arr.push(tags[i]);
            }
        }
        return arr;
    }
}
function check(tagsClassName,className){
    var arr=tagsClassName.split(" ");
    for(var i=0;i<arr.length;i++){
        if(arr[i]==className){
            return true;
        }
    }
    return false;
}




//2.兼容获取和修改文本内容
function getText(obj,val){
    //判断当前的浏览器是哪种
    if(typeof obj.innerText=="undefined"){
    //等于undefined时  当前浏览器为火狐
        if(val==undefined){
            return obj.textContent;
        }else{
            return obj.textContent=val;
        }
    }else{
    //不等于undefined时  当前浏览器为IE
        if(val==undefined){
            return obj.innerText;
        }else{
            return obj.innerText=val;
        }
    }
}


/*3.兼容获取嵌入样式属性
*currentStyle         IE中获取
* getComputedStyle    ff 从现代浏览器中获取
*/
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj)[attr];
    }
}



/*
4.获取元素子节点中的元素节点（从父元素里找寻所有的子节点的元素节点）
child[i].nodeType!=3  排出文本节点
child[i].nodeType!=8  排出注释节点
*/
function getChilds(obj){
    var Childs=obj.childNodes;
    var arr=[];
    for(var i=0;i< Childs.length;i++){
        if(Childs[i].nodeType!=3&&Childs[i].nodeType!=8){
            arr.push(Childs[i]);
        }
    }
    return arr;
}



/*
* 5.找父元素下的第一个子元素的元素节点
*       通过getChilds(obj)[0] 获取到
* */
function getFirstChild(obj){
    //var firstChild=getChilds(obj)[0];
    return getChilds(obj)[0];
}


/*
 * 6.找父元素下的最后一个子元素的元素节点
 *       通过getChilds(obj)[getChilds(obj).length-1] 获取到
 * */
function getLastChild(obj){
    var arr=getChilds(obj)
    return arr[arr.length-1];
}
/*
* 7.找当前元素的下一个兄弟元素或上一个兄弟元素
* type可以为nextSibling,previousSibling
*
* */
function getNode(obj,type){
    var next=obj[type];
    if(next==null){//没有调用函数时出现的是null  调用之后出现的是undefined
        return;//说明当前的obj值是最后一个节点
    }
    while(next.nodeType==3||next.nodeType==8){
        var next=next[type];
        if(next==null){
            return;
        }
    }
    return next;
}


//function getPrevious(obj){
//    var Previous=obj.previousSibling;
//    if(Previous==null){
//        return;
//    }
//    while(Previous.nodeType==3||Previous.nodeType==8){
//        var Previous=Previous.previousSibling;
//        if(Previous==null){
//            return;
//        }
//    }
//    return shang;
//}

/*
* 8.插入到父元素中的最后一个位置
* parent 父元素
* obj指被插入的元素
* */
function appendLast(parent,obj){
    parent.appendChild(obj);
}



/*
* 9.插入到父元素中的第一个位置上
*
* */
function appendFirst(parent,obj){
    var first=getFirstChild(parent);
    if(first==undefined){
        parent.appendChild(obj);
    }else{
        parent.insertBefore(obj,first);
    }
}


/*
* 10.插入到父元素中某个子元素之前
*   newobj 被插入的元素，新的元素
*   obj  某个子元素
* */
function appendBefore(newobj,obj){
    var parent=obj.parentNode;
    parent.insertBefore(newobj,obj);
}



/*
* 11.插入到父元素中某个子元素之后
*   newobj 被插入的元素，新的元素
*   obj  某个子元素
* */
function appendAfter(newobj,obj){
    var next=getNode(obj,nextSibling);
    var parent=obj.parentNode;
    if(next==undefined){
        parent.appendChild(newobj);
    }else{
        parent.insertBefore(newobj,next);
    }
}
