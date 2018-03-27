import React, {Component} from 'react';
import {Redirect, Route} from 'react-router-dom';
//import {queryStrin} from 'query-string';

//import Signin from './component/Signin';

/* eslint-disable */

class LoginCheck extends Component {
	constructor(props) {
		super(props);
	}
	componentDidMount(){
		const { dispatch, currentURL } = this.props

		if(!window.localStorage.getItem('jwt')) {

			//dispatch(setRedirectUrl(currentURL))
			//browserHistory.replace("/login")
			
		}
	}
	handleSubmit = event => {
		event.preventDefault();
		console.log(this.inputNode1.value);
		console.log(this.inputNode2.value);
		var formData = new FormData();
		formData.append("username",this.inputNode1.value);
		formData.append("password",this.inputNode2.value);


		//The failure with this is that the response doesnt hold onto 
		// promise after it is resolved

		const jsonPromise = fetch("http://localhost:3000/tokens",
			{method: 'POST', body: formData})
			//.then(res =>  console.log(res.status) )
			.then(res => { 
				console.log(res.status);
				if ( res.status === 401 ) {
					return res.status;
					//this.props.history.push('/failed')
				} else {
					const cat = res.json();
					console.log(cat)
					console.log(cat.jwt)
					return cat
				}
			});
			jsonPromise.then(data =>{
				console.log(data.jwt)
				window.localStorage.setItem('jwt', data.jwt);
			});
				
				
				
			jsonPromise.then(data =>console.log(data));
			jsonPromise.then(data =>console.log(data.jwt));
			if ( jsonPromise === 401 ) {
				this.props.history.push('/failed')
			} else {
			
			}
			
			// jsonPromise.then(data => console.log(data) );
			// jsonPromise.then(data => console.log(data) );
			// console.log(jsonPromise.jwt);
			// jsonPromise.then(data => {
			// 	//console.log(res);
			// 	console.log(data);
			// 	console.log(data.jwt);
			// 	window.localStorage.setItem('jwt', data.jwt);
			// 	console.log(data);
			// 	if ( data === '' ) {
			// 		this.props.history.push('/failed')
			// 	} else {
			// 		this.props.history.push('/welcome')
			// 	}
			
			// })
			
		// console.log({target: event.target});
	}//END handle submit
	handleTicket = event => {
		event.preventDefault();
		console.log(window.localStorage.getItem('jwt'));
		var formData = new FormData();
		formData.append("jwt",window.localStorage.getItem('jwt'))
		//The failure with this is that the response doesnt hold onto 
		// promise after it is resolved

		const jsonPromise = fetch("http://localhost:3000/cooljwt",
			{method: 'POST', body: formData})
			//.then(res =>  console.log(res.status) )
			.then(res => { 
				console.log(res.status);
				if ( res.status === 401 ) {
					return res.status;
					//this.props.history.push('/failed')
				} else {
					const cat = res.json();
					console.log(cat)
					console.log(cat.jwt)
					return cat
				}
			});
			jsonPromise.then(data =>{
				console.log(data.jwt)
				//window.localStorage.setItem('jwt', data.jwt);
			});
				
				
				
			jsonPromise.then(data =>console.log(data));
			jsonPromise.then(data =>console.log(data.jwt));
			if ( jsonPromise === 401 ) {
				this.props.history.push('/failedhere')
			} else {
			
			}
			
	}//END handle Ticket

	//CHECK PARAMS In header
	checkInHeader(){
		console.log('this.props');
		console.log(location);
		console.log(location.pathname);
		console.log(location);
		//const parsed = queryString.parse(location.pathname);
		const	parse = this.parseQuery(location.search);
		console.log(parse.t);
		// URL has uservalue
		if(parse.t){

			window.localStorage.setItem('jwt', parse.t);

		} else {
			//header to james
			window.location = 'http://0.0.0.0:3000/saml/initiate?RelayState=http://localhost:5151/';
			//window.location = 'http://192.168.0.167:3000/saml/initiate';
		}
		// window.location =
	}
	parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
	}
	render() {
		//SUCCESS PASS CHILDER
		if(window.localStorage.getItem('jwt')) {



			return this.props.children



			
		} else {
			//FAIL GO TO REDIRECT
			return (
				<div>
					{this.checkInHeader()}
				</div>
			)
		}

	}
}
export default LoginCheck;