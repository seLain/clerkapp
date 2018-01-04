import React, { Component } from 'react';
import CleanNavigator from './Utils.js';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Alert,
  Button,
  AsyncStorage
} from 'react-native';

var Config = require('./Config.js');

class UserLoginScene extends Component {

	constructor(props) {
    super(props);
    this.state = {
      password: '',
      username: '',
    }
  }

  async onGoClick() {
    const { navigate } = this.props.navigation;
    const { username, password } = this.state;

    if(!username || !password) {
      Alert.alert('Account or Password Empty');
      return;
    }

    /* #CODE_SECTION */
    /*    vetify username / password */
    var login_url = Config.SERVER_URL + '/inventorycheck/app_login';
    let response = await fetch(login_url, 
                               {method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  username: username,
                                  password: password,
                                })
                               },);
    let responseJSON = await response.json();
    
    if(responseJSON.verified == 'true'){
    	/* product data loading */
    	/* this.productDataLoading(); */
    	/* update task list from ERP server */
    	/* var tasks = this.updateTask(); */
      /* Alert.alert(tasks.list.length.toString()); */
    	/* go to mainmenu */
      CleanNavigator.resetNavigation(this, 'UserMainScene', { username: this.state.username });
    }else{
      Alert.alert('Account or Password Error');
    }

    /* #SECTION_CODE */
  }
  
  render() {
  	const {password, username, spinnerShow} = this.state;
    return (
      <View style={styles.container}>
        <View style={{flex: 1, flexDirection: 'column'}}>
          <Image source={require('../img/logo.png')} style={styles.responsiveImg}/>
          <TextInput style={styles.textInput}
            onChangeText={ (username) => {this.setState({username})}}
            placeholder='Clerk Account'
            placeholderTextColor='blue'
            underlineColorAndroid='blue'
            autoCorrect={false}
            value={username} />
          <TextInput style={styles.textInput}
            onChangeText={ (password) => {this.setState({password})}}
            placeholder='Clerk Password'
            secureTextEntry
            placeholderTextColor='blue'
            underlineColorAndroid='blue'
            autoCorrect={false}
            value={password} />
          <View style={styles.btnStartWrapper}>
            <Button style={styles.btnSignIn}
                    color={'#1194f6'}
                    textStyle={{fontSize: 24, color: 'white'}} 
                    onPress={this.onGoClick.bind(this)}
                    title='      Login      ' />
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  textWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 60
  },

  textInput: {
    alignSelf: 'center',
    height: 50,
    width: 250,
    marginTop: 20,
    marginBottom: 0,
    color: 'blue',
    fontSize: 17,
  },

  btnStartWrapper: {
    flex: 1, 
    alignSelf:'center', 
    bottom: -40
  },

  btnSignIn: {
    backgroundColor: '#48baeb',
    borderWidth: 0,
    padding: 20,
    height: 50,
    paddingTop: 23,
    width: 250
  },

  btnGroup: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 100
  },

  // style code from 
  // https://gist.github.com/tpraxl/02dc4bfcfa301340d26a0bf2140cd8b9
  responsiveImg: {
    // Image dimensions are known: 510, 400
    aspectRatio: (510 / 400),
    // Make sure the image stretches and shrinks
    width: '40%',
    height: '40%',
    // Make sure the image doesn't exceed it's original size
    // If you want it to exceed it's original size, then
    // don't use maxWidth / maxHeight or set their 
    // value to null
    maxWidth: 510,
    maxHeight: 400,
    // center horizontally
    marginLeft: 'auto',
    marginRight: 'auto',
    // make sure, the image is resized properly:
    resizeMode: 'contain',
    // demonstrate the dimensions of the image
    alignSelf: 'center',
    // margins
    marginTop: 40,
  },

});

module.exports = UserLoginScene;