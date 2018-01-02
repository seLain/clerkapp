import React, { Component } from 'react';

import { View, 
	     StyleSheet, 
	     Button, 
	     Alert, 
	     ListView,
	     Text,
       AsyncStorage,
       TouchableHighlight
} from 'react-native';

import TaskList from '../model/TaskList'
import InventoryCheck from '../model/Task'

var Config = require('./Config.js');

class UserToDoScene extends Component {

	constructor(props) {
  	super(props);
  	const {navigator} = this.props;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      taskList: new TaskList('ToDoList'),
      dataSource: this.ds.cloneWithRows([  /* to avoid empty section warning */
        {name: 'Todo Job 1: Empty', id: 1}, ]),
    }
  	/* #CODE_SETION */
    /*   load task data */
    this.updateTask();
  	/* #SECTION_CODE */
  }

  async updateTask(){
    
    /* retreive task data from server */
    let response = await fetch(Config.SERVER_URL + '/update_task/', 
                               {method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  username: this.props.username,
                                })
                               });
    let responseJSON = await response.json();

    /* update task list in scene */
    this.setState({dataSource: this.ds.cloneWithRows(responseJSON.list),});
    
    /* put task data into TaskList */
    for(var t in responseJSON.list){
      var task = new InventoryCheck(t.id);
      this.state.taskList.add_task(task);
    }

  }

  onClickTask(task){
  	/* #CODE_SECTION */
  	const { navigate } = this.props.navigation;
  	navigate('TaskScene', 
  			{
  			username: this.props.username,
      		task_id: task.id,
        	product_name: task.product,
        	product_id: task.product_id,
        	product_unit: task.product_unit,
        	on_stock_count: task.on_stock_count,
        	storage_count: task.storage_count,
        	date: task.date,
        	store: task.store
      		});
  	/* #SECTION_CODE */
  }

  onUpdateClick(){
    this.updateTask();
  }

  onReturnClick(){
  	const { navigate } = this.props.navigation;
  	navigate('UseMainScene', { username: this.props.username });
  }

  status_render(status){
    if(status == 'ToDo'){
      return ' ToDo ';
    }else if(status == 'InProgress'){
      return ' InProgress ';
    }
    return ' New ';
  }

  render() {
  	return (
  		<View style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>
          ToDo List
          </Text>
        </View>
        <View style={styles.taskWrapper}>
    		  <ListView
  	        dataSource={this.state.dataSource}
  	        renderRow={(rowData) =>
                <View style={styles.taskItem}>
                  <TouchableHighlight onPress={ () => {this.onClickTask(rowData)}}>
                    <Text style={{marginTop:3, fontSize: 18, color:'red'}}>
                      {this.status_render(rowData.status)}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={ () => {this.onClickTask(rowData)}}>
                    <Text style={{marginTop:3, fontSize: 18, color:'blue'}}>
                      {rowData.store}
                    </Text>
                  </TouchableHighlight>
                  <TouchableHighlight onPress={ () => {this.onClickTask(rowData)}}>
                    <Text style={{marginTop:3, fontSize: 18, color:'black'}}>
                      {rowData.name}
                    </Text>
                  </TouchableHighlight>
                </View>
              }
  	      />
        </View>
        <View style={styles.footerGroup}>
          <View style={styles.btnWrapper}>
            <Button style={styles.btnFooter} 
                    textStyle={{fontSize: 24, color: 'white'}} 
                    onPress={this.onUpdateClick.bind(this)} 
                    title={'Update'}/>
          </View>
          <View style={styles.btnWrapper}>
            <Button style={styles.btnFooter} 
                    textStyle={{fontSize: 24, color: 'white'}} 
                    onPress={this.onReturnClick.bind(this)} 
                    title={'Main Menu'}/>
          </View>
        </View>
  		</View>
  	)
  }

}


const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'flex-start'
  },

  textWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#61b5ff',
  },

  taskWrapper: {
    flex: 8,
    flexDirection: 'row',
  },

  title: {
    color: '#d8261a',
    alignSelf:'center', 
    fontSize: 16,
  },

  taskItem: {
    flex: 0.1,
    flexDirection: 'row',
  },

  btnTaskOption: {
    backgroundColor: '#48baeb',
    borderWidth: 0,
    padding: 20,
    width: 130,
    marginLeft: 10,
  },

  footerGroup: {
    flex: 1,
    flexDirection: 'row',
  },

  btnWrapper: {
    flex: 1, 
    alignSelf: 'stretch',
  },

  btnFooter: {
    backgroundColor: '#48baeb',
  },

});

module.exports = UserToDoScene;