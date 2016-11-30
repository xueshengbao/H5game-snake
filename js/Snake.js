window.onload=function(){
	var box=$("#scene");
	
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 20; j++) {
			var div=$('<div>');
			div.id=i+"-"+j;
			box.appendChild(div)
		};
	};
	var she=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
	for (var i = 0; i < she.length; i++) {
		var obj=$('#'+she[i].x+'-'+she[i].y)
		obj.className='she'
	};
	function getFood(){
		do{
			var x=Math.floor(Math.random()*20);
			var y=Math.floor(Math.random()*20);
		}while(panduan(x,y)){
		
		var obj=$('#'+x+"-"+y);
		obj.className='shiwu';
		return {x:x,y:y}
	    }
	}
	function panduan(a,b){
		for (var i = 0; i < she.length; i++) {
			if(she[i].x==a&&she[i].y==b){
				return true;
			}
		};
		return false;
	}
	var shiwu=getFood();

	$("#user").onclick=function(){
		var fangxiang='you'
		var a;
		var b;
		function run(){
			var jiutou=she[she.length-1];
			if(fangxiang=='you'){
				var newtou=$('#'+jiutou.x+"-"+(jiutou.y+1));
				if(newtou==null||panduan(jiutou.x,jiutou.y+1)){
					alert("game over")
					clearInterval(t);
					return
				}
				a=jiutou.x;
				b=jiutou.y+1;
				newtou.className='she';
				she.push({x:jiutou.x,y:jiutou.y+1});
			}else if(fangxiang=='zuo'){
				var newtou=$('#'+jiutou.x+"-"+(jiutou.y-1));
				if(newtou==null||panduan(jiutou.x,jiutou.y-1)){
					alert("game over")
					clearInterval(t);
					return
				}
				a=jiutou.x;
				b=jiutou.y-1;
				newtou.className='she';
				she.push({x:jiutou.x,y:jiutou.y-1});
				
			}else if(fangxiang=='xia'){
				var newtou=$('#'+(jiutou.x+1)+"-"+jiutou.y);
				if(newtou==null||panduan(jiutou.x+1,jiutou.y)){
					alert("game over")
					clearInterval(t);
					return
				}
				a=jiutou.x+1;
				b=jiutou.y;
				newtou.className='she';
				she.push({x:jiutou.x+1,y:jiutou.y});
			}else if(fangxiang=='shang'){
				var newtou=$('#'+(jiutou.x-1)+"-"+jiutou.y);
				if(newtou==null||panduan(jiutou.x-1,jiutou.y)){
					alert("game over")
					clearInterval(t);
					return
				}
				a=jiutou.x-1;
				b=jiutou.y;
				newtou.className='she';
				she.push({x:jiutou.x-1,y:jiutou.y});
			}
			if(shiwu.x==a&&shiwu.y==b){
				shiwu=getFood()
			}else{
				var shewei=$("#"+she[0].x+'-'+she[0].y)
				shewei.className="";
				she.shift();
			}
			
			
		}
		var t=setInterval(run,200);
		document.onkeydown=function(e){
			var e=e||window.event;
			var nub=e.keyCode;
			if(nub==37){
				if(fangxiang=="you"){
					return
				}
				fangxiang='zuo';
			}else if(nub==38){
				if(fangxiang=="xia"){
					return
				}
				fangxiang='shang';
			}else if(nub==39){
				if(fangxiang=="zuo"){
					return
				}
				fangxiang='you';
			}else if(nub==40){
				if(fangxiang=="shang"){
					return
				}
				fangxiang='xia';
			}
		};
		$("#user1").onclick=function(){
			clearInterval(t);
		}
		$("#user2").onclick=function(){
			t=setInterval(run,200);
		}
		
		$("#user3").onclick=function(){
			window.location.reload();
		}
	}
	
}
