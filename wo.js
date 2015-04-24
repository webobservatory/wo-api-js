//-------------------------------API lib-------------------------------------------
var WO = function(base, client_id)
{
	var woHost = "https://" + base,
	resourceHost = "https://" + base + "/api/wo/",
	endUserAuthorizationEndpoint = woHost + "/oauth/authorise",
	authURL = endUserAuthorizationEndpoint +
	"?response_type=token" +
	"&client_id=" + client_id +
	"&redirect_uri=" + window.location;
		
	this.login = function ()
	{
		//var form = document.createElement('form');
		//form.setAttribute('method', 'post');
		//form.setAttribute('action', authURL);
		//form.style.display = 'hidden';
		//document.body.appendChild(form)
		//form.submit();
		location.href=authURL;
	};

	//helper function to extract the Access Token
	var extractToken = function(hash)
	{
		var match = hash.match(/access_token=((%|\w)+)/);
		return !!match && decodeURIComponent(match[1]);
	};

	//public functions

	//query a dataset identified by dataset id
	this.query = function(id, options, callback)
	{
		var token = extractToken(document.location.hash);

		var opts;
		if (typeof options == 'string')
                {
                        opts = {query:options};
                }
		else
		{
			//TODO check compulsory fields, e.g. 'query' must exist and be a string
			opts = options;
		}

		if (token)
		{
			$.ajax(
			{
				type: 'get',
				url: woHost +'/api/wo/'+ id + '/endpoint',
				data: opts,
				headers:
				{
					Authorization: 'Bearer ' + token
				}
			}).done(callback);
			
			//console.log(token);
			//console.log(id);
			//console.log(options);
			//console.log(woHost +'/api/wo/'+ id + '/endpoint');
			
		}
		else
		{
			//TODO return an error code via callback
			console.log("need to login before making query");
			location.href=authURL;
		}
	};
	
};
