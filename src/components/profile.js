import './../App.css';

import { getOwnedVehicles } from './objects/dummy';

import React, {useContext} from "react";
import {useNavigate} from "react-router";
import LoginContext from "../context/login-context";

const ListVehicle = (props) => {
	return (
		<div className="flex drop-shadow-md rounded-lg bg-white border grow w-full h-30 p-5 space-y-1 hover:bg-gray-200">
			<div className="flex grid grid-cols-10 col-span-4 space-x-1 rtl:space-x-reverse">
				<label className="text-xl font-semibold whitespace-nowrap flex col-span-3 dark:text-black">{props.vehicle.make}</label>
				<label className="text-xl font-semibold whitespace-nowrap flex col-span-6 dark:text-black">{props.vehicle.model}</label>
				<label className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.vehicle.model_year}</label>
			</div>
		</div>
	);
}

export default function ProfilePage() {
	const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(LoginContext);
	const navigate = useNavigate();

	if (isLoggedIn === false) {
		navigate('/');
	}

	function vehicleList() {
		return getOwnedVehicles(user).map((vehicle) => {
			return (
				<ListVehicle
					vehicle = {vehicle}
				/>
			);
		});
	}

	return (
		// absolute top-0 
		<div className="grid space-y-4 justify-items-center">
			
			<div className="shadow-2xl justify-self-center bg-green-300 text-center align-middle text-black font-bold py-1 mb-8 w-full h-14">
				Welcome, {user.first_name} {user.last_name}!
			</div>

			<div className="self-center rounded-2xl shadow-2xl bg-white justify-self-center items-center w-5/6 h-50 space-y-4 pt-6">
				<div className='font-bold pl-6 mb-6'>
					<h2>
						Company Information
					</h2>
				</div>
				<div className="self-center rounded-2xl bg-gray-500 justify-self-center items-center w-full h-full py-2 px-4">
					<h2 className='font-bold text-center'>
						Details
					</h2>
				</div>
				<div className="self-center rounded-2xl bg-gray-500 justify-self-center items-center w-full h-full py-2 px-4">
					<h2 className='font-bold text-center'>
						Registered Fleet Vehicles
					</h2>
					{vehicleList()}
				</div>
			</div>
			<div className='grid grid-cols-2 gap-6 w-5/6'>
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className='font-bold mb-6'>
							Your Payment Information
					</h2>
					<form>
						<div className="grid grid-cols-2 gap-6">
							<div className="col-span-2 sm:col-span-1">
								<label for="card-number" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
								<input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label for="expiration-date" className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
								<input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label for="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
								<input type="text" name="cvv" id="cvv" placeholder="000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label for="card-holder" className="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
								<input type="text" name="card-holder" id="card-holder" placeholder="Full Name" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
							</div>
						</div>
						<div className="mt-8">
							<button type="submit" className="w-full bg-blue-400 hover:bg-blue-800 text-white font-medium py-3 rounded-lg focus:outline-none">Modify</button>
						</div>
					</form>
				</div>
				<div className="bg-white rounded-lg shadow-lg p-6">
					<h2 className='font-bold mb-6'>
							Your Contact Information
					</h2>
					<form>
						<div className="grid grid-rows-2 gap-6">
							<div className="row-span-2 sm:col-span-1">
								<label for="card-number" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
								<input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
							</div>
							<div className="col-span-2 sm:col-span-1">
								<label for="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
								<input type="text" name="cvv" id="cvv" placeholder="000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
							</div>
						</div>
						<div className="mt-8">
							<button type="submit" className="w-full bg-blue-400 hover:bg-blue-800 text-white font-medium py-3 rounded-lg focus:outline-none">Modify</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}