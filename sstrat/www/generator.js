

///////////////Cordova Bix
// Wait for device API libraries to load
// function onLoad() {
//     document.addEventListener("deviceready", onDeviceReady, false);
// }



// device APIs are available?
// TURN THIS ON TO ENABLE CORDOVA WITH THE onLoad() Above.
   // function onDeviceReady() {
  // Now safe to use device APIs
  // 

  	var notificationBeep = new Howl({
  urls: ['beep.mp3']})

  	/////////////////////////////
  	////NOTIFICATION FUNCTIONS///
  	/////////////////////////////

  	function vibrate(){
  		//console.log('bzzzzz,bzzzzz');
  		   navigator.notification.vibrate(1000);
  	}

  	function playBeep(){
  	//console.log('beep!');
   	//navigator.notification.beep(1);
   	notificationBeep.play();
   	   	   
  	}


	function shuffle(o){ //v1.0
	    for(var j, x, i = o.length; i; j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}

	/////////////////////////////
	////BEGIN ENGINE/////////////
	/////////////////////////////
	$(function() { //Start jQuery Bix

		//mix up the task array
		shuffle(task);

		//defult is 30minute walk, 1min interval, change here and in index.html if needed
		var sound_noti = "on" ;
		var vib_noti = "on" ;
		var slider_interval = 3; 
		var intervalMS = 60000 ; //one minute
		var slider_duration = 30;

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


		//////////////////////////////
		////Get Walk Paramaters///////
		//////////////////////////////
		$('body').change(function() {

			//get the slider values
			slider_duration = $('#slider-duration').val();
			slider_interval = $('#slider-interval').val();
			//the interval of new tasks (in milleseconds) 60000ms = 1 minute
			intervalMS = slider_interval*60000;

			//set the sound/vib to gloval vars bound to the window object
			vib_noti = $('#flip-1').val();
			sound_noti = $('#flip-2').val();
		}); //close the body change detection

		/////////////////////////////
		////MAIN INTERVAL ENGINE!!///
		/////////////////////////////
		function newTask(){

			$("#HUD").html("begin walking in any direction");

			var numMessage = Math.floor(slider_duration/slider_interval);

			// console.log('slider_duration:', slider_duration);
			// console.log('slider_interval:', slider_interval);
			// console.log('numMessage:', numMessage);
			// console.log('intervalMS', intervalMS);

			function exit(){
				shuffle(task);
				$("#HUD").html(""); //clear the window 
				$("#closeTask").fadeOut('slow')
				$("#task").fadeOut('slow', openParam);
				$("closeTask").fadeOut('slow')
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
					exit();

				}else{
					//get a new task
					console.log('numMessage:', numMessage);
					$("#HUD").fadeOut('2000', function(){
						$("#HUD").text(task[numMessage]).fadeIn('2000');  
					});
				}
			},
			intervalMS  //how often to display a message (interval slider in MS)
			//5000000000 //testing
			);
		} // close newTask

		$('#goButton').on( "tap", function( event ) {
			//close the param window, oepn task window
			$("#param").fadeOut("slow", openTask);
			function openTask(){$("#task").fadeIn("slow");}
			//Go!
			newTask();
		
		}); //Close Main Go Button
	});//Close onDocumentReady
  // }; //Close onDeviceReady





