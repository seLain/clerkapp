import React, { Component } from 'react';

import { View, 
	     StyleSheet, 
	     Button, 
	     Alert, 
	     ListView,
	     Text,
	     TextInput
} from 'react-native';

import DatePicker from 'react-native-datepicker'
var Config = require('./Config.js');

class TaskScene extends Component {

	constructor(props) {
	  	super(props);
	  	/* #MOCK_DATA */
	  	this.state = this.props.navigation.state.params;
	  	/*
	  	this.state = {
	  	  username: this.props.navigation.state.params.username,
	  	  task_id: this.props.navigation.state.params.task_id,
	      on_stock_count: this.props.navigation.state.params.on_stock_count,
	      storage_count: this.props.navigation.state.params.storage_count,
	      date: this.props.navigation.state.params.date,
	      store: this.props.navigation.state.params.store
	    }*/
	  	/* #DATA_MOCK */
	  	/* #CODE_SECTION */
	  	/*   load product data */
	  	/*   load inprogress check data */
	  	/*   record task start time */
	  	/* #SECTION_CODE */
    }

    async onSendClick() {

	    /* #CODE_SECTION */
        /*   check field empty */
        if(!this.state.date){
	    	Alert.alert('The date can not be empty.');
	    	return;
	    }else if(!this.state.on_stock_count){
	    	Alert.alert('The stock count can not be empty.');
	    	return;
	    }else if(!this.state.storage_count){
	    	Alert.alert('The storage count can not be empty.');
	    	return;
	    }

	    /*   check on_stock_count content */
	    if(isNaN(parseFloat(this.state.on_stock_count))){
	    	Alert.alert('The stock count has to be numbers.');
	    	return;
	    }

	    /*   check storage_count content */
	    if(isNaN(parseFloat(this.state.storage_count))){
	    	Alert.alert('The storage count has to be numbers.');
	    	return;
	    }

	    /*   check data format */
	    
	    /*   preserve check data to inventory update list */

	    /*   record task complete time */

	    /*   directly send to server */
	    let response = await fetch(Config.SERVER_URL + '/inventorycheck/report_inventory/', 
                               {method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  task_id: this.state.task_id,
                                  on_stock_count: this.state.on_stock_count,
							      storage_count: this.state.storage_count,
							      date: this.state.date
                                })
                               });
	    let responseJSON = await response.json();

	    /*   mark task status */

	    /*   remove task from inprogress task list */

	    /*   put task to done task list */

	    /*   back to UserToDoScene */
	    const { navigate } = this.props.navigation;
	    navigate('UserToDoScene', { username: this.state.username });
	    /* #SECTION_CODE */
	}

	async onInProgressClick() {
        
        /* #CODE_SECTION */

        /*   directly send to server */
	    let response = await fetch(Config.SERVER_URL + '/inventorycheck/inprogress_inventory/', 
                               {method: 'POST',
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  task_id: this.state.task_id,
                                  on_stock_count: this.state.on_stock_count,
							      storage_count: this.state.storage_count,
							      date: this.state.date
                                })
                               });
	    let responseJSON = await response.json();

	    const { navigate } = this.props.navigation;
	    navigate('UserToDoScene', { username: this.state.username });
	    /* #SECTION_CODE */
	}

	render() {
		const {on_stock_count, storage_count} = this.state;
	  	return (
	  		<View style={styles.container}>
	  		  <View style={styles.textWrapper}>
		          <Text style={styles.title}>
		          Job : {this.state.store} Inventory Check
		          </Text>
		      </View>
		      <View style={styles.taskWrapper}>
		          <View style={styles.taskItem}>
		  		    <Text style={styles.fieldName}>
		  		    Product 
		  		    </Text>
                    <Text style={styles.fieldBody}>
		  		    {this.state.product_name}
		  		    </Text>
		  		  </View>
		  		  <View style={styles.taskItem}>
		  		    <Text style={styles.fieldName}>
		  		    Product ID
		  		    </Text>
		  		    <Text style={styles.fieldBody}>
		  		    {this.state.product_id}
		  		    </Text>
		  		  </View>
		  		  <View style={styles.taskItem}>
		  		    <Text style={styles.fieldName}>
		  		    Unit 
		  		    </Text>
		  		    <Text style={styles.fieldBody}>
		  		    {this.state.product_unit}
		  		    </Text>
		  		  </View>
		  		  <View style={styles.taskItem}>
		  		    <Text style={styles.fieldName}>
		  		    On Stock Count
		  		    </Text>
		  		    <TextInput style={styles.fieldBody}
				          onChangeText={ (on_stock_count) => {this.setState({on_stock_count})}}
				          placeholder='On Stock Count'
				          placeholderTextColor='rgba(255,255,255,0.5)'
				          underlineColorAndroid='rgba(1,1,1,0)'
				          autoCorrect={false}
				          value={on_stock_count} />
				  </View>
				  <View style={styles.taskItem}>
				      <Text style={styles.fieldName}>
				      Closest Due
				      </Text>
				      <DatePicker
				        style={{width: 200}}
				        date={this.state.date}
				        mode="date"
				        placeholder="Choose a date"
				        format="YYYY-MM-DD"
				        minDate="2017-03-10"
				        maxDate="2020-12-31"
				        confirmBtnText="Confirm"
				        cancelBtnText="Cancel"
				        customStyles={{
				          dateIcon: {
				            position: 'absolute',
				            left: 0,
				            top: 4,
				            marginLeft: 0
				          },
				          dateInput: {
				            marginLeft: 36
				          }
				        }}
				        onDateChange={(date) => {this.setState({date: date})}}
				      />
				  </View>
				  <View style={styles.taskItem}>
				      <Text style={styles.fieldName}>
				      Storage Count
				      </Text>
				      <TextInput style={styles.fieldBody}
				          onChangeText={ (storage_count) => {this.setState({storage_count})}}
				          placeholder=' Storage Count'
				          placeholderTextColor='rgba(255,255,255,0.5)'
				          underlineColorAndroid='rgba(1,1,1,0)'
				          autoCorrect={false}
				          value={storage_count} />
			      </View>
			      <View style={styles.taskItem}>
			      </View>
			      <View style={styles.taskItem}>
			      </View>
			      <View style={styles.taskItem}>
			      </View>
			      <View style={styles.taskItem}>
			      </View>
			  </View>
			  <View style={styles.footerGroup}>
			    <View style={styles.btnWrapper}>
			      <Button style={styles.btnSend} 
	                  textStyle={{fontSize: 24, color: 'white'}} 
	                  onPress={this.onInProgressClick.bind(this)}
	                  title='Save' />
	            </View>
	            <View style={styles.btnWrapper}>
			      <Button style={styles.btnSend} 
	                  textStyle={{fontSize: 24, color: 'white'}} 
	                  onPress={this.onSendClick.bind(this)}
	                  title='Confirm' />
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
    flexDirection: 'column',
  },

  title: {
    color: '#d8261a',
    alignSelf:'center', 
    fontSize: 16,
  },

  taskItem: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  fieldName: {
  	marginTop:3, 
  	marginLeft: 10,
  	fontSize: 18, 
  	color:'black',
  },

  fieldBody: {
  	marginTop:3, 
  	marginLeft: 10,
  	fontSize: 18, 
  	color:'green',
  },

  btnSend: {
    backgroundColor: '#48baeb',
  },

  footerGroup: {
    flex: 1,
    flexDirection: 'row',
  },

  btnWrapper: {
    flex: 1, 
    alignSelf: 'stretch',
  },

});

module.exports = TaskScene;