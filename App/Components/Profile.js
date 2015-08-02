var React = require("react-native");
var Badge = require("./Badge");

var {
	Text,
	View,
	ScrollView,
	StyleSheet
} = React

class Profile extends React.Component{
	render(){
		return(
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo} />
			</ScrollView>
		);
	}
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  rowContainer: {
    padding: 10
  },
  rowTitle: {
    color: '#48BBEC',
    fontSize: 16
  },
  rowContent: {
    fontSize: 19
  }
});

module.exports = Profile;