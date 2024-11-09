import './../App.css';

import { users } from './objects/dummy';

import person_icon from './../resources/user.png';
import company_icon from './../resources/company.png';
import role_icon from './../resources/role.png';

import React, {useContext} from "react";
import {useNavigate} from "react-router";
import LoginContext from "../context/login-context";

const ListUser = (props) => {
	// eslint-disable-next-line
	const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(LoginContext);
	const navigate = useNavigate();

	function becomeUser() {
		setIsLoggedIn(true);
		setUser(props.user);
		console.log(`Became user ${props.user.first_name}.`);
		navigate(`/profile/${props.user.id}`);
	}
	return (
		<div className="lg:grid grid-cols-10 drop-shadow-md rounded-lg bg-white border w-5/6 h-30 p-5 hover:bg-gray-200"
			onClick={() => { becomeUser() }} key={props.user.id}>
			<div className="col-span-3">
				<div className='flex'>
					<img src={person_icon} className="h-6 self-center" alt="Person Icon" />
					<span className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.user.first_name} {props.user.last_name}</span>
				</div>
			</div>
			<div className="col-span-4">
				<div className='flex'>
					<img src={company_icon} className="h-6 self-center" alt="Company Icon" />
					<span className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.user.company.name}</span>
				</div>
			</div>
			<div className="col-span-3">
				<div className='flex'>
					<img src={role_icon} className="h-6 self-center" alt="Role Icon" />
					<span className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.user.role}</span>
				</div>
			</div>
		</div>
	)
}

export default function HomePage() {
	function userList() {
		return users.map((user) => {
			return (
				<ListUser
					key = {user.id}
					user = {user}
				/>
			)
		})
	}

	return (
		<div className="grid space-y-4 justify-items-center">
			{userList()}
		</div>
	);
}