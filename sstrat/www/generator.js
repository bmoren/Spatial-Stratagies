

///////////////Cordova Bix
// Wait for device API libraries to load
function onLoad() {
    document.addEventListener("deviceready", onDeviceReady, false);
}

/////////////////////////////
////NOTIFICATION FUNCTIONS///
/////////////////////////////
function playBeep(){
	//console.log('beep!');
	navigator.notification.beep(1);
}

function vibrate(){
	//console.log('bzzzzz,bzzzzz');
	navigator.notification.vibrate(1000);
}

// device APIs are available?
 //function onDeviceReady() {
  // Now safe to use device APIs

	/////////////////////////////
	////GEN NON-REP RAND/////////
	/////////////////////////////
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


	/////////////////////////////
	////BEGIN ENGINE/////////////
	/////////////////////////////
	//defult is 30minute walk, 1min interval, change here and in index.html if needed
	window.maxTime = 30 ;
	window.interval = 60000 ;

	window.sound_noti = "on" ;
	window.vib_noti = "on" ;

	var i = 0 ;

	$(function() { //Start jQuery Bix

		$("#task").hide();
  		$("#ack").hide();
  		$("#submit").hide();
		/////////////////////////////
		////ACKNOWLEDGEMENTS PAGE////
		/////////////////////////////
		$('#openack').on( "tap", function( event ) {
			$('#param').fadeOut("slow", openAck);
			function openAck(){$("#ack").fadeIn("slow");}
		});

		$('#closeack').on( "tap", function( event ) {
			$("#ack").fadeOut("slow", openParam);
			function openParam(){$("#param").fadeIn("slow");}
		});

		///////////////////
		////SUBMIT PAGE////
		///////////////////

		$('#opensubmit').on( "tap", function( event ) {
			$("#param").fadeOut("slow", openSubmit);
			function openSubmit(){$("#submit").fadeIn("slow");}
		});

		$('#closesubmit').on( "tap", function( event ) {
			$("#submit").fadeOut("slow", openParam);
			function openParam(){$("#param").fadeIn("slow");}
		});


		//////////////////////////////
		////PARAM PAGE & TASK PAGE////
		//////////////////////////////
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


		}); //close the body change

			/////////////////////////////
			////MAIN GO!!////////////////
			/////////////////////////////
			$('#goButton').on( "tap", function( event ) {

				console.log("maxTime:", maxTime, "   interval:", interval);

				//close the param window, oepn task window
				$("#param").fadeOut("slow", openTask);
				function openTask(){$("#task").fadeIn("slow");}

				$("#HUD").html("begin walking in any direction now");

				//Clear the initial message utside of the mian interval loop
				var timeoutIntro = window.setTimeout( function(){ $("#HUD").fadeOut('2000'); }, window.interval-2000);

				//MAIN INTERVAL ENGINE
				var newTask = setInterval(function(){

					$("#HUD").fadeIn('slow');

					if (i >= window.maxTime) {
						clearInterval(newTask);
						$("#HUD").html(""); //clear the window 
						if(window.sound_noti === "on"){playBeep();}
						if(window.vib_noti === "on"){vibrate();}

						//reset
						i = 0 ;
						shuffle(foo);
						$("#param" ).fadeIn("slow");

					} else{
						i++ ;
						console.log(i + ' / ' + window.maxTime);
						var timeoutID = window.setTimeout( function(){ $("#HUD").fadeOut('2000'); }, window.interval-2000);
						$("#HUD").html(task[foo[i]]); 	//get a new task
						if(window.sound_noti === "on"){playBeep();}
						if(window.vib_noti === "on"){vibrate();}
					}
				},window.interval);
			}); //Close Main Go Button
	});//Close onDocumentReady
//}; //Close onDeviceReady





