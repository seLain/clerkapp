import { StackNavigator } from 'react-navigation';

import UserLoginScene from './UserLoginScene.js'
import UserMainScene from './UserMainScene.js'
import UserToDoScene from './UserToDoScene.js'
import UserDoneScene from './UserDoneScene.js'
import TaskScene from './TaskScene.js'

export const AppNavi = StackNavigator({
    UserLoginScene: { 
    		screen: UserLoginScene,
    	},
    UserMainScene: { screen: UserMainScene},
    UserToDoScene: { screen: UserToDoScene},
    UserDoneScene: { screen: UserDoneScene},
    TaskScene: { screen: TaskScene},
});

export default AppNavi;