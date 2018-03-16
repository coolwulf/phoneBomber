var request= require('request');

var request = request.defaults({jar: true});

// var sleep = require('system-sleep');

var zillowUrl='https://www.zillow.com/madison-wi-53717/';

var name='John Oliver';
var phoneNum='8635351455';
var emailAddress='youremail@gmail.com';

for (var i=1;i<10;i=i+1){

	var loginUrl=zillowUrl+'real-estate-agent-reviews/?sortBy=None&page='+i;

	var ver=Math.floor(Math.random() * 99); 

	var userAgent='Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/11.0.696.34 Safari/534.'+ver+'.';

	var r=request({
		uri: loginUrl,
		method:'GET',
		followRedirect: true,
		maxRedirects: 10,	
		headers: {
			'User-Agent':userAgent,
		},					
	}, function(error, res, body){
		var idx=1;
		var prev='';
		while (idx>0) {
			idx=body.indexOf('/profile/');
			var tmp=body.substr(idx);
			idx=tmp.indexOf('"');
			var tmp2=tmp.substr(0,idx);
			if (tmp2.indexOf('#')<0 && tmp2!=prev) {
				prev=tmp2;
				console.log(tmp2);

				var newUrl='https://www.zillow.com'+tmp2;

						request({
							url: newUrl,
							method: 'GET',
							followRedirect: true,
							maxRedirects: 10,
							headers: {
								'User-Agent':userAgent,
							},						
						}, function (error, res, body){
							var index=body.indexOf('zuid=');
							var temp=body.substr(index+6);
							index=temp.indexOf('"');
							temp=temp.substr(0,index);
							if (temp.indexOf('1-')>0){

								var submitUrl='https://www.zillow.com/contact/profile/ProfileContactSubmit.htm?name='+name+'&phone='+phoneNum+'&email='+emailAddress+'&message=&isPremierAgent=true&zuid='+temp+'&formLocationType=7&mobileProfile=false';
								request({
									url: submitUrl,
									method: 'GET',
									followRedirect: true,
									maxRedirects: 10,
									headers: {
										'User-Agent':userAgent,
									},						
								}, function (error, res, body){						
									console.log(body);	
								});
							}
						});
			}	
			body=tmp.substr(idx);	
		}


	});

}