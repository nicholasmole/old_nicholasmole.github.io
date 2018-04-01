import React, {Component} from 'react';
import PropTypes from 'prop-types';
import * as ImmutablePropTypes from 'react-immutable-proptypes';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import {Map} from 'immutable';
import {bind} from 'lodash-decorators';

import {actions as locationActions, selectors as locationSelectors} from '../ducks/location';
import {actions as storeActions, selectors as storeSelectors} from '../ducks/app';
import {selectors as postSelectors} from '../ducks/posts';
import {actions as dynAct, selectors as dynamicSelectors} from '../ducks/dynamic';
import {actions as dataActions, selectors as dataSelectors} from '../ducks/data';

import routes from '../routes';
import './app.scss';
import LoginCheck from './loginCheck';
import renderEditorText from '../services/renderEditorText';
import ifResponse from '../services/responseGenerator';
/* eslint-disable */

import {unique, click} from '../utils/componentHelpers';

import * as data from '../data/data';

const mapStateToProps = state => ({
	location: locationSelectors.getLocation(state),
	status: storeSelectors.getStatus(state),
	data: dataSelectors.getData(state),
	posts: postSelectors.getPosts(state),
	//posts: dynamicSelectors.getDynamic(state,'posts'),
	dposts: dynamicSelectors.getDynamic(state,'posts'),
	dslider: dynamicSelectors.getDynamic(state,'sliders'),
	dheaderTop: dynamicSelectors.getDynamic(state,'headerTop'),
	//dposts: dynamicSelectors.getDynamic(state),
	//dslider: dynamicSelectors.getDynamic(state),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...locationActions,
		...storeActions,
		...dataActions,
		...dynAct
	}, dispatch)
});

class App extends Component {
	constructor(props) {
		super(props);
		// generates aa random id
		// this.fetch should be fetch parameter
		this.fetch = unique();
	}

	static propTypes = {
		actions: PropTypes.objectOf(PropTypes.func).isRequired,
		data: ImmutablePropTypes.map
	};

	static defaultProps = {
		data: Map()
	};

	@bind()
	handleLinkClick(page) {
		this.props.actions.locationPush({
			pathname: page
		});
	}

	componentDidMount() {
		// Api request for the array return
		// set in the state that whatever is associated with this fetch is currently loading
		// so loaders and spinners.
		// Figure out on init load - one api request... 
		// Sever up a page of request . Initial route api. 
		// one endpoint returns menu - list of posts
		// leverage menu per user permissions 
		
		// this.props.actions.appRequest({
		// 	//saga response success vs failure
		// 	payload: {
		// 		dataset: 'posts',
		// 		action: 'get',
		// 		route: 'http://localhost:3000/api/v1/posts',
		// 		// send anything the api is concerned with pagination api params
		// 		data: {}
		// 	},
		// 	fetch: this.fetch
		// });

		console.log(this.props.actions);

		this.props.actions.dynamicSet({
			name: 'posts',
			payload: 
			{ 'psots' :
				[
					{
					dataset: 'posts',
					action: 'get',
					title: 'This is a test title',
					description: 'This is the test description'
					},
					{
						dataset: 'posts2',
						action: 'get',
						title: 'This is a test title',
						description: 'This is the test description'
					}
				]
			}
		});
		
		this.props.actions.dynamicSet({
			name: 'headerTop',
			payload: data.headerTop 
		});
	}

	displayInfo = posts => {
		return (
			<div>
				{posts.map(post => {
					return (
						<div key={post.id}>
							{post.title}
							<img src={`.${post.src}`}/>
							<div className="mlTitle">{post.name}</div>
							<div className="mlPar">{post.comment}</div>
						</div>
					)
				})}
			</div>
		)	
	}
	displayInfoSlider = posts => {
		console.log('pre firign');
		console.log(posts);
		return (
			<div>
				{posts.map(post => {
					return (
						<div key={post.id}>
							{post.content}
							<div className="mlTitle">{ post.title}</div>
							<div className="mlPar"><div dangerouslySetInnerHTML={{__html: post.content}}/></div>
							<div className="mlPar">{renderEditorText(post.content)}</div>
						</div>
					)
				})}
			</div>
		)	
	}


	// This gets the api request and displays it in the log
	logReturnValue() {

		let response = <div></div>
		// map out 'status' which holds success,request,failure
		// success should have the fetched data
		console.log('lewis man');
		//console.log(this.props);
		
		if (typeof this.props.posts != 'undefined'){
			const responsetoJS = this.props.posts.toJS();
			let {posts = []} = responsetoJS;
			posts = responsetoJS.length ? responsetoJS : [];
			response = posts.length ? posts.map(p => this.displayInfoSlider(p)) : <div>loading</div>
		}

		const valueToMap = ifResponse(this.props.dposts);
		const response2 = valueToMap == null ? <div>loading</div> : valueToMap.map(p => this.displayInfoSlider(p));

		return response2;
	}
	logReturnValueSlider() {

		let response = <div></div>
		// map out 'status' which holds success,request,failure
		// success should have the fetched data
		console.log('that doesnt work');
		
		if (typeof this.props.dslider != 'undefined'){
			console.log(this.props.dslider.toJS());
			const responsetoJS = this.props.dslider.toJS();
			let {posts = []} = responsetoJS;
			posts = responsetoJS.length ? responsetoJS : [];
			response = posts.length ? posts.map(p => this.displayInfo(p)) : <div>loading</div>
		}
		return response;
	}

	getHeaderTop = () => {

		const valueToMap = ifResponse(this.props.dheaderTop);
		const response = valueToMap == null ? <div>loading</div> : valueToMap.map(v => this.renderHeaderTop(v));
		console.log(response);
		return response;
	}
	renderHeaderTop = hTops => {
		{console.log(hTops)}
		return (
			<div>
				{hTops.map(hTop => {
					
					return (
						<div key={hTop.id}>
							<img src={`img/${hTop.src}`}/>
						</div>
					)
				})}
			</div>
		)	
	}

	render() {
		return (
			<div id="app" className="app">
				{/* <LoginCheck> */}
					{/* <Link to="/">Home</Link>
					<a onClick={click(this.handleLinkClick, 'about')}>About</a> */}
					<div id="wrap">
						{/* {this.logReturnValue()} */}
						{/* {this.getHeaderTop()} */}
						{/* {this.logReturnValueSlider()} */}
						
						{renderRoutes(routes, {...this.props})}
					</div>
				{/* </LoginCheck> */}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
