var React = require("react-native");
var Badge = require("./Badge");

var {
	Text,
	View,
	ScrollView,
	StyleSheet
} = React

class Profile extends React.Component{
	//function to format items in the array when rendered on page
	getRowTitle(user, item){
		item = (item === "public_repos") ? item.replace("_"," ") : item;
		return item[0] ? item[0].toUpperCase()+item.slice(1) : item;
	}
	render(){
		//this.props.userInfo comes from dash, assigning to variable
		var userInfo = this.props.userInfo;
		//Array of info I want to display
		var topicArray = ["company","location","followers","following","email","bio","public_repos"];
		//mapping content: if exists on user page will display otherwise empty view
		//uses array index as key for react
		var content = topicArray.map((item, index) => {
			//[ ] b/c array, stop thinking it's an object!
			if(!userInfo[item]) {
				return <View key={index}></View>
			}else {
				return(
					<View key={index}>
						<Text style={styles.rowTitle}>{this.getRowTitle(userInfo, item)}</Text>
						<Text style={styles.rowContent}>{userInfo[item]}</Text>
					</View>
				);
			}
		});
		return(
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo} />
				{content}
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
    marginTop: 12,
    marginBottom: 4,
    fontSize: 16
    // alignSelf: 'center'
  },
  rowContent: {
    fontSize: 19,
    marginBottom: 8
    // alignSelf: 'center'
  }
});

module.exports = Profile;