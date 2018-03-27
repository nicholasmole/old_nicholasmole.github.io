# Test React Redux-Saga nicholasmole.github.io

This is a test react application for nicholasmole.github.io

## How to start this up

1) pull down the git application

```
git clone git@github.com:nicholasmole/gitpage.git
```

2) install the dependencies

```
npm install
```

3) Run the application

Run the local site with live reload for testing and editing
```
npm run start
```

Run the local site & open your web browser to that page.
```
npm run start:open
```


Use webpack to build the single page application for the production site
```
npm run build
```

## Some History of Resources

The application is built with React and Redux. 

React is a javascript library used to design a view. Redux is a state manager. On top of Redux this project uses Redux-sagas which is a side-effect async request system to fetch data from an api. 

## Whats in this application

/public holds the single page application

/src holds the development application
	/components are the div parts of the application that are reused.

	/containers are the divs that wrap around the application, as well as the seperate 		pages of the app. 

	/ducks holds the redux reducers and actions
	/sagas are the redux-saga api side-effects
	/services are single use functions through the application
	/utils are the Model functions used to store many functions.

### History: 

Use [D3-React](https://github.com/maxbaun/D3-React) as the base for this project
Webpacker used as it is the same webpack for our current website, so a second webpack doesn't need to be configured.

Include a dynamic saga/ducks that is controlled with the array of dynamicHelpers.js to control size of the application.

#### A DynamicDucksSaga System

This application has a dynamic reducer/saga creator so all the user
must do is add their new Ducks/saga to the dynamicSagas array and it
will appear in the Redux Store, and you can call it from the container
or component.

Sagas -
Starting in sagas/root you can see that ForkDrawer creates an Array of
fork(watch) generators.

In sagas/dynamics we can see that the Get and Response are both created
with the name passed down from the dynamicSagas list. So the side
effects are all set and running.

Reducers/Ducks -
Starting in the ducks/app file we see the reducers are created at the
bottom inside of the combine function. The object dynamicReducers is
created by the dynamicSagas list.

Ducks -
In ducks/dynamic we have a normal Ducks reducer that is created with by
passing the renamed value first. This creates the Duck that is created
from the reducers in ducks/apps which again comes from dynamicSagas.

Usage -
Step 1) - add a new item to the array list in dynamicHelpers
Step 2) - add
	<insert item>: dynamicSelector.getDynamic(state,<insert item>)
          in the const mapStateToProps in container/app
Step 3) - add a new appRequest({
          payload: {
		dataset: <insert item>
		action: 'get'
		route: 'http://url.com/<insert item>'
	  },
	  fetch: this.fetch
	  });

	  In componentDidMount()
Step 4) - console.log(<insert item>)

Then you can create the entire component from here like before
