///////////////Cordova Bix
// Wait for device API libraries to load
function onLoad() {
document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available?
// TURN THIS ON TO ENABLE CORDOVA WITH THE onLoad() Above.
function onDeviceReady() {
// Now safe to use device APIs
// 

  	//array shuffle utility
	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}

	var notificationBeep = new Howl({urls: ['beep.mp3']})

	/////////////////////////////
	////NOTIFICATION FUNCTIONS///
	/////////////////////////////
	function vibrate(){
		//console.log('bzzzzz,bzzzzz');
		navigator.notification.vibrate(1000);
	}

	function playBeep(){
		//console.log('beep!');
		notificationBeep.play();
	}


/////////////////////////////
////BEGIN ENGINE/////////////
/////////////////////////////
$(function() { //Start jQuery Bix

	//mix up the task array
	shuffle(task);

	//storage for the user selectable paramaters
	var sound_noti, vib_noti, slider_interval, intervalMS, slider_duration ;

	/////////////////////////////
	////ACKNOWLEDGEMENTS PAGE////
	/////////////////////////////
	$('#openack').on( "tap", function( event ) {
		$('#param').fadeOut("slow", openAck);
		function openAck(){
			$("#ack").fadeIn("slow"); 
			$('#closeAck').fadeIn("slow"); 
		};
	});

	$('#closeAck').on( "tap", function( event ) {
		$('#closeAck').fadeOut("slow");
		$("#ack").fadeOut("slow", openParam);
		function openParam(){$("#param").fadeIn("slow");}
	});

	/////////////////////////////
	////MAIN INTERVAL ENGINE!!///
	/////////////////////////////

	$('#goButton').on( "tap", function( event ) {

		//////////////////////////////
		////Get Walk Paramaters///////
		//////////////////////////////
		//get the slider values
		slider_duration = $('#slider-duration').val();
		slider_interval = $('#slider-interval').val();
		//the interval of new tasks (in milleseconds) 60000ms = 1 minute
		intervalMS = slider_interval*60000;
		//set the sound/vib to gloval vars bound to the window object
		vib_noti = $('#flip-1').val();
		sound_noti = $('#flip-2').val();

		//close the param window, oepn task window
		$("#param").fadeOut("slow", openTask);
		function openTask(){$("#task").fadeIn("slow"); $("#exit").fadeIn("slow"); }
		//Go!
		
		$("#HUD").html("begin walking in any direction");

		var numMessage = Math.floor(slider_duration/slider_interval);

		// console.log('slider_duration:', slider_duration);
		// console.log('slider_interval:', slider_interval);
		// console.log('numMessage:', numMessage);
		// console.log('intervalMS', intervalMS);

		window.exit = function(){
			shuffle(task);
			$("#closeTask").fadeOut('slow')
			$("#exit").fadeOut("slow");
			// $("#HUD").html(""); //clear the window 
			$("#task").fadeOut('slow', openParam);
			function openParam(){$("#param").fadeIn("slow")}
			clearInterval(taskGrabber);
		}

		var taskGrabber = setInterval(function(){
			//step down each time...
			numMessage--;
			if(sound_noti === "on"){playBeep();}
			if(vib_noti === "on"){vibrate();}

			//console.log(i);
			if (numMessage == 0) {
				//reset
				window.exit();

			}else{
				//get a new task
				// console.log('numMessage:', numMessage);
				$("#HUD").fadeOut('2000', function(){
					$("#HUD").text(task[numMessage]).fadeIn('2000');  
				});
			}
		},
		intervalMS  //how often to display a message (interval slider in MS)
		//5000000000 //testing
		);
	
	}); //Close Main Go Button

	$('#exit').on( "tap", function( event ) {
		// console.log("good job!");
		window.exit();
	});


});//Close onDocumentReady
}; //Close onDeviceReady





