import React from 'react';
import {
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	Text,
	View,
	ActivityIndicator,
	ListItem
} from 'react-native';
import {
	SecureStore
} from 'expo';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Friends',
  };


	constructor(props) {
		super(props);
		this.state = {
			isLoading: true,
			friendTime: false,
		};
	}

	getFriends = async() => {

		if(this.state.friendTime){
			return;
		}

		let token = await SecureStore.getItemAsync('secure_token');

		try{
			fetch('https://guild-app.com/php/grabAllFriends.php', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					token: token
				})
			})
			.then(response => response.json())
			.then((json) =>{
				this.setState({
					isLoading: false,
					friendTime: this.state.friendTime,
					data: json
				});
				return;
			})
		}catch(e){
			console.log(e)
		}
	}

	//this should navigate to another screen for just the friend's posts
	//after should have a back button on that screen to navigate back to this screen
	onClick = async(name) =>{

    let token = await SecureStore.getItemAsync('secure_token');

    try{
			fetch('https://guild-app.com/php/grabAllPosts.php', {
				mode: 'cors',
				method: 'POST',
				headers: {
					'Accept': 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
          token: token,
          username: name,
        })
			})
      .then(response => response.json())
      .then((json) =>{

        let posts = json

        this.setState({
          isLoading: false,
          friendTime: true,
          data: this.state.data,
          posts: json
        });
      })
		}catch(e){
			console.log("error", e)
		}

	}

	//goes from friendTime to default screen
	onBackClick = () =>{
		this.setState({
			isLoading: false,
			friendTime: false,
			data: this.state.data
		});
	}

	render(){

		let friends = this.getFriends();

		if(this.state.isLoading){
			return (
				<View style={styles.loading}>
					<ActivityIndicator size="large"/>
				</View>
			);
		}

		if(this.state.friendTime){
			return(
        <ScrollView>
          <TouchableOpacity
          style={styles.container}
          onPress={this.onBackClick}>
            <Text>BACK</Text>
          </TouchableOpacity>
          <View>{
            this.state.posts.map((stuff, i) => (
              <View>
                  <Text style={styles.posts}>
                    {stuff.content}{'\n'}
                    <Text>Likes: </Text>{stuff.num_likes}{'\n'}
                    {stuff.time_created}
                  </Text>
              </View>
            ))
          }</View>
        </ScrollView>
        )
		}

		//lists out our friends with nice little buttons
		return (
			<ScrollView>{
				this.state.data.map((stuff, i) => (
					<View>
						<TouchableOpacity
						style={styles.container}
						onPress={()=>this.onClick(stuff.username)}>
							<Text style={styles.text}>
								{stuff.username}
							</Text>
						</TouchableOpacity>
					</View>

				))
			}</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 30,
		margin: 5,
		borderColor: '#000000',
		borderWidth: 1,
		backgroundColor: '#ffffff'
	},
	loading:{
		paddingTop: 30,
	},
	text: {
		fontSize: 24,
	},
	posts: {
		borderRadius: 5,
		borderWidth: 2,
		borderColor: '#b20949',
		fontSize: 24,
		padding: 2,
		margin: 10

	}
});