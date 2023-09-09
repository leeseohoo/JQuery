window.onload=function(){
	setCTime();
}
// <현재 시간>
var monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
function setCTime(){
	var now = new Date();
	var s = monthNames[now.getMonth()] +' ' + now.getDate() + ', ' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();
	document.getElementById('ctime').innerHTML = s;
	setTimeout('setCTime()',1000);
}

// mouseover
var i = 0;
$(document).ready(function(){
	$("div.out")
	.mouseover(function(){
		$("p:first",this).text("mouse over");
		$("p:last",this).text(++i);
	})	
	.mouseout(function(){
		$("p:first",this).text("mouse out");
	})

	//main-menu
	$(".main-menu")
	.mouseover(function(){
		$(this).css({"font-size":"20px","background-color":"green"});
	})	
	.mouseout(function(){
		$(this).css({"font-size":"16px","background":"none"});
	})

	// 전체화면
	$("#b1").on("click", 
	{url:"http://www.google.com", 
		winattributes:"resize=1, scrollbars=1, status=1"}, 
		max_open);
	function max_open(event){
		var maxwindow = window.open(event.data.url,"",event.data.winattributes);
		maxwindow.moveTo(0,0);
		maxwindow.resizeTo(screen.availWidth, screen.availHeight);
	}

	// off()
	function flash() {
		$("#off_test").show().fadeOut("slow");
	}
	$("#bind").click(function() {
		$("body")
		.on("click","#theone",flash)
		.find("#theone")
		.text("Can Click!");
	});
	$("#unbind").click(function() {
		$("body")
		.off("click","#theone",flash)
		.find("#theone")
		.text("Does nothing...");
	});

	// trigger()
	$("#trigger_test button:first").click(function() {
		update( $("span:first") );
	});
		$("#trigger_test button:last").click(function() {
		$("#trigger_test button:first").trigger("click");
		update( $("span:last") );
			});
		function update(j) {
			var n = parseInt(j.text(), 10);
			j.text(n + 1);
		}

	// 이미지 변경하기
	$("#image").click(function(){
		var sarray = $("#image").attr("src").split("/");
		var str = sarray[sarray.length-1];
		if(str=="do1.jpg")
			$("#image").attr("src","do2.jpg");
		else
			$("#image").attr("src","do1.jpg");
	});

	// 사진 앨범
	var i=0;
	var imgArray=["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg"];
	var doimg = $("#imgAlbum").attr("src",imgArray[0]);
	$("#imgAlbum").click(function() {
		i++;
		if(i==5){
			i=i-5;
		}
		var album = $("#imgAlbum").attr("src",imgArray[i]);
	});
	/*var imgArray=["img1.jpg","img2.jpg","img3.jpg","img4.jpg","img5.jpg"];
	var albumIndex=0;
	$("#imgAlbum").attr("src",imgArray[albumIndex]);
	$("#imgAlbum").click(function() {
		albumIndex=(albumIndex+1)%imgArray.length;
		$("imgAlbum").attr("src",imgArray[albumIndex]);
	});*/

	// animation
	$("#moving_button").click(function(){
		$("#moving_box").animate({
			right: '0px',
			height: '+=50px',
			width: '+=50px'
		})		
		$("#animation_test").animate({
			height: '+=50px'
		})
	});

	//accordion
	$(".accordion").each(function(){
		var dl = $(this)
		var allDt = dl.find("dt");
		var allDd = dl.find("dd");
		function closeAll(){
			allDd.addClass("closed");		
			allDt.addClass("closed");
		}
		function open(dt,dd){
			dt.removeClass("closed");		
			dd.removeClass("closed");
		}	
		closeAll();	
		allDt.click(function(){
			var dt = $(this);
			var dd = dt.next();
			closeAll();
			open(dt,dd);
		});
	});

	// note
	$("#add_img img").click(function() {
		$("#note_form").addClass("popup");
		change_position($(".popup"));	//top 및 left 속성변경
		$("#note_form").fadeIn(1000);	//$("#note_form").show(); $("#note_form").css({"display":"block"});
	});	
	$("#add_note").click(function() {
		var title = $("#note_title").val();
		var date = $("#note_date").val();
		var content = $("#note_content").val();
		var str = "<p>"+title+"<br>"+date+"<br>"+content+"</p><br>";
		$("#note_form").fadeOut(1000);	//$("#note_form").hide(); $("#note_form").css({"display":"none"});
		$("#note").append(str);
	});
	$(window).resize(function(){
		change_position($(".popup"));
	});

	//slideshow
	var interval = 3000;
	$('.slideshow').each(function(){
		var timer;
		var container = $(this);
		function switchImg(){
			var imgs = container.find('img');
			var first = imgs.eq(0);
			var second = imgs.eq(1);
			first.appendTo(container).fadeOut(2000);
			second.fadeIn();
		}
		function startTimer(){	//mouseout
			timer = setInterval(switchImg,interval);
		}
		function stopTimer(){	//mouseover
			clearInterval(timer);
		}
		container.hover(stopTimer,startTimer);
		startTimer();
	});

});

// note
function change_position(obj){
	var l = ($(window).width()-obj.width())/2;		//obj.css("width")
	var t = ($(window).height()-obj.height())/2;	//obj.css("height")
	obj.css({top:t, left:l});
}

