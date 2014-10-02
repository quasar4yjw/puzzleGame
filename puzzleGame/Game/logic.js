
var box_data = []; // box의 상태를 저장하기 위한 배열. 일단 true,false로 저장한다.
var box_state = []; // 현재 선택된 박스의 상태
var box_id = []; // 반복문을 위해 box id를 넣어둔 배열, 

var result = 0; // 현재 스테이지 true의 갯수
var select_box = 0; // 현재 선택한 박스 겟수
var result_box = 0; // 현재 선택된 박스중 true 갯수
var count; // 제한시간용 변수
var g_count;
var timer_stop = 0; //시간 정지를 위해 임시로

function new_game(){ //새게임
	//-----------초기화 작업
    $('#puzzleTop').css('-webkit-transform',''); 
    $('#puzzleTop').css('-moz-transform','');
	$('#puzzleTop').css('transform', '');
	count = 5;//한판당 제한시간 5초
	result = 0; 
	select_box = 0; 
	result_box = 0;
	timer_stop = 0;
	//---------------------
	
	for(var i=0; i<9; i++){		//초기화
		box_id[i].style.backgroundColor = "RoyalBlue"; // 현재 색상 모두 검정
		box_state[i] = false; // 현재 상태 모두 뒷면
		
		//각 배열에 정답이 될 값 저장
		if (parseInt(Math.random()*2)){ // 답 저장
			box_data[i] = 'true';
			result++;
		}	else {
			box_data[i] = 'false';
		}
		if(box_data[i] == 'true'){ // 저장된 답이 true 일 경우
			change_color(i);
		}	
	}
	console.log("해당 스테이지의 true 겟수 : "+result);
	
	window.setTimeout(function(){
		console.log("게임 준비 완료");
		stage_timer();//-----------------------타이머-------------
		rotateCell($('#puzzleTop'));
	}, 3000); 
}

function change_color(i){
	window.setTimeout(function(){
		box_id[i].style.backgroundColor = "MidnightBlue";//
	}, 1000);
	window.setTimeout(function(){
		box_id[i].style.backgroundColor = "RoyalBlue";// 
	}, 2000);
}

function stage_timer(){
	g_count = window.setInterval(function(){
		if(timer_stop == 0 && count >=0){
			time_count.value=count; // 5->0 으로 하나씩 출력
			count--;
		}else{ //카운트가 0이 됐을때 time over
			window.clearInterval(g_count); 
			console.log("time over");
			if(timer_stop == 1){
				$('#game_state').val($('#game_state').val()+"\n오호라? 맞췄네!\n");
			}else{
				$('#game_state').val($('#game_state').val()+"\n와우!! 못맞췄네!\n");
			}
		}
	}, 1000);
}

function rotateCell(element){

	element.animate({  borderSpacing: -90 }, {
	      step: function(now,fx) {
	        $('#puzzleTop').css('-webkit-transform','rotate('+(now)+'deg)'); 
	        $('#puzzleTop').css('-moz-transform','rotate('+(now)+'deg)');
	        $('#puzzleTop').css('transform','rotate('+(now)+'deg)');
	      },
	      duration:'low'
	  },'linear');
	window.setTimeout(function(){
	 element.animate({  borderSpacing: -90 }, {
	      step: function(now,fx) {
	        $('#puzzleTop').css('-webkit-transform','rotate('+(now-90)+'deg)'); 
	        $('#puzzleTop').css('-moz-transform','rotate('+(now-90)+'deg)');
	        $('#puzzleTop').css('transform','rotate('+(now-90)+'deg)');
	      },
	      duration:'low'
	  },'linear'); }, 500); 
}

function box_click(select , value){ // 박스 선택시. 배열과 비교하여 맞췄는지 확인

	 if (box_state[value] == false){ // 박스가 뒤집힌 상태인지 아닌지 확인.
       $(box_id[value]).css( "background-color", 'MidnightBlue' );
       select_box++; //현재 선택된 박스 갯수
       box_state[value] = true;
       if(select == 'true') // 선택된 것이 true 일경우
    	   result_box++; // 정답수 ++
       }
    else{ 
       $(box_id[value]).css( "background-color", 'RoyalBlue' );
       select_box--; // 선택 취소된 박스 갯수
       box_state[value] = false;
       if(select == 'true') 
    	   result_box--; // 정답이래도 선택 취소했으므로 --
       }
       
	 if(result_box == select_box && result_box == result){//result_box == select_box && 
			console.log("총 선택된 박스 수: "+select_box+", 선택된 정답 수 : "+result_box);
			timer_stop = 1;
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

var state_area = document.getElementById('game_state');
var time_count = document.getElementById('count_state');
var start_game = document.getElementById('start_game');

	box_id = [box0,box1,box2,box3,box4,box5,box6,box7,box8]; //배열에 id 저장

//box_data[]의 값은 t/f.. 해당 박스의 정답 여부
box0.onclick = function(){	box_click(box_data[0],0); }
box1.onclick = function(){	box_click(box_data[1],1); }
box2.onclick = function(){	box_click(box_data[2],2); }
box3.onclick = function(){	box_click(box_data[3],3); }
box4.onclick = function(){	box_click(box_data[4],4); }
box5.onclick = function(){	box_click(box_data[5],5); }
box6.onclick = function(){	box_click(box_data[6],6); }
box7.onclick = function(){	box_click(box_data[7],7); }
box8.onclick = function(){	box_click(box_data[8],8); }

	start_game.onclick= function(){new_game();};//게임 시작
