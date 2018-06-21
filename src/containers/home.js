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
import {actions as dynAct, selectors as dynamicSelectors} from '../ducks/dynamic';

import './app.scss';

import renderEditorText from '../services/renderEditorText';
import responseGenerator from '../services/responseGenerator';
import dataLoaded from '../services/dataLoaded';
/* eslint-disable */

import {unique, click} from '../utils/componentHelpers';

import * as data from '../data/data';

import HeaderTop from '../components/HeaderTop';
import LoadingElement from '../components/loader';
import About from './aboutSection';
import Projects from './projects';
import Skills from './skills';
import Contact from './contact';
import Statistics from './statistics';
import './about.scss';


const mapStateToProps = state => ({
	location: locationSelectors.getLocation(state),
	status: storeSelectors.getStatus(state),
	dheaderTop: dynamicSelectors.getDynamic(state,'headerTop'),
	dprojectStuff: dynamicSelectors.getDynamic(state,'projectStuff'),
});

const mapDispatchToProps = dispatch => ({
	actions: bindActionCreators({
		...locationActions,
		...storeActions,
		...dynAct
	}, dispatch)
});

class HomePage extends Component {
	constructor(props) {
		super(props);
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
		
		this.props.actions.dynamicSet({
			name: 'headerTop',
			payload: data.headerTop 
		});
		
		this.props.actions.dynamicSet({
			name: 'projectStuff',
			payload: data.projectStuff 
		});
	} 

	getHeaderTop = () => {
		const valueToMap = responseGenerator(this.props.dheaderTop);
		
		const response = valueToMap == null ? 
		<LoadingElement divClass="centerLoading"/> : valueToMap.map(v => <HeaderTop props={v}/>)
		;
		
		return response;
	}
	getProjectStuff = () => {
		const valueToMap = responseGenerator(this.props.dprojectStuff);
		
		const response = valueToMap == null ? 
		<LoadingElement divClass="centerLoading"/> : valueToMap.map(v => <Projects props={v}/>)
		;
		
		return response;
	}

	renderHeaderTop = hTops => {
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
			<div>
				<div id="app" className="app">
					{this.getHeaderTop()}
					<div className="about_home_container">
						<About/>
					</div>
					<div id="project" className="ProjectSection">
						<div className="Title"> Projects </div>
						{this.getProjectStuff()}
					</div>
					<Skills/>
					<Contact/>
					
					{renderRoutes(this.props.route.routes)}
				</div>
				{/* <Statistics/> */}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
