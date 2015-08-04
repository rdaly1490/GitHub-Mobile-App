var React = require("react-native");
var Profile = require("./Profile");
var Repositories = require("./Repositories");
var Notes = require("./Notes");
var api = require("../Utils/api");

var {
	Text,
	View,
	StyleSheet,
	Image,
	TouchableHighlight
} = React

class Dashboard extends React.Component{

	makeBackground(btn){
		var obj = {
			flexDirection: "row",
			alignSelf: "stretch",
			justifyContent: "center",
			flex: 1
		}

		if (btn === 0){
			obj.backgroundColor = "#22253E"
		}else if (btn === 1){
			obj.backgroundColor = "#AF3036"
		}else{
			obj.backgroundColor = "#E85A45"
		}

		return obj
	}

	goToProfile(){
		console.log("profile");
		this.props.navigator.push({
			title: "Profile",
			component: Profile,
			passProps: {userInfo:this.props.userInfo} //passing userinfo prop to profile and in-turn to badge
		});
	}
	goToRepos(){
		//call function from api file pssing in login (username)
		//getRepos function fetches from the /repos endpoint to retrieve them
		api.getRepos(this.props.userInfo.login)
			.then((res) => {
				this.props.navigator.push({
					title: "Repos",
					component: Repositories,
					passProps: {
						userInfo:this.props.userInfo,
						repos: res
					}
				});
			});
	}
	goToNotes(){
		api.getNotes(this.props.userInfo.login)
			.then((res) => {
				//empty object helps it not error out if no notes yet
				res = res || {}
				this.props.navigator.push({
					component: Notes,
					title: "Notes",
					passProps: {
						notes: res,
						userInfo: this.props.userInfo
					}
				});
			});
	}

	render(){
		return(
			<View style={styles.container}>
				<Image source={{uri:this.props.userInfo.avatar_url}} style={styles.image} />
				<TouchableHighlight
					style={this.makeBackground(0)}
					onPress={this.goToProfile.bind(this)}
					underlayColor="#88D4F5">
						<Text style={styles.buttonText}>View Profile</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(1)}
					onPress={this.goToRepos.bind(this)}
					underlayColor="#88D4F5">
						<Text style={styles.buttonText}>View Repos</Text>
				</TouchableHighlight>
				<TouchableHighlight
					style={this.makeBackground(2)}
					onPress={this.goToNotes.bind(this)}
					underlayColor="#88D4F5">
						<Text style={styles.buttonText}>View Notes</Text>
				</TouchableHighlight>
			</View>
		);
	}
};

var styles = StyleSheet.create({
  container: {
    marginTop: 65,
    flex: 1
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

module.exports = Dashboard;