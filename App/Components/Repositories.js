var React = require("react-native");
var Badge = require("./Badge");
var Seperator = require("./Helpers/Seperator");
var Web_View = require("./Helpers/WebView");

var {
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	StyleSheet
} = React;

class Repositories extends React.Component{
	//passing in repos[index] url
	openPage(url){
		// console.log(this);
		// console.log("the url is", url);
		this.props.navigator.push({
			component: Web_View,
			title: "Web View",
			passProps: {url}
		});
	}
	render(){
		var repos = this.props.repos;
		var content = repos.map((item, index) => {
			//Not every repo has a description so I check here
			var desc = repos[index].description ? <Text style="styles.description">{repos[index].description}</Text> : <View></View>;
			return(
				<View key={index}>
					<View style={styles.rowContainer}>
						<TouchableHighlight
							//binding this and the url of the current iteration to reference in openPage
							onPress={this.openPage.bind(this, repos[index].html_url)}
							underlayColor="transparent">
							<Text style={styles.name}>{repos[index].name}</Text>
						</TouchableHighlight>
						<Text style={styles.stars}>{repos[index].stargazers_count}</Text>
						{desc}
					</View>
					<Seperator />
				</View>
			);
		});
		return(
			<ScrollView style={styles.container}>
				<Badge userInfo={this.props.userInfo} />
				{content}
			</ScrollView>
		);
	}
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'column',
    flex: 1,
    padding: 10
  },
  name: {
    color: '#48BBEC',
    fontSize: 18,
    paddingBottom: 5
  },
  stars: {
    color: '#48BBEC',
    fontSize: 14,
    paddingBottom: 5
  },
  description: {
    fontSize: 14,
    paddingBottom: 5
  }
});

Repositories.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired
}

module.exports = Repositories;