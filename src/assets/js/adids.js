
/* (function($) {			
	getGoogleIDScript('UA-113500078-1');
	getFacebookIDScript('dopay','174269663186327');
	getTwitterIDScript('nymxq');			
})(jQuery); */

// Global site tag (gtag.js) - Google Analytics
function getGoogleIDScript(id) {
	var str = '';
	//global gtag.js 
	var script1 = document.createElement("script");	
	script1.language = 'javascript';
	script1.async = true;
	str = 'https://www.googletagmanager.com/gtag/js?id=' + id ;
	script1.src = str;
	document.body.appendChild(script1);		
	
	var script2 = document.createElement("script");
	script2.type = "text/javascript";
	str = ' window.dataLayer = window.dataLayer || [] ;' +
		  ' function gtag(){dataLayer.push(arguments);} ' +
		  ' gtag(\'js\', new Date()); ' +
		  ' gtag(\'config\', ' + '\'' + id + '\');';
	script2.appendChild(document.createTextNode(str));
	document.body.appendChild(script2);	
}

//Google Analytics
function getAnalyticsIDScript(id) {
	var str = '';
	var script = document.createElement("script");
	str = ' (function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){ '+
		  ' (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o), '+
		  ' m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m) '+
		  ' })(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\'); '+
		  ' ga(\'create\', \''+ id +'\', \'auto\');';
	script.appendChild(document.createTextNode(str));
	document.body.appendChild(script);	
}

// Facebook Pixel Code
function getFacebookIDScript(type,id) {
	var str = '';
	if(type == 'index'){
		var script1 = document.createElement("script");
		script1.type = "text/javascript";
		str = ' !function(f,b,e,v,n,t,s) ' +
				  ' {if(f.fbq)return;n=f.fbq=function(){n.callMethod? ' +
				  ' n.callMethod.apply(n,arguments):n.queue.push(arguments)}; '+
				  ' if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\'; '+
				  ' n.queue=[];t=b.createElement(e);t.async=!0; '+
				  ' t.src=v;s=b.getElementsByTagName(e)[0]; '+
				  ' s.parentNode.insertBefore(t,s)}(window, document,\'script\', '+
				  ' \'https://connect.facebook.net/en_US/fbevents.js\'); '+
				  ' fbq(\'init\', ' + '\'' + id + '\' ); '+
				  ' fbq(\'track\', \'PageView\'); ' ;
		script1.appendChild(document.createTextNode(str));
		document.body.appendChild(script1);			
		
		var script2 = document.createElement("noscript");
		str = ' <img height="1" width="1" style="display:none" '+
			  ' src="https://www.facebook.com/tr?id='+ id +'&ev=PageView&noscript=1"/> ';
		script2.appendChild(document.createTextNode(str));
		document.body.appendChild(script2);	  
	}else if(type == 'buy'){		
		var script = document.createElement("script");
		script.type = "text/javascript";
		str = ' !function(f,b,e,v,n,t,s) ' +
				  ' {if(f.fbq)return;n=f.fbq=function(){n.callMethod? ' +
				  ' n.callMethod.apply(n,arguments):n.queue.push(arguments)}; '+
				  ' if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\'; '+
				  ' n.queue=[];t=b.createElement(e);t.async=!0; '+
				  ' t.src=v;s=b.getElementsByTagName(e)[0]; '+
				  ' s.parentNode.insertBefore(t,s)}(window, document,\'script\', '+
				  ' \'https://connect.facebook.net/en_US/fbevents.js\'); '+
				  ' fbq(\'init\', ' + '\'' + id + '\' ); '+
				  ' fbq(\'track\', \'AddPaymentInfo\'); ' ;
		script.appendChild(document.createTextNode(str));
		document.body.appendChild(script);
	} else if(type == 'dopay'){
		var script = document.createElement("script");
		script.type = "text/javascript";
		str = ' !function(f,b,e,v,n,t,s) ' +
				  ' {if(f.fbq)return;n=f.fbq=function(){n.callMethod? ' +
				  ' n.callMethod.apply(n,arguments):n.queue.push(arguments)}; '+
				  ' if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\'; '+
				  ' n.queue=[];t=b.createElement(e);t.async=!0; '+
				  ' t.src=v;s=b.getElementsByTagName(e)[0]; '+
				  ' s.parentNode.insertBefore(t,s)}(window, document,\'script\', '+
				  ' \'https://connect.facebook.net/en_US/fbevents.js\'); '+
				  ' fbq(\'init\', ' + '\'' + id + '\' ); '+
				  ' fbq(\'track\', \'Purchase\', {value: \'0.00\', currency: \'USD\'}); ' ;
		script.appendChild(document.createTextNode(str));
		document.body.appendChild(script);
	}
		
}

//Twitter universal website tag code
function getTwitterIDScript(id) {
	var str = '';
	var script = document.createElement("script");
	script.type = "text/javascript";
	str = ' !function(e,t,n,s,u,a){e.twq||(s=e.twq=function(){s.exe?s.exe.apply(s,arguments):s.queue.push(arguments); ' +
		  ' },s.version=\'1.1\',s.queue=[],u=t.createElement(n),u.async=!0,u.src=\'//static.ads-twitter.com/uwt.js\', ' +
		  ' a=t.getElementsByTagName(n)[0],a.parentNode.insertBefore(u,a))}(window,document,\'script\');  '+
		  ' twq(\'init\', ' + '\'' + id + '\'); ' +
		  ' twq(\'track\',\'PageView\'); ';
		
	script.appendChild(document.createTextNode(str));
	document.body.appendChild(script);	
}






