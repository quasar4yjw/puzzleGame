






var box_data = []; // box의 상태를 저장하기 위한 배열. 일단 true,false로 저장한다.
var box_state = []; // 현재 선택된 박스의 상태
var box_id = []; // 반복문을 위해 box id를 넣어둔 배열, 

/* var g_round = 0; // 스테이지 번호.. 난이도를 조정할지 생각중
var g_score = 0; // 맞출때, 틀릴때, 클리어시 점수를 낼것.. */


var result = 0; // 현재 스테이지 true의 갯수
var select_box = 0; // 현재 선택한 박스 겟수
var result_box = 0; // 현재 선택된 박스중 true 갯수
var temp; // 매 스테이지 제한시간. 초기화

var g_timer;

function new_game(){ // 초기화 작업
	
	temp = 5;//제한시간
	
	for(var i=0; i<9; i++){
		//초기화
		box_id[i].style.backgroundColor = "#000000"; // 현재 색상 모두 검정
		box_state[i] = false; // 현재 상태 모두 뒷면
		
		//각 배열에 정답이 될 값 저장
		if (parseInt(Math.random()*2)){ // 답 저장
			box_data[i] = 'true';
			result++;
		}	else {
			box_data[i] = 'false';
		}
		
		if(box_data[i] == 'true'){ // 저장된 답이 true 일 경우
			change_color(i);// 시작 전 정답 공개
		}	
	}
	console.log("해당 스테이지의 true 겟수 : "+result);
	
	window.setTimeout(function(){
		console.log("게임 준비 완료");
		var appendText = document.createTextNode("게임 준비 완료\n");
		stage_timer();
		 //타이머 1초 간격
	}, 1000); 
}
function stage_timer(value){
	
	g_timer = window.setInterval(function(){
		//document.all('timer').innerHTML=temp;
		$('#timer').val($('#timer').val()+temp);
		if(0>=temp){ //value == 0
			clear_game(0);
			window.clearInterval(g_timer); //타이머 정지
			g_timer="";
			console.log("패배");
		}else if(0<temp) {// 카운터가 0이 됐을때
			temp--;
		} 
			
		if(value == 0){
			clear_game(1);
			window.clearInterval(g_timer); 
			g_timer="";
			console.log("승리");
		}
			
	}, 1000);
}


function clear_game(value){// 클리어. 다시하기
	result = 0; 
	select_box = 0; 
	result_box = 0;
	
	if(value == 1){
		console.log("-클리어-");
		var appendText = document.createTextNode("스테이지 종료1\n"); 
		state_area.appendChild(appendText);
	}
	if(value == 0){
		console.log("-게임오버-");
		var appendText = document.createTextNode("스테이지 종료2\n"); 
		state_area.appendChild(appendText);
	}
	
	/* console.log("클리어");
	var appendText = document.createTextNode("스테이지 클리어\n"); 
	state_area.appendChild(appendText); 
 	*/
	
	start_game.onclick= function(){new_game();};//버튼 선택시 새게임
}
function change_color(i){
	window.setTimeout(function(){
		box_id[i].style.backgroundColor = "#ff0000";// 빨강
	}, 1000);
	window.setTimeout(function(){
		box_id[i].style.backgroundColor = "#000000";// 검정
	}, 2000);
}

function rotate(){ //화면 회전용 함수.. 추가회전시 각도 문제 남아있음
	$('#puzzle').animate({  borderSpacing: -90 }, {
	      step: function(now,fx) {
	        $(this).css('-webkit-transform','rotate('+now+'deg)'); 
	        $(this).css('-moz-transform','rotate('+now+'deg)');
	        $(this).css('transform','rotate('+now+'deg)');
	        //console.log(now); //각도 출력
	      },
	      duration:'low'
	  },'linear');
	  $('#puzzle').animate({  borderSpacing: -90 }, {
	      step: function(now,fx) {
	        $(this).css('-webkit-transform','rotate('+(now-90)+'deg)'); 
	        $(this).css('-moz-transform','rotate('+(now-90)+'deg)');
	        $(this).css('transform','rotate('+(now-90)+'deg)');
	        //console.log(now); //각도 출력
	      },
	      duration:'low'
	  },'linear');
}

function box_click(select , value){ // 박스 선택시. 배열과 비교하여 맞췄는지 확인

	 if (box_state[value] == false){ // 박스가 뒤집힌 상태인지 아닌지 확인.
       $(box_id[value]).css( "background-color", 'lightblue' );
       select_box++; //현재 선택된 박스 갯수
       box_state[value] = true;
       if(select == 'true') // 선택된 것이 true 일경우
    	   result_box++; // 정답수 ++
       }
    else{ 
       $(box_id[value]).css( "background-color", 'black' );
       select_box--; // 선택 취소된 박스 갯수
       box_state[value] = false;
       if(select == 'true') 
    	   result_box--; // 정답이래도 선택 취소했으므로 --
       }
       
	 if(result_box == select_box && result_box == result){//result_box == select_box && 
			console.log("총 선택된 박스 수: "+select_box+", 선택된 정답 수 : "+result_box);
			//clear_game(1);
			stage_timer(0);
		}
	
};

var box0 = document.getElementById('a');
var box1 = document.getElementById('b');
var box2 = document.getElementById('c');
var box3 = document.getElementById('d');
var box4 = document.getElementById('e');
var box5 = document.getElementById('f');
var box6 = document.getElementById('g');
var box7 = document.getElementById('h');
var box8 = document.getElementById('i');

var start_game = document.getElementById('start_game'); //스타트 버튼
//var state_area = document.getElementById('game_state'); //게임 상태 area
//var timer = document.getElementById('timer'); // 타이머

var timer = document.getElementById('count_state');
var state_area = document.getElementById('game_state');

box_id = [box0,box1,box2,box3,box4,box5,box6,box7,box8]; //배열에 id 저장

//box_data[]의 값은 t/f.. 해당 박스의 정답 여부
box0.onclick = function(){	box_click(box_data[0],0);}
box1.onclick = function(){	box_click(box_data[1],1);}
box2.onclick = function(){	box_click(box_data[2],2);}
box3.onclick = function(){	box_click(box_data[3],3);}
box4.onclick = function(){	box_click(box_data[4],4);}
box5.onclick = function(){	box_click(box_data[5],5);}
box6.onclick = function(){	box_click(box_data[6],6);}
box7.onclick = function(){	box_click(box_data[7],7);}
box8.onclick = function(){	box_click(box_data[8],8);}

/*
window.setTimeout(function(){
	
}, 3000); //딜레이를 주기위해
*/

	new_game(); //게임 초기화 
