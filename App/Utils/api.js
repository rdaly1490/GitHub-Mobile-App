var api = {
	getBio(username){
		username = username.toLowerCase().trim();
		var url = `https://api.github.com/users/${username}`;
		return fetch(url)
				.then((res) => res.json());
	},
	getRepos(username){
		username = username.toLowerCase().trim();
		//Here we use es6 to add var to string.  Better string concatination
		var url = `https://api.github.com/users/${username}/repos`;
		return fetch(url)
				//res.json returns another promise so need then again
				//=> keeps context of parent element so dont need to bind this or do that=this
				.then((res) => res.json());
	},
	getNotes(username){
		//react-native doesn't support web sockets so use firebases restful api
		username = username.toLowerCase().trim();
		var url = https://github-app.firebaseio.com/${username}.json;
		return fetch(url)
				.then((res) => res.json());
	},
	addNote(username, note){
		username = username.toLowerCase().trim();
		var url = https://github-app.firebaseio.com/${username}.json;
		return fetch(url, {
			method: "post",
			body: JSON.stringify(note)
		}).then((res) => res.json());
	}
};

module.exports = api;