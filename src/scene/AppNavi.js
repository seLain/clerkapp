import { StackNavigator } from 'react-navigation';

import UserLoginScene from './UserLoginScene.js'
import UserMainScene from './UserMainScene.js'
import UserToDoScene from './UserToDoScene.js'
import UserDoneScene from './UserDoneScene.js'
import TaskScene from './TaskScene.js'

export const AppNavi = StackNavigator({
	    UserLoginScene: { 
	    		screen: UserLoginScene,
	    		navigationOptions: {
		    		header: null,
	    		},
	    	},
	    UserMainScene: {
	    		screen: UserMainScene,
	    		navigationOptions: {
	    			title: 'MainMenu',
	    			headerLeft: null,
	    		},
	    	},
	    UserToDoScene: { 
	    		screen: UserToDoScene,
	    		navigationOptions: {
	    			title: 'Jobs ToDo',
	    			headerLeft: null,
	    		},
	    	},
	    UserDoneScene: { 
	    		screen: UserDoneScene,
	    		navigationOptions: {
	    			title: 'Jobs Done',
	    			headerLeft: null,
	    		},
	    	},
	    TaskScene: { 
	    		screen: TaskScene,
	    		navigationOptions: {
	    			title: 'Job',
	    			headerLeft: null,
	    		},
	    	},
	});

export default AppNavi;