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
import Statistics from './statistics';
import './about.scss';


const mapStateToProps = state => ({
	location: locationSelectors.getLocation(state),
	status: storeSelectors.getStatus(state),
	dheaderTop: dynamicSelectors.getDynamic(state,'headerTop')
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
	} 

	getHeaderTop = () => {
		const valueToMap = responseGenerator(this.props.dheaderTop);
		
		const response = valueToMap == null ? 
		<LoadingElement divClass="centerLoading"/> : valueToMap.map(v => <HeaderTop props={v}/>)
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
				<div id="app" className="app parallax">
					{this.getHeaderTop()}
					<div className=" parallax__layer parallax__layer--base" style={{backgroundColor:'#3fb0ac',height: '400px'}}>
						<About/>
					</div>
					{/* <div>
						
					</div> */}
					
					{renderRoutes(this.props.route.routes)}
				</div>
				<Statistics/>
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
