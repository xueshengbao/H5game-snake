// 获取类名的兼容性函数
// 功能 要实现ie低版本里面适配getClass
// ---------------------------------------------- 集合
function getClass(classname,obj){
	// 参数初始化
	var obj=obj||document;
	if(obj.getElementsByClassName){
		return obj.getElementsByClassName(classname);
	}else{
		var arr=[];
		var objs=document.getElementsByTagName('*');
		for(var i=0;i<objs.length;i++){
			if(objs[i].className==classname){
				arr.push(objs[i]);
			}
		}
		return arr;
	}
}
function CheckClass(obj,val){
	var classStr=obj.className;
	var classArr=classStr.split(" ");
	for (var i = 0; i < classArr.length; i++) {
		if(val==classArr[i]){
			return true;
		}
	};
	return false;
}

// ---------------------------------------------- 获取内容
function operateText(obj,val){
	if(val!=undefined){
		if(val.innerText){
			return val.innerText;
		}else{
			return val.textContent;
		}
	}else{
		if(obj.innerText){
			return obj.innerText;
		}else{
			return obj.textContent;
		}
	}
		
}
// ----------------------------------------------获取样式

function getStyle(obj,style){
	if (obj.currentStyle) {
		return obj.currentStyle[style];
	} else{
		return getComputedStyle(obj,null)[style]
	};

}
// ----------------------------------------------    $
function $(val,obj){
	if(typeof val=="string"){
		var obj=obj||document;
		val=val.replace(/^\s*|\s*$/g,'')
		if(val.charAt(0)=="#"){
			return document.getElementById(val.slice(1));
		}else if(val.charAt(0)=="."){
			return getClass(val.slice(1),obj)
		}else if(/^[a-zA-Z][a-zA-Z0-9]{0,10}/.test(val)){
			return obj.getElementsByTagName(val)
		}else if(/^<[a-zA-Z][a-zA-Z0-9]{0,10}>/.test(val)){
			return document.createElement(val.slice(1,-1))
		}
		//  如果是函数
	}else if(typeof val=="function"){
		window.onload=function(){
			val();
		}
	}
}
// ----------------------------------------------选项卡

// bt 选项卡上
// tp 选项卡下

function xxka(bt,tp){
	var bt=bt;
	var tp=tp;
	for (var i = 0; i < bt.length; i++) {
		bt[i].index=i;
		bt[i].onclick=function(){
			for (var i = 0; i < bt.length; i++) {
				bt[i].className='bt';
			};
			bt[this.index].className='bt active';
			for (var i = 0; i < tp.length; i++) {
				tp[i].style.display='none';
				// tp[i].className='tp';
			};
			tp[this.index].style.display='block';
			// tp[this.index].className='tp active';
		};
	};
};


// -------------------------------------------轮播Ⅰ
function lunbo1(tp,lis,box){
	var tp=tp;
	var lis=lis;
	var box=box;
	var n=0;
	var t=setInterval(con,2000);
	function con(){
		n++;
		if(n>=tp.length){
			n=0;
		};
		for (var i = 0; i < tp.length; i++) {
			tp[i].className='tp';
			lis[i].className='lis';
		};  
		tp[n].className='tp active';
		lis[n].className='lis lis-first';
	};
	box.onmouseover=function(){
		clearInterval(t);
	};
    box.onmouseout=function(){
        t=setInterval(con,2000);
    };
    for (var i = 0; i < lis.length; i++) {
    	lis[i].index=i;
    	lis[i].onclick=function(){
	    	for (var i = 0; i < lis.length; i++) {
	    		tp[i].className='tp';
				lis[i].className='lis';
	    	};
	    	tp[this.index].className='tp active';
			lis[this.index].className='lis lis-first';
			n=this.index;
	    };
	};
};



