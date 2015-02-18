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

////////////Get a non-repeating random number //////////////
function range(start, end) {
    var foo = [];
    for (var i = start; i <= end; i++) {
        foo.push(i);
    }
    return foo;
}

//generate an array with a range of numbers = to the number of tasks available, this is to be shuffled which will give us our non-repeting-random #
var foo = range(0, task.length );

function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

//mix up the array of numbers in a range from 0 to task.length 
shuffle(foo);

///////////end ger non-rep-rand


/////BEGIN ENGINE //////
window.maxTime = 30 ;
window.interval = 240000 ;

window.sound_noti = "on" ;
window.vib_noti = "on" ;

$(document).ready(function() {

	//$("#mypanel").panel({ swipeClose: false });
	//$( "#mypanel" ).panel({ display: "push" });

	//open panel
	$("#mypanel" ).panel( "open" );

	$('body').change(function() {

		//get the slider values
		var slider_duration = $('#slider-duration').val();
		console.log("duration_slider:", slider_duration);
		var slider_interval = $('#slider-interval').val();
		console.log("interval_slider:", slider_interval);

		//set the sound/vib to gloval vars bound to the window object
		window.vib_noti = $('#flip-1').val();
		console.log("vib_nori var:", window.vib_noti);
		window.sound_noti = $('#flip-2').val();
		console.log("sound_noti var:", window.sound_noti);

		//How many times to repeat / how many tasks?
		window.maxTime = Math.round(slider_duration/slider_interval);

		//the interval of new tasks (in milleseconds)
		window.interval = slider_interval*60000 ;

		console.log("maxTime:", maxTime, "   interval:", interval);

	});

var i = 0 ;

		// oepn the panel on a right swipe
		// $("#page1").on("swiperight", function( event ) {
		// $("#mypanel" ).panel( "open" );
		// });

		// take a look into this to make sure it only the start my walk button.
		$('#goButton').on( "tap", function( event ) {

			$( "#mypanel" ).panel( "close" );

			$("#HUD").html("begin walking in any direction now");

			var timeoutIntro = window.setTimeout( function(){
				$("#HUD").fadeOut('2000');
			}, window.interval-2000);


			var newTask = setInterval(function(){

				$("#HUD").fadeIn('slow');

				if (i >= window.maxTime) {
					clearInterval(newTask);
					$("#HUD").html("the end of the walk, look around.");
					if(window.sound_noti === "on"){playBeep();}
					if(window.vib_noti === "on"){vibrate();}

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
					if(window.sound_noti === "on"){playBeep();}
					if(window.vib_noti === "on"){vibrate();}
				}
			},window.interval);
		});
    });



