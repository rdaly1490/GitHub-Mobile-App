var React = require("react-native");
var api = require("../Utils/api");
var Dashboard = require("./Dashboard");

var {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableHighlight,
	ActivityIndicatorIOS
} = React;

class Main extends React.Component{
	constructor(props) {
		super(props); //passes all properties from React Component (parent) to Main
		this.state = { //setting initial state
			username: "", //here we add things this component will manage
			isLoading: false,
			error: false
		}
	}

	handleChange(event){ //can use this instead of that=this b/c of bind below
		this.setState({
			username: event.nativeEvent.text
		}) //now state will update itself whenever someone types into input field
	}

	handleSubmit() {
		//updates the indicator ios spinner
		this.setState({
			isLoading:true
		});
		console.log("Submit", this.state.username)
		//fetch data from github
		//re-routes to next route passing in that github info
		api.getBio(this.state.username)
			.then((res) => { //need .then b/c .json() in api.js returns a promise
				if (res.message === "Not Found") {
					this.setState({
						error: "User Not Found",
						isLoading: false
					});
				} else {
					this.props.navigator.push({
						title: res.name || "Select an Option",
						component: Dashboard,
						passProps: {userInfo:res} //passing through fetch results to dash as userInfo
					});
					this.setState({ //here we make it so if we go back afterwards the state will return to default/initial
						isLoading:false,
						error:false,
						username:""
					});
				}
			});

	}

	render() {

		var showErr = (
			this.state.error ? <Text>{this.state.error}</Text> : <View></View>
		);
		return(
			<View style={styles.mainContainer}>
				<Text style={styles.title}>Search For A Github User</Text>
				<TextInput
					style={styles.searchInput}
					value={this.state.username}
					onChange={this.handleChange.bind(this)} />
				<TouchableHighlight
					style={styles.button}
					onPress={this.handleSubmit.bind(this)}
					underlayColor="white">
						<Text style={styles.buttonText}>SEARCH</Text>
				</TouchableHighlight>
				<ActivityIndicatorIOS
					animating={this.state.isLoading}
					color="#111"
					size="large"></ActivityIndicatorIOS>
				{showErr}
			</View>
		);
	}
};

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});

module.exports = Main;