// -------------------------------------------轮播Ⅱ
function lunbao2(box,tp,lis,left,right,time,color,nextColor,mateTime){
	var box=box;
	var tp=tp;
	var lis=lis;
	var left=left;
	var right=right;
	var width=parseInt(getStyle(box,'width'));
	var n=0;
	var next=0;
	var flag=true;
	var t=setInterval(con,time);
	function con(type){
		var type=type||'r';
		if(type=='l'){
			if(!flag){
			return;
			}
			flag=false;
			next=n-1;
			if(next<0){
				next=tp.length-1;
			}
			tp[next].style.left=-width+'px';
			animate(tp[n],{left:width},mateTime);
			animate(tp[next],{left:0},mateTime,function(){
				flag=true;
			})
		}else if(type=='r'){
			if(!flag){
			return;
			}
			flag=false;
			next=n+1;
			if(next>=tp.length){
				next=0;
			}
			tp[next].style.left=width+'px';
			animate(tp[n],{left:-width},mateTime);
			animate(tp[next],{left:0},mateTime,function(){
				flag=true;
			});
		};
		for (var i = 0; i < lis.length; i++) {
			lis[i].style.background=color;
		};lis[next].style.background=nextColor;
		n=next;
	}
	box.onmouseover=function(){
		clearInterval(t);
	}
	box.onmouseout=function(){
		t=setInterval(con,time);
	}
	right.onclick=function(){
		con('r');
	}
	left.onclick=function(){
		con('l');
	}
	for (var i = 0; i < lis.length; i++) {
		lis[i].index=i;
		lis[i].onclick=function(){	  
            if(this.index>n){
              	if(!flag){
				   return;
				}
				flag=false;
              	tp[this.index].style.left=width+'px';
				animate(tp[n],{left:-width},mateTime);
				animate(tp[this.index],{left:0},mateTime,function(){
					flag=true;
				})
            }else if(this.index<n){
              	if(!flag){
				   return;
				};
				flag=false;
          		tp[this.index].style.left=-width+'px';
				animate(tp[n],{left:width},mateTime);
				animate(tp[this.index],{left:0},mateTime,function(){
					flag=true;
				});
            };
              for (var i = 0; i < lis.length; i++) {
				lis[i].style.background=color;
				};lis[this.index].style.background=nextColor;
              n=this.index;
              next=this.index;
		};
	};
};


// 获取子节点

function getChilds(obj,type){
	var type=type||"no"
	var kids=obj.childNodes;
	var arr=[];
	for (var i = 0; i < kids.length; i++) {
		if(type=="no"){
			if(kids[i].nodeType=='1'){
				arr.push(kids[i])
			}
		}else if(type=="yes"){
			if(kids[i].nodeType=='1'||kids[i].nodeType=='3'&&kids[i].nodeValue.replace(/^\s*|\s*$/g,"")){
				arr.push(kids[i])
			}
		}
	};
	return arr;
}

// 取第一个

function getFirst(obj,type){
	var type=type||"no"
	return getChilds(obj,type)[0];
}

// 取最后一个

function getLast(obj,type){
	var type=type||"no"
	var childs=getChilds(obj,type);
	return childs[childs.length-1]
}

// 取第n个

function getNub(obj,n,type){
	var type=type||"no"
	var childs=getChilds(obj,type);
	if(n>childs.length||n<1){
		return false;
	}
	return childs[n-1]
}

// 取下一个兄弟节点

function getNext(obj,type){
	var type=type||"no";
	var next=obj.nextSibling;
	if(next==null){
		return false;
	}if(type=='no'){
		while(next.nodeType=='3'||next.nodeType=='8'){
			next=next.nextSibling;
			if(next==null){
				return false;
			}		
		}
		return  next;
	}else if(type=='yes'){
		while(next.nodeType=='3'&&!next.nodeValue.replace(/^\s*|\s*$/g,"")||next.nodeType=='8'){
			next=next.nextSibling;
			if(next==null){
				return false;
			}		
		}
		return  next;

	}
}

// 获取上一个兄弟节点


