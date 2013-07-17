function onLoad(){ document.addEventListener("deviceready", onDeviceReady, false); }

function onDeviceReady() {

	function playBeep() {
		navigator.notification.beep(1);
	}
	// Vibrate for 2 seconds
	function vibrate() {
		navigator.notification.vibrate(2000);
	}

var task = new Array(
"turn when you see red",
"turn around",
"find a corner",
"walk twice as fast",
"walk twice as slow",
"open something",
"get to a higher place",
"what is under your feet?",
"look through glass",
"take the next passageway",
"get lower",
"avoid cement",
"cross a boundry",
"open something",
"Step over something",
"close your eyes and listen",
"smell everything",
"balance on something while walking",
"nod at every stranger",
"touch green things",
"slowly veer to the left",
"don't look at where your going",
"let your fingertips graze the walls as you walk",
"interrupt traffic",
"go towards a body of water",
"see only things that are bad",
"see only things that are good",
"look for the color yellow",
"pay close attention to things that move",
"pay close attention to things that are still",
"find things that seem old",
"find a security camera",
"find your reflection",
"ask the next person you see for directions to the hospital",
"walk towards the tallest building in sight",
"try to find a roof access",
"whistle or hum a lullaby",
"cover one eye"
);//end array

var totalTaskNum = task.length ;
console.log("total number of tasks:", totalTaskNum);

////////////Get a non-repeating random number (this is overly complex)//////////////
function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}

//generate an array with a range of numbers = to the number of tasks available, this is to be shuffled which will give us our non-repeting-random #
var foo = range(0, totalTaskNum);

console.log("foo:", foo);

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

//mix up the array of numbers in a range from 0 to totalTaskNum
shuffle(foo);

///////////end ger non-rep-rand


/////BEGIN ENGINE //////

window.maxTime = 30 ;
window.interval = 4 ;

$(document).ready(function() {

	//$("#mypanel").panel({ swipeClose: false });
	//$( "#mypanel" ).panel({ display: "push" });

	//open panel
	$("#mypanel" ).panel( "open" );

	$('body').change(function() {
		//get the slider value
		var slider_duration = $('#slider-duration').val();
		console.log("duration_slider:", slider_duration);
		var slider_interval = $('#slider-interval').val();
		console.log("interval_slider:", slider_interval);

		//How many times to repeat / how many tasks?
		window.maxTime = Math.round(slider_duration/slider_interval);

		//the interval of new tasks (in milleseconds)
		window.interval = slider_interval*60000 ;

		console.log("maxTime:", maxTime, "   interval:", interval);

	});

var i = 0 ;
		$("#page1").on("swiperight", function( event ) {

			$("#mypanel" ).panel( "open" );

		});

		$(':button').on( "tap", function( event ) {

			$( "#mypanel" ).panel( "close" );

			// FIX THIS // Add a begin walking in any direction NOW message!
			$("#HUD").fadeOut('fast');

			// var timeoutIntro = window.setTimeout( function(){
			// 	$("#HUD").html("begin walking in any direction");
			// 	$("#HUD").fadeIn('slow');
			// }, window.interval-5000);

			// $("#HUD").fadeOut('fast');

			var newTask = setInterval(function(){

				$("#HUD").fadeIn('slow');

				if (i >= window.maxTime) {
					clearInterval(newTask);
					$("#HUD").html("End");
					playBeep();
					vibrate();

					//reset
					i = 0 ;
					shuffle(foo);
					$("#mypanel" ).panel( "open" );

				} else{
					i++ ;
					console.log(i, "of", window.maxTime);
					var timeoutID = window.setTimeout( function(){$("#HUD").fadeOut('2000');}, window.interval-2000);
					//get a new task
					$("#HUD").html(task[foo[i]]);
					playBeep();
					vibrate();
				}
			},window.interval);
		});
    });

}



