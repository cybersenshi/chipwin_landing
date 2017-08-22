$(document).ready(function() {
	$("#nlSub").submit(function(e){
		e.preventDefault(); 
		
		var $form = $(this),
		email = $form.find('input[name="email"]').val(),
		url = $form.attr('action');
		
		if(email.toLowerCase().indexOf("dickbutt") >= 0){
			window.location.href = "http://www.viridianforge.com/Apps/ChipWINHubTest/eggs/dickbutt.html";
		}
		else if(email.toLowerCase().indexOf("other m++") >= 0 || email.toLowerCase().indexOf("otherm++") >= 0){
			window.location.href = "http://www.viridianforge.com/Apps/ChipWINHubTest/eggs/othermno.html";
		}
		else{
			$.post(url, {email:email},
				function(data) {
					if(data){
						if(data=="Some fields are missing."){
							$("#status").text("Did you forget your e-mail?");
							$("#status").css({"display":"block","border":"1px solid red"});
						}
						else if(data=="Invalid email address."){
							$("#status").text("Sorry, that wasn't a valid e-mail address.");
							$("#status").css({"display":"block","border":"1px solid red"});
						}
						else if(data=="Invalid list ID."){
							$("#status").text("Woah, the script's ListID is broke!  Let viridianforge@chiptuneswin.com know!");
							$("#status").css({"display":"block","border":"1px solid red"});
						}
						else if(data=="Already subscribed."){
							$("#status").text("You're already a subscriber, thanks!");
							$("#status").css({"display":"block","border":"1px solid green"});
						}
						else{
							$("#status").text("You're subscribed!");
							$("#status").css({"display":"block","border":"1px solid green"});
						}
					}
					else{
						$("#status").text("We're sorry, looks like the server is borked. Please try again later!");
						$("#status").css({"display":"block","border":"1px solid red"});
					}
				});
			}});
	
	$("#nlSubmit").click(function(e){
		e.preventDefault(); 
		$("#nlSub").submit();
	});
});