function getPrevious(obj,type){
	var type=type||"no";
	var previous=obj.previousSibling;
	if(previous==null){
		return false;
	}
	if(type=='no'){
		while(previous.nodeType=='3'||previous.nodeType=='8'){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}		
		}
		return  previous;
	}else if(type=='yes'){
		while(previous.nodeType=='3'&&!previous.nodeValue.replace(/^\s*|\s*$/g,"")||previous.nodeType=='8'){
			previous=previous.previousSibling;
			if(previous==null){
				return false;
			}		
		}
		return  previous;

	}
}

// 引入页面

function insertBefore(obj,obj2){
	var parent=obj2.parentNode;
	parent.insertBefore(obj,obj2);
}


function insertAfter(obj,obj3){
	var parent=obj3.parentNode;
	var next=getNext(obj3,'yes');
	if(!next){
		parent.appendChild(obj)
	}else{
		parent.insertBefore(obj,next);
	}	
}

   // 轮播三
function lunbo3(lunbo,left,right,box,img,time,mateTime){
	var lunbo=lunbo;
	var left=left;
	var right=right;
	var box=box;
	var img=img;
	var flag=true;
	var width=parseInt(getStyle($('.img')[0],"width"));
	var t=setInterval(con,time)
	function con(){
		if(flag==false){
			return;
		}
		flag=false
		animate(box,{left:-width},mateTime,
			function(){
				var Frist=getFirst(box);
				box.appendChild(Frist);
				box.style.left='0px';
				flag=true;
			});
	}
	lunbo.onmouseover=function(){
		clearInterval(t);
	};
    lunbo.onmouseout=function(){
        t=setInterval(con,time);
    };
    left.onclick=function(){
    	if(flag==false){
			return;
		}
		flag=false
    	var gFirst=getFirst(box);
    	var gLast=getLast(box);
    	insertBefore(gLast,gFirst);
    	box.style.left=-width+'px'
    	animate(box,{left:0},mateTime,function(){
    		flag=true;
    	})
    }
    right.onclick=function(){
   		con() ;	
    }


}

// 事件绑定
                // 添加
function addEvent(obj,event,fun){
	if(obj.attachEvent){
		obj.attachEvent('on'+event,fun)
	}else{
		obj.addEventListener(event,fun,false)
	}
}
                // 删除
function removeEvent(obj,event,fun){
	if(obj.detachEvent){
		obj.detachEvent('on'+event,fun)
	}else{
		obj.removeEventListener(event,fun,false)
	}
}


// 滚轮事件


function mouseWheel(obj,down,up){
	if(obj.attachEvent){
		// IE
		obj.attachEvent("onmousewheel",scrollFn);
	}else if(obj.addEventListener){
		// 谷歌
	obj.addEventListener("mousewheel",scrollFn,false);
	    // 火狐
	obj.addEventListener("DOMMouseScroll",scrollFn,false);
	}
	// 滚轮方向
	function scrollFn(e){
		var e=e||window.event
		if(e.preventDefault){
			e.preventDefault();	
		}else{
			e.returnValue=false;
		}
		        // IE         FF
		var nub=e.wheelDelta||e.detail;
		if(nub==120||nub==-3){
			// 改变thus指针 让this指向obj
			up.call(obj);
		}else if(nub==-120||nub==3){
			down.call(obj);
		}
	}
}

//15.hover
//判断某个元素是否包含有另外一个元素
 function contains (parent,child) {
  if(parent.contains){
     return parent.contains(child) && parent!=child;
  }else{
    return (parent.compareDocumentPosition(child)===20);
  }
 }

//判断鼠标是否真正的从外部移入，或者是真正的移出到外部；
  function checkHover (e,target) {
   if(getEvent(e).type=="mouseover"){
      return !contains(target,getEvent(e).relatedTarget || getEvent(e).fromElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).fromElement)===target)
   }else{
    return !contains(target,getEvent(e).relatedTarget || getEvent(e).toElement)&&
    !((getEvent(e).relatedTarget || getEvent(e).toElement)===target)
    }
  }
