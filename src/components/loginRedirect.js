import React from 'react';

/* eslint-disable */

const LoginRedirect = props => {
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
	render() {
		return (
			//redirect if no login
		)
	}
}
export default LoginRedirect;