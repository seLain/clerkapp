import React, { Component } from 'react';
import CleanNavigator from './Utils.js';
import { BackHandler } from 'react-native';

import { View, 
         StyleSheet, 
         Button, 
         Alert,
         Text,
         Image,
         TouchableOpacity,
         TouchableHighlight,
         ListView,
       } from 'react-native';

import MessageList from '../model/MessageList';
import ClerkMessage from '../model/Message';

var Config = require('./Config.js');

class UserMainScene extends Component {

	constructor(props) {
    super(props);
    this.tasks = this.props.tasks;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      username: this.props.navigation.state.params.username,
      messageList: new MessageList('MessageList'),
      dataSource: this.ds.cloneWithRows([  /* to avoid empty section warning */
        {name: '訊息1', id: 1}, ]),
    }
    this.updateMessage();
    /* bind onLogout to enable deep callback */
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.onLogout);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.onLogout);
  }

  async updateMessage(){
    
    /* retreive task data from server */
    let response = await fetch(Config.SERVER_URL + '/inventorycheck/update_clerk_messages/', 
                               {method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  username: this.state.username,
                                })
                               });
    let responseJSON = await response.json();

    /* update task list in scene */
    this.setState({dataSource: this.ds.cloneWithRows(responseJSON.list),});
    
    /* put task data into TaskList */
    for(var m in responseJSON.list){
      var message = new ClerkMessage(m.content);
      this.state.messageList.add_message(message);
    }

  }

  onToDoTasks(){
  	const { navigate } = this.props.navigation;
  	navigate('UserToDoScene', { username: this.state.username });
  }

  onDoneTasks(){
  	const { navigate } = this.props.navigation;
  	navigate('UserDoneScene', { username: this.state.username });
  }

  onLogout(){
  	/* #CODE_SECTION */
  	/*   logout alert  */
    Alert.alert(
      'Logout Alert',
      'Sure to logout ?',
      [
        {text: 'OK', onPress: () => { 
            console.log('OK Pressed'); 
            /*   inventory update function call */
            this.inventoryUpdate();
            /*   rediret to login page */
            CleanNavigator.resetNavigation(this, 'UserLoginScene', {});
        }},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  	/* #SECTION_CODE */
    return true;
  }

  inventoryUpdate(){
  	/* update to ERP server */
  	/* Alert.alert('inventory update'); */
  }

  async onReGen(){
    let response = await fetch(Config.SERVER_URL + '/inventorycheck/regenerate_tasks', 
                         {method: 'POST',
                          headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                          },
                          body: JSON.stringify({
                            username: this.state.username,
                          })
                         });
    let responseJSON = await response.json();
  }

  render() {
  	return (
      <View style={styles.container}>
    		<View style={styles.func_container}>
            <View style={styles.btnRow}>
              <View style={styles.btnWrapper}>
                <Button style={styles.btnFuncOption} 
                        textStyle={{fontSize: 24, color: 'white'}} 
                        onPress={this.onToDoTasks.bind(this)}
                        title='Check Jobs ToDo' />
              </View>
              <View style={styles.btnWrapper}>
                <Button style={styles.btnFuncOption} 
                        textStyle={{fontSize: 24, color: 'white'}} 
                        onPress={this.onDoneTasks.bind(this)}
                        title='Check Jobs Done' />
              </View>
            </View>
            <View style={styles.btnRow}>
              <View style={styles.btnWrapper}>
                <Button style={styles.btnFuncOption} 
                        textStyle={{fontSize: 24, color: 'white'}} 
                        onPress={this.onReGen.bind(this)}
                        title='Regenerate Jobs (for Demo)' />
              </View>
            </View>
            <View style={styles.btnRow}>
              <View style={styles.btnWrapper}>
                <Button style={styles.btnFuncOption} 
                        textStyle={{fontSize: 24, color: 'white'}} 
                        onPress={this.onLogout.bind(this)}
                        title='Logout' />
              </View>
            </View>
            <View style={styles.messageBlock}>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={(rowData) =>
                    <View style={styles.messageItem}>
                      <TouchableHighlight onPress={this.updateMessage.bind(this)}>
                        <Text style={{marginLeft:5, marginTop:3, fontSize: 18, color:'blue'}}>
                          {rowData.content}
                        </Text>
                      </TouchableHighlight>
                    </View>
                  }
              />
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

  bgImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0  
  },

  image: {
    width: 300,
    height: 150,
    alignSelf: 'center',
    resizeMode: 'cover',
    marginTop: 60,
    marginBottom: 30
  },

  bg: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },

  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#61b5ff',
    height: 30
  },

  title: {
    color: '#d8261a',
    alignSelf:'center', 
    fontSize: 16,
  },

  func_container: {
    flex: 9,
    flexDirection: 'column',
    flexWrap: 'wrap'
  },

  btnRow: {
    flex:1,
    flexDirection: 'row',
    padding: 5,
  },

  btnWrapper: {
    flex: 1, 
    alignSelf: 'stretch',
    padding: 10,
  },

  btnFuncOption: {
    backgroundColor: '#48baeb',
    borderWidth: 0,
  },

  messageBlock: {
    flex: 3,
    padding: 5,
  },

  messageItem: {
    flex: 1,
    flexDirection: 'row',
  },

  footer_btn_group: {
    flex: 0.1,
    flexDirection: 'row',
    alignSelf: 'stretch'
  },

  btnFooter: {
    height: 30, 
    marginTop: 10,
    backgroundColor: '#48baeb',
  }

});

module.exports = UserMainScene;