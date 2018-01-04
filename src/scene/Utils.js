import { NavigationActions } from 'react-navigation';

const CleanNavigator = {
	resetNavigation: (baseNavi, targetRoute, parameters) => {
	    const resetAction = NavigationActions.reset({
	      index: 0,
	      actions: [
	        NavigationActions.navigate({ routeName: targetRoute, params: parameters}),
	      ],
	    });
	    baseNavi.props.navigation.dispatch(resetAction);
    }
}

export default CleanNavigator;