import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import SignUp from './components/SignUp';
import UserDetails from './components/UserDetails';
import ResetPassword from './components/Reset';


function App() {
	return (
		<Router>
			<div className='App'>
				<div className='auth-wrapper'>
					<div className='auth-inner'>
						<Routes>
							<Route exact path='/' element={<Login />} />
							<Route path='/sign-in' element={<Login />} />
							<Route path='/sign-up' element={<SignUp />} />
							<Route path='/user-data' element={<UserDetails />} />
							<Route path='/forget-password' element={<ResetPassword />} />
							
						</Routes>
					</div>
				</div>
			</div>
		</Router>
	);
}

export default App;
