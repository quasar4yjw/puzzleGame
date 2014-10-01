
var box_data = []; // box의 상태를 저장하기 위한 배열. 일단 true,false로 저장한다.
var box_state = []; // 현재 선택된 박스의 상태
var box_id = []; // 반복문을 위해 box id를 넣어둔 배열, 

var result = 0; // 현재 스테이지 true의 갯수
var select_box = 0; // 현재 선택한 박스 겟수
var result_box = 0; // 현재 선택된 박스중 true 갯수
var fun = 90;

function new_game(){ // 초기화 작업
	for(var i=0; i<9; i++){
		//초기화
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
		//rotate();
	}, 3000); 
}

function clear_game(){// 클리어. 다시하기
	result = 0; 
	select_box = 0; 
	result_box = 0;
	console.log("클리어");
	$('#game_state').val($('#game_state').val()+"\n맞췄습니다\n");

	var appendText = document.createTextNode("스테이지 클리어\n"); 
	state_area.appendChild(appendText); 

}
function change_color(i){
	window.setTimeout(function(){
		box_id[i].style.backgroundColor = "MidnightBlue";// 빨강
	}, 1000);
	window.setTimeout(function(){
		box_id[i].style.backgroundColor = "RoyalBlue";// 검정
	}, 2000);
}

function rotate(){ //화면 회전용 함수.. 추가회전시 각도 문제 남아있음
	$('#puzzleTop').animate({  borderSpacing: -90 }, {
	      step: function(now,fx) {
	        $(this).css('-webkit-transform','rotate('+now+'deg)'); 
	        $(this).css('-moz-transform','rotate('+now+'deg)');
	        $(this).css('transform','rotate('+now+'deg)');
	        //console.log(now); //각도 출력
	      },
	      duration:'low'
	  },'linear');
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
			clear_game();
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
var start_game = document.getElementById('start_game');

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


	start_game.onclick= function(){new_game();};//버튼 선택시 새게임


