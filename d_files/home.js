var more_btn = document.getElementById('more_btn'),
	about = document.getElementById('about'),
	content = document.getElementById('content'),
	blurred = document.getElementById('blurred'),
	blur_wrap = document.getElementById('blur_wrap'),
	scrolldown = document.getElementById('scrolldown'),
	newsletter_form = document.getElementById('newsletter_form'),
	newsletter_input = document.getElementById('newsletter_input'),
	newsletter_btn = document.getElementById('newsletter_btn'),
	helper_cleared = false,
	win_h = window.innerHeight,
	scroll_top_cache = false,
	translation;

document.getElementById('my_email').setAttribute("href", "mailto:drew@drewwilson.com");

if(document.body.scrollTop <= 100){
	var scroll_help = setTimeout(function(){
		if(!helper_cleared){
			scrolldown.className = 'show';
		}
	}, 1000);
}

if(typeof window.orientation == 'undefined'){

	blur_wrap.innerHTML = content.innerHTML;
	blurred.style.height = win_h+'px';

	window.addEventListener('scroll',function(){
		var scrt = (document.all)? document.body.scrollTop : window.pageYOffset;
		translation = 'translate3d(0,' + (-scrt + 'px') + ',0)';
		blur_wrap.style.cssText = '-webkit-transform:'+translation+';-moz-transform:'+translation+';transform:'+translation+';height:'+win_h+'px';

		if(!helper_cleared){
			scrolldown.className = 'hide';
			helper_cleared = true;
		}
	});
} else {
	document.documentElement.className = "mobile";
	window.addEventListener('scroll',function(){
		if(!helper_cleared){
			clearTimeout(scroll_help);
			helper_cleared = true;
		}
	});
}

window.onresize = function(){
	win_h = window.innerHeight;
	blurred.style.height = win_h+'px';
};

window.onkeydown = function(e){
	if(e.which == 27 || e.keyCode == 27){
		close_modal();
	}
};

more_btn.onclick = function(e){
	e.preventDefault();

	if(window.innerHeight <= 600 || window.innerWidth <= 360){
		scroll_top_cache = document.body.scrollTop;
		document.body.scrollTop = 0;
	}

	document.body.className = 'more';
};

about.onclick = function(e){
	if(e.target.id == 'about' || e.target.className == 'wrap' || e.target.id == 'close'){
		close_modal();
		e.preventDefault();
	}
};

function close_modal(){
	document.body.className = '';
	if(scroll_top_cache){
		document.body.scrollTop = scroll_top_cache;
		scroll_top_cache = false;
	}
}

function call_me(data){
	if (data.Status == 200){
		alert("Success: " + data.Message);
		newsletter_input.value = '';
	} else {
		alert("Error: " + data.Message);
	}
}

function do_submit(){
	var script = document.createElement('script');
	script.src = newsletter_form.action + '?cm-fydtdu-fydtdu='+newsletter_input.value+'&callback=call_me';
	document.getElementsByTagName('head')[0].appendChild(script);
	document.getElementsByTagName('head')[0].removeChild(script);
}

newsletter_form.onsubmit = function(e){
	e.preventDefault();
	do_submit();
};

newsletter_btn.onclick = function(e){
	e.preventDefault();
	do_submit();
};


if(window.devicePixelRatio >= 1.2){
    var images = document.getElementsByTagName('img');
    for(var i=0;i < images.length;i++){
        var attr = images[i].getAttribute('data-2x');
        if(attr){
            images[i].src = attr;
        }
    }
}

document.addEventListener("touchstart", function(){}, true);