//鼠标移入移出事件
/*
  obj   要操作的对象
  overfun   鼠标移入需要处理的函数
  outfun     鼠标移除需要处理的函数
*/
function hover (obj,overfun,outfun) {
    if(overfun){
      obj.onmouseover=function  (e) {
        if(checkHover(e,obj)){
           overfun.call(obj,[e]);
        }
      }
    }
    if(outfun){
      obj.onmouseout=function  (e) {
        if(checkHover(e,obj)){
           outfun.call(obj,[e]);
        }
      }
    }
}
 function getEvent (e) {
      return e||window.event;
 }

function daohan(floor,left,left_lis,color,nextColor){
 	var floor=floor;
	var left=left;
	var left_lis=left_lis;
	var Return=$('.return')[0];
	var Cheight=document.documentElement.clientHeight;
	var now;
	var flag=true;
	var flag1=true;
	for (var i = 0; i < floor.length; i++) {
		floor[i].h=floor[i].offsetTop;
	};
	window.onscroll=function(){
		var obj=document.body.scrollTop?document.body:document.documentElement;
		var top=obj.scrollTop;
		// console.log(top);
		if(top>=floor[0].h-400){
			left.style.display='block';
			var Lheight=left.offsetHeight;
			left.style.top=(Cheight-Lheight)/2+'px';
			if(flag){
				flag=false;
				animate(Top,{height:50},600,function(){
					flag1=true;
				});
			}
			
		} 
		if(top<floor[0].h-400){
			left.style.display='none';
			if(flag1){
				flag1=false;
				animate(Top,{height:0},600,function(){
				flag=true;
				});
			}
			
		}
		for (var i = 0; i < floor.length; i++) {
			floor[i].h=floor[i].offsetTop;
			if(top>=floor[i].h-400){
				for(var j = 0; j< left_lis.length; j++){
					left_lis[j].style.background=color
				}
				left_lis[i].style.background=nextColor
				now=i;
			};
		};
		// 返回顶层
		Return.onclick=function(){
			animate(document.body,{scrollTop:0},400)
    		animate(document.documentElement,{scrollTop:0},400)
		}

    };
    // 点击楼层
    for (var i = 0; i < left_lis.length; i++) {
    	left_lis[i].index=i;
    	left_lis[i].onclick=function(){
    		animate(document.body,{scrollTop:floor[this.index].h},600)
    		animate(document.documentElement,{scrollTop:floor[this.index].h},600)
    		now=this.index;
    	};
    	// 移入移出效果
    	left_lis[i].onmouseover=function(){
    		this.style.background=nextColor
    	}
    	left_lis[i].onmouseout=function(){
    		if(this.index==now){
    			return
    		}
    		this.style.background=color;
    	}
    };
	
}


 // 下拉

 // lis  选项栏选项;
 // ul   下拉框选项;
 // len  下拉框高度;
 // color  移入背景色
 // nextColor  移出背景色
function xiala(lis,ul,len,color,nextColor){
	var lis=lis;
	for (var i=0;i<lis.length;i++){
	    if(i==0){
	            continue;
	    }
	    hover(lis[i],function(){
	        var height=this.offsetHeight;
	        this.style.background=color;
	        var ul=ul;
	        var len=len;   
	        var ulHeight=len*height;
	        animate(ul,{height:ulHeight},500);

	    },function(){
	        var ul=$(".hidden",this)[0];      
	        var that=this
	        animate(ul,{height:0},500,function(){
	            that.style.background=nextColor; 
	        })
	    })
	}
//	设置cookies
function setCookie(attr,value,time){

	if(time==undefined){
		document.cookie=attr+'='+value;
	}else{
		var now=new Date();
		now.setTime(now.getTime()+time*1000);
		document.cookie=attr+'='+value+';expires='+now.toGMTString();
	}
}

function getCookie(val){
	var str=document.cookie;
	var arr=split('; ');
	for(var i=0;i<arr.length;i++){
		var arrValue=arr[i].split('=');
		if(val==arrValue[0]){
			return arrValue[1];
		}
	}
	return false;
}

function delCookie(attr){
	var now=new Date();
	now.setTime(now.getTime()-1);
	document.cookie=attr+'=1;expires='+now.toGMTString();
}





















}