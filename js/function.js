/*-----------------------������  Ŀ¼-------------------------------------------
 1.���ݻ�ȡԪ�أ�IE7  IE8����Ҫ���getElementsByClassName()������
    a.���ݻ�ȡ�������
 2.���ݻ�ȡ���޸��ı�����
 3.���ݻ�ȡ������ʽ��Ƕ����ʽ
 4.��ȡԪ���ӽڵ��е�Ԫ�ؽڵ�
 5.�Ҹ�Ԫ���µĵ�һ����Ԫ�ص�Ԫ�ؽڵ�
 6.�Ҹ�Ԫ���µ����һ����Ԫ�ص�Ԫ�ؽڵ�
 7.�ҵ�ǰԪ�ص���һ���ֵ�Ԫ�ػ���һ���ֵ�Ԫ��
 8.���뵽��Ԫ���е����һ��λ��
 ------------------------------------------------------------------------------*/
//1.���ݻ�ȡԪ�أ�IE7  IE8����Ҫ���getElementsByClassName()������
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
//1.a.���ݻ�ȡ�������
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




//2.���ݻ�ȡ���޸��ı�����
function getText(obj,val){
    //�жϵ�ǰ�������������
    if(typeof obj.innerText=="undefined"){
    //����undefinedʱ  ��ǰ�����Ϊ���
        if(val==undefined){
            return obj.textContent;
        }else{
            return obj.textContent=val;
        }
    }else{
    //������undefinedʱ  ��ǰ�����ΪIE
        if(val==undefined){
            return obj.innerText;
        }else{
            return obj.innerText=val;
        }
    }
}


/*3.���ݻ�ȡǶ����ʽ����
*currentStyle         IE�л�ȡ
* getComputedStyle    ff ���ִ�������л�ȡ
*/
function getStyle(obj,attr){
    if(obj.currentStyle){
        return obj.currentStyle[attr];
    }else{
        return getComputedStyle(obj)[attr];
    }
}



/*
4.��ȡԪ���ӽڵ��е�Ԫ�ؽڵ㣨�Ӹ�Ԫ������Ѱ���е��ӽڵ��Ԫ�ؽڵ㣩
child[i].nodeType!=3  �ų��ı��ڵ�
child[i].nodeType!=8  �ų�ע�ͽڵ�
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
* 5.�Ҹ�Ԫ���µĵ�һ����Ԫ�ص�Ԫ�ؽڵ�
*       ͨ��getChilds(obj)[0] ��ȡ��
* */
function getFirstChild(obj){
    //var firstChild=getChilds(obj)[0];
    return getChilds(obj)[0];
}


/*
 * 6.�Ҹ�Ԫ���µ����һ����Ԫ�ص�Ԫ�ؽڵ�
 *       ͨ��getChilds(obj)[getChilds(obj).length-1] ��ȡ��
 * */
function getLastChild(obj){
    var arr=getChilds(obj)
    return arr[arr.length-1];
}
/*
* 7.�ҵ�ǰԪ�ص���һ���ֵ�Ԫ�ػ���һ���ֵ�Ԫ��
* type����ΪnextSibling,previousSibling
*
* */
function getNode(obj,type){
    var next=obj[type];
    if(next==null){//û�е��ú���ʱ���ֵ���null  ����֮����ֵ���undefined
        return;//˵����ǰ��objֵ�����һ���ڵ�
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
* 8.���뵽��Ԫ���е����һ��λ��
* parent ��Ԫ��
* objָ�������Ԫ��
* */
function appendLast(parent,obj){
    parent.appendChild(obj);
}



/*
* 9.���뵽��Ԫ���еĵ�һ��λ����
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
* 10.���뵽��Ԫ����ĳ����Ԫ��֮ǰ
*   newobj �������Ԫ�أ��µ�Ԫ��
*   obj  ĳ����Ԫ��
* */
function appendBefore(newobj,obj){
    var parent=obj.parentNode;
    parent.insertBefore(newobj,obj);
}



/*
* 11.���뵽��Ԫ����ĳ����Ԫ��֮��
*   newobj �������Ԫ�أ��µ�Ԫ��
*   obj  ĳ����Ԫ��
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
