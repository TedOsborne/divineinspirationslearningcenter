/*
|--------------------------------------------------------------------------
	Hello Form - PHP Working Ajax Contact Form with Validation Main JS
	Author: MGScoder
	Author URL: https://codecanyon.net/user/mgscoder
|--------------------------------------------------------------------------
*/
document.addEventListener("touchstart", function() {},false);
(function ($) {
	"use strict";
	
/*
|--------------------------------------------------------------------------
	Math Captcha
|--------------------------------------------------------------------------
*/	
	$(function(){
	
		var randNumber_1 = parseInt( Math.ceil( Math.random() * 15 ), 10 );
		var randNumber_2 = parseInt( Math.ceil( Math.random() * 15 ), 10 );       
		humanCheckCaptcha(randNumber_1, randNumber_2);
	 
	});
	function humanCheckCaptcha(randNumber_1, randNumber_2){
		$( "#humanCheckCaptchaBox" ).html( "Solve The Math " );
		$( "#firstDigit" ).html( '<input name="mathfirstnum" id="mathfirstnum" class="form-control" type="text" value="' + randNumber_1 + '" readonly>' );
		$( "#secondDigit" ).html( '<input name="mathsecondnum" id="mathsecondnum" class="form-control" type="text" value="' + randNumber_2 + '" readonly>' );
	}

/*
|--------------------------------------------------------------------------
	Contact Form with reCaptcha Process
|--------------------------------------------------------------------------
*/	
	$("#contactForm").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var phone = $("#phone").val();
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
			
			if (validphone > 0){
				if ($("#g-recaptcha-response").val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "contact-process.php",
						data: $( "#contactForm" ).serialize(),
						success : function(text){
							if ($.trim(text) === "success") {
								contactFormSuccess();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	function contactFormSuccess(){
		$("#contactForm")[0].reset();
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}
	
/*
|--------------------------------------------------------------------------
	Contact Form with hCaptcha Process
|--------------------------------------------------------------------------
*/	
	$("#contactFormHc").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var phone = $("#phone").val();
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
			
			if (validphone > 0){
				if ($('[name=h-captcha-response]').val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "contact-process.php",
						data: $( "#contactFormHc" ).serialize(),
						success : function(text){
							if ($.trim(text) === "success") {
								contactFormHcSuccess();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	function contactFormHcSuccess(){
		$("#contactFormHc")[0].reset();
		//$("#contactFormHc").css('display', 'none');	//This line will hide the form after the form is successfully submitted
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}

/*
|--------------------------------------------------------------------------
	Contact Form with Math Captcha Process
|--------------------------------------------------------------------------
*/	
	$("#contactForm2").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			var mathPart_1 = parseInt( $("#mathfirstnum").val(), 10 );
			var mathPart_2 = parseInt( $("#mathsecondnum").val(), 10 );       
			var correctMathSolution = parseInt( ( mathPart_1 + mathPart_2 ), 10 );
			var inputHumanAns = $("#humanCheckCaptchaInput").val();
			
			var phone = $("#ch-h-phone").val();
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#ch-h-phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
			
			if (validphone > 0){
				if (inputHumanAns == correctMathSolution){ 
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "contact-process.php",
						data: $( "#contactForm2" ).serialize(),
						success : function(text){
							/*if ($.trim(text) === "success") {
								contactForm2Success();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}*/
							contactForm2Success();
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "Please solve Human Check Captcha!!!");
					sweetAlert("Oops...", "Please solve Human Captcha!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	function contactForm2Success(){
		$("#contactForm2")[0].reset();
		//$("#contactForm2").css('display', 'none');	//This line will hide the form after the form is successfully submitted
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}

/*
|--------------------------------------------------------------------------
	Contact Form pay schedule
|--------------------------------------------------------------------------
*/
    $("#contactschedule").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			var mathPart_1 = parseInt( $("#mathfirstnum").val(), 10 );
			var mathPart_2 = parseInt( $("#mathsecondnum").val(), 10 );       
			var correctMathSolution = parseInt( ( mathPart_1 + mathPart_2 ), 10 );
			var inputHumanAns = $("#humanCheckCaptchaInput").val();
			
			var phone = $("#ch-h-phone").val();
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#ch-h-phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
			
			if (validphone > 0){
				if (inputHumanAns == correctMathSolution){ 
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "pay-schedule-process.php",
						data: $( "#contactForm2" ).serialize(),
						success : function(text){
							/*if ($.trim(text) === "success") {
								contactForm2Success();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}*/
							contactForm2Success();
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "Please solve Human Check Captcha!!!");
					sweetAlert("Oops...", "Please solve Human Captcha!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	function contactForm2Success(){
		$("#contactForm2")[0].reset();
		//$("#contactForm2").css('display', 'none');	//This line will hide the form after the form is successfully submitted
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}



/*
|--------------------------------------------------------------------------
	Contact Form Process
|--------------------------------------------------------------------------
*/	
	$("#contactForm3").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var phone = $("#phone").val();
						
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
			
			if (validphone > 0){
				if ($("#g-recaptcha-response").val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "contact-process3.php",
						data: $( "#contactForm3" ).serialize(),
						success : function(text){
							if ($.trim(text) === "success") {
								contactForm3Success();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	function contactForm3Success(){
		$("#contactForm3")[0].reset();
		//$("#contactForm3").css('display', 'none');	//This line will hide the form after the form is successfully submitted
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}
	
/*
|--------------------------------------------------------------------------
	File Attachment Form Process
|--------------------------------------------------------------------------
*/	
	$("#contactForm4").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var phone = $("#phone").val();
			var form_data = new FormData($("#contactForm4")[0]);                  
			form_data.append('file', form_data);
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
						
			if (validphone > 0){			
				if ($("#g-recaptcha-response").val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "contact-process4.php",
						data : form_data,
						processData: false,
						contentType: false,
						success : function(text){
							if ($.trim(text) === "success") {
								contactForm4Success();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	function contactForm4Success(){
		$("#contactForm4")[0].reset();
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}
	 
	
/*
|--------------------------------------------------------------------------
	File Attachment Form Process with Uploading Animation
|--------------------------------------------------------------------------
*/	
	$("#contactForm5").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var formurl   = $(location).attr('href');
			var phone = $("#phone").val();
			var form_data = new FormData($("#contactForm5")[0]);                  
			form_data.append('file', form_data);
			form_data.append('formurl', formurl);
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
						
			if (validphone > 0){			
				if ($("#g-recaptcha-response").val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "contact-process5.php",
						data : form_data,
						processData: false,
						contentType: false,
						success : function(text){
							if ($.trim(text) === "success") {
								contactForm5Success();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	function contactForm5Success(){
		$("#contactForm5")[0].reset();
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}

/*
|--------------------------------------------------------------------------
	Contact Form with Thanks Page Redirect
|--------------------------------------------------------------------------
*/	
	$("#contactFormThx").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			var mathPart_1 = parseInt( $("#mathfirstnum").val(), 10 );
			var mathPart_2 = parseInt( $("#mathsecondnum").val(), 10 );       
			var correctMathSolution = parseInt( ( mathPart_1 + mathPart_2 ), 10 );
			var inputHumanAns = $("#humanCheckCaptchaInput").val();
			
			var phone = $("#phone").val();
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
			
			if (validphone > 0){
				if (inputHumanAns == correctMathSolution){ 
					
					$("#contactFormThx").submit();
					
				}
				else{
					submitContactMSG(false, "Please solve Human Check Captcha!!!");
					sweetAlert("Oops...", "Please solve Human Captcha!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	
/*
|--------------------------------------------------------------------------
	Multi File Attachment Form Process with Uploading Animation
|--------------------------------------------------------------------------
*/	
	$("#contactFormMultifileAttached").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var formurl   = $(location).attr('href');
			var phone = $("#phone").val();
			var form_data = new FormData($("#contactFormMultifileAttached")[0]);                  
			form_data.append('file', form_data);
			form_data.append('formurl', formurl);
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
						
			if (validphone > 0){			
				if ($("#g-recaptcha-response").val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "contact-process-multi-upload.php",
						data : form_data,
						processData: false,
						contentType: false,
						success : function(text){
							if ($.trim(text) === "success") {
								contactFormMultifileAttachedSuccess();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});	
	
	function contactFormMultifileAttachedSuccess(){
		$("#contactFormMultifileAttached")[0].reset();
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}
	
/*
|--------------------------------------------------------------------------
	Job Apply Form Process
|--------------------------------------------------------------------------
*/	
	$("#jobApplyForm").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var phone = $("#phone").val();
			var form_data = new FormData($("#jobApplyForm")[0]);                  
			form_data.append('file', form_data);
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}	
						
			if (validphone > 0){
				
				//everything looks good!
				event.preventDefault();
				
				$('#processing-image').show();
				$('#submitButtonHolder').hide();
				
				$.ajax({
					type: "POST",
					url: "job-apply.php",
					data : form_data,
					processData: false,
					contentType: false,
					success : function(text){
						if ($.trim(text) === "success") {
							jobApplyFormSuccess();
						} else {
							formError();
							submitContactMSG(false,text);
							sweetAlert("Oops...", text, "error");
						}
					},
					complete: function(){
						$('#processing-image').hide();
						$('#submitButtonHolder').show();
					}
				});
									
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});	
	
	function jobApplyFormSuccess(){
		$("#jobApplyForm")[0].reset();
		submitContactMSG(true, "Your Application Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. Your Application Submitted Successfully!!! </div>' );
		swal("Good job!", "Your Application Submitted Successfully!!!", "success");
	}
	
	
/*
|--------------------------------------------------------------------------
	handle the attached file to show attached file name in the form field
|--------------------------------------------------------------------------
*/
	$(function() {

		$(document).on('change', ':file', function() {
			var input = $(this),
				numFiles = input.get(0).files ? input.get(0).files.length : 1,
				label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
			input.trigger('fileselect', [numFiles, label]);
		});

		$(':file').on('fileselect', function(event, numFiles, label) {

			var input = $(this).parents('.form-group').find(':text'),
				log = numFiles > 1 ? numFiles + ' files selected' : label;

			if( input.length ) {
				input.val(log);
			} else {
				if( log ) alert(log);
			}

		});
	  
	});


/*
|--------------------------------------------------------------------------
	Quote Form
|--------------------------------------------------------------------------
*/	
	$("#quoteForm").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitQuoteFormActionMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var phone = $("#phone").val();
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}
			
			if (validphone > 0){
				if ($("#g-recaptcha-response").val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "quote-process.php",
						data: $( "#quoteForm" ).serialize(),
						success : function(text){
							if ($.trim(text) === "success") {
								quoteFormSuccess();
							} else {
								formError();
								submitQuoteFormActionMSG(false,text);
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
									
				}
				else{
					submitQuoteFormActionMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
							
			}
			else{
				submitQuoteFormActionMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
			
		}
	});
	
	function quoteFormSuccess(){
		$("#quoteForm")[0].reset();		/* When Success form input will be reset. #quoteForm this ID should match your form ID */
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		submitQuoteFormActionMSG(true, "Your Quote Form Submitted Successfully!!!");	/* Success Message */
		swal("Good job!", "Your Quote Form Submitted Successfully!!!", "success");
	}
	

/*
|--------------------------------------------------------------------------
	Contact Form with recaptcha and Mailchimp Integrate
|--------------------------------------------------------------------------
*/
	
	$("#mailchimpForm #submitButtonHolder button.mcformntm").on("click", function (event) {
		
		var fname = $("#fname").val();
		var email = $("#email").val();
		var service = $("#service").val();
		var message = $("#message").val();
		if ($('#mailchimpsubsc').is(":checked")) {
			var mailchimpsubsc = 1;
		}
		else{
			var mailchimpsubsc = 0;
		}
		
		var validemail = isEmail(email);
		
		if( fname && validemail && service && message && mailchimpsubsc && $("#g-recaptcha-response").val() ) {			
			$('#mailchimpForm').ajaxChimp({
				//Change YOUR MAILCHIMP ACCOUNT LIST FORM ACTION URL
				url: 'https://YOUR MAILCHIMP ACCOUNT LIST FORM ACTION'
			});
		}
		
	});
	
	
	$("#mailchimpForm").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			if ($("#g-recaptcha-response").val()) {
				//everything looks good!
				event.preventDefault();
				
				$('#processing-image').show();
				$('#submitButtonHolder').hide();
				
				$.ajax({
					type: "POST",
					url: "contact-process-mc.php",
					data: $( "#mailchimpForm" ).serialize(),
					success : function(text){
						if ($.trim(text) === "success") {
							mailchimpFormSuccess();
						} else {
							formError();
							submitContactMSG(false,text);
							sweetAlert("Oops...", text, "error");
						}
					},
					complete: function(){
						$('#processing-image').hide();
						$('#submitButtonHolder').show();
					}
				});
				
			}
			else{
				submitContactMSG(false, "You are not a human!!!");
				sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
				return false;
			}
				
		}
	});	
	
	function mailchimpFormSuccess(){
		if ($('#mailchimpsubsc').is(":checked")) {
			var mailchimpsubsc = 1;
		}
		else{
			var mailchimpsubsc = 0;
		}		
		$("#mailchimpForm")[0].reset();
		
		if (mailchimpsubsc){
			submitContactMSG(true, "Your Message Submitted Successfully!!! Please check your email to Confirm Subscription");
			swal("Good job!", "Your Message Submitted Successfully!!! Please check your email to Confirm Subscription", "success");
		}else{
			submitContactMSG(true, "Your Message Submitted Successfully!!!");
			swal("Good job!", "Your Message Submitted Successfully!!!", "success");
		}
	}


/*
|--------------------------------------------------------------------------
	Contact Form with Math captcha and Mailchimp Integrate
|--------------------------------------------------------------------------
*/
	
	$("#mailchimpForm2 #submitButtonHolder button.mcformntm").on("click", function (event) {
		
		var fname = $("#fname").val();
		var email = $("#email").val();
		var service = $("#service").val();
		var message = $("#message").val();
		if ($('#mailchimpsubsc').is(":checked")) {
			var mailchimpsubsc = 1;
		}
		else{
			var mailchimpsubsc = 0;
		}
		
		var validemail = isEmail(email);
		
		var mathPart_1 = parseInt( $("#mathfirstnum").val(), 10 );
		var mathPart_2 = parseInt( $("#mathsecondnum").val(), 10 );       
		var correctMathSolution = parseInt( ( mathPart_1 + mathPart_2 ), 10 );
		var inputHumanAns = $("#humanCheckCaptchaInput").val();
		
		if( fname && validemail && service && message && mailchimpsubsc && (inputHumanAns == correctMathSolution) ) {
			$('#mailchimpForm2').ajaxChimp({
				//Change YOUR MAILCHIMP ACCOUNT LIST FORM ACTION URL
				url: 'https://YOUR MAILCHIMP ACCOUNT LIST FORM ACTION'
			});
		}
		
	});
	
	
	$("#mailchimpForm2").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			var mathPart_1 = parseInt( $("#mathfirstnum").val(), 10 );
			var mathPart_2 = parseInt( $("#mathsecondnum").val(), 10 );       
			var correctMathSolution = parseInt( ( mathPart_1 + mathPart_2 ), 10 );
			var inputHumanAns = $("#humanCheckCaptchaInput").val();
			
			
			if (inputHumanAns == correctMathSolution){
				//everything looks good!
				event.preventDefault();
				
				$('#processing-image').show();
				$('#submitButtonHolder').hide();
				
				$.ajax({
					type: "POST",
					url: "contact-process-mc.php",
					data: $( "#mailchimpForm2" ).serialize(),
					success : function(text){
						if ($.trim(text) === "success") {
							mailchimpForm2Success();
						} else {
							formError();
							submitContactMSG(false,text);
							sweetAlert("Oops...", text, "error");
						}
					},
					complete: function(){
						$('#processing-image').hide();
						$('#submitButtonHolder').show();
					}
				});
				
			}
			else{
				submitContactMSG(false, "Please solve Human Check Captcha!!!");
				sweetAlert("Oops...", "Please solve Human Captcha!!!", "error");
				return false;
			}
				
		}
	});	
	
	function mailchimpForm2Success(){
		if ($('#mailchimpsubsc').is(":checked")) {
			var mailchimpsubsc = 1;
		}
		else{
			var mailchimpsubsc = 0;
		}		
		$("#mailchimpForm2")[0].reset();
		
		if (mailchimpsubsc){
			submitContactMSG(true, "Your Message Submitted Successfully!!! Please check your email to Confirm Subscription");
			swal("Good job!", "Your Message Submitted Successfully!!! Please check your email to Confirm Subscription", "success");
		}else{
			submitContactMSG(true, "Your Message Submitted Successfully!!!");
			swal("Good job!", "Your Message Submitted Successfully!!!", "success");
		}
	}


/*
|--------------------------------------------------------------------------
	Quote Form
|--------------------------------------------------------------------------
*/	
	$("#quoteForm2").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitQuoteFormActionMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var phone = $("#phone").val();
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}
			
			if (validphone > 0){
				if ($("#g-recaptcha-response").val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "quote-process-2.php",
						data: $( "#quoteForm2" ).serialize(),
						success : function(text){
							if ($.trim(text) === "success") {
								quoteForm2Success();
							} else {
								formError();
								submitQuoteFormActionMSG(false,text);
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
									
				}
				else{
					submitQuoteFormActionMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
							
			}
			else{
				submitQuoteFormActionMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
			
		}
	});
	
	function quoteForm2Success(){
		$("#quoteForm2")[0].reset();		/* When Success form input will be reset. #quoteForm this ID should match your form ID */
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		submitQuoteFormActionMSG(true, "Your Quote Form Submitted Successfully!!!");	/* Success Message */
		swal("Good job!", "Your Quote Form Submitted Successfully!!!", "success");
	}
	
	
/*
|--------------------------------------------------------------------------
	Contact Form with Open Support Ticket Button
|--------------------------------------------------------------------------
*/
	$('#reqservice-or-support select[id=service]').on('change', function() {
		
		var service = $("#service").val();
		if(service == 'Support'){
			$('#reqservice-or-support .req-support-ticket-btn').show( 'fast' );
			$('#reqservice-or-support .req-support-ticket-btn').css('display', 'block');
			$('#submitButtonHolder').css('display', 'none');
			$('#support-ticket-quote-text-box').css('display', 'block');
			$( "#contactSupportForm input" ).prop( "disabled", true );
			$( "#contactSupportForm textarea" ).prop( "disabled", true );
		}
		else{
			$('#reqservice-or-support .req-support-ticket-btn').hide( 'fast' );
			$('#reqservice-or-support .req-support-ticket-btn').css('display', 'none');
			$('#submitButtonHolder').css('display', 'block');
			$('#support-ticket-quote-text-box').css('display', 'none');
			$( "#contactSupportForm input" ).prop( "disabled", false );
			$( "#contactSupportForm textarea" ).prop( "disabled", false );
		}
		
	});
	
	
	$("#contactSupportForm").validator().on("submit", function (event) {
		if (event.isDefaultPrevented()) {
			//handle the invalid form...
			formError();
			submitContactMSG(false, "Please fill in the form properly!");
			sweetAlert("Oops...", "Please fill in the form properly!!!", "error");
		} else {
			
			var reqserviceorsupport = $('#reqservice-or-support select#service').val();
			if(reqserviceorsupport == 'Support')
				return false;
			
			var phone = $("#phone").val();
			
			if(phone){
				var validphone = isPhone(phone);
				if(!validphone){
					$("#phone").css({"border-width": "2px", "border-color": "#ce0606"});
				}
			}	
			else{
				validphone = 1;
			}			
			
			if (validphone > 0){
				if ($("#g-recaptcha-response").val()) {
					//everything looks good!
					event.preventDefault();
					
					$('#processing-image').show();
					$('#submitButtonHolder').hide();
					
					$.ajax({
						type: "POST",
						url: "contact-process.php",
						data: $( "#contactSupportForm" ).serialize(),
						success : function(text){
							if ($.trim(text) === "success") {
								contactSupportFormSuccess();
							} else {
								formError();
								submitContactMSG(false,text);
								sweetAlert("Oops...", text, "error");
							}
						},
						complete: function(){
							$('#processing-image').hide();
							$('#submitButtonHolder').show();
						}
					});
					
				}
				else{
					submitContactMSG(false, "You are not a human!!!");
					sweetAlert("Oops...", "Seems! You are not a human!!!", "error");
					return false;
				}
					
			}
			else{
				submitContactMSG(false, "Please enter valid phone!!!");
				sweetAlert("Oops...", "Please enter valid phone!!!", "error");
				return false;
			}
		}
	});
	
	function contactSupportFormSuccess(){
		$("#contactSupportForm")[0].reset();
		submitContactMSG(true, "Your Message Submitted Successfully!!!");
		$( "#submitButtonHolder" ).html( '<div class="h3 text-center text-success"> Thank you. We will get back to you soon!!! </div>' );
		swal("Good job!", "Your Message Submitted Successfully!!!", "success");
	}
	
	
/*
|--------------------------------------------------------------------------
	Common function
|--------------------------------------------------------------------------
*/		
	function isEmail(email) {
		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		return regex.test(email);
	}
	
	function isPhone(phone) {
		var filter = /^((\+[1-9]{1,4}[ \-]*)|(\([0-9]{2,3}\)[ \-]*)|([0-9]{2,4})[ \-]*)*?[0-9]{3,4}?[ \-]*[0-9]{3,4}?$/;
		if (filter.test(phone)) {
			var validphone = 1;
		}
		else{
			var validphone = 0;
		}
		return validphone;
	}
	
	function formError(){
		$(".help-block.with-errors").removeClass('hidden');
	}
	
	function submitContactMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center text-success";
		} else {
			var msgClasses = "h3 text-center text-danger";
		}
		$("#msgContactSubmit").removeClass().addClass(msgClasses).text(msg);
		return false;
	}	
	
	function submitQuoteFormActionMSG(valid, msg){
		if(valid){
			var msgClasses = "h3 text-center text-success";
		} else {
			var msgClasses = "h3 text-center text-danger";
		}
		$("#msgQuoteSubmit").removeClass().addClass(msgClasses).text(msg);
		return false;
	}	
	
	
/*
|--------------------------------------------------------------------------
	Print Current Year in html footer copyright
|--------------------------------------------------------------------------
*/
	$('span#mgsYear').html( new Date().getFullYear() );
	
		
})(jQuery);

/*
|--------------------------------------------------------------------------
	End
|--------------------------------------------------------------------------
*/