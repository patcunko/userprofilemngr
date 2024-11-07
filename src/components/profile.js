import './../App.css';

import { getOwnedVehicles } from './objects/dummy';

import React, {useContext} from "react";
import {useNavigate} from "react-router";
import LoginContext from "../context/login-context";

const ListVehicle = (props) => {
	return (
		<div className="flex rounded-lg bg-white border grow w-full h-30 p-5 space-y-1 hover:bg-gray-200">
			<div className="flex grid grid-cols-10 col-span-4 space-x-1 rtl:space-x-reverse">
				<label className="text-xl font-semibold whitespace-nowrap flex col-span-3 dark:text-black">{props.vehicle.make}</label>
				<label className="text-xl font-semibold whitespace-nowrap flex col-span-6 dark:text-black">{props.vehicle.model}</label>
				<label className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.vehicle.model_year}</label>
			</div>
		</div>
	);
}

function PaymentForm() {
	const navigate = useNavigate();
	async function onSubmit(e) {
		navigate("/");
	}

	return (
		<div className="bg-white rounded-lg shadow-lg pl-0 p-6">
			<h2 className='border-l-8 border-pink-400 bg-gray-100 font-bold pl-6 mb-6 w-1/2'>
				Your Payment Information
			</h2>
			<form onSubmit={onSubmit} className='pl-6'>
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
	);
}

function ContactInfoForm() {
	const navigate = useNavigate();
	async function onSubmit(e) {
		navigate("/");
	}

	return (
		<div className="bg-white rounded-lg shadow-lg pl-0 p-6">
			<h2 className='border-l-8 border-purple-400 bg-gray-100 font-bold pl-6 mb-6 w-1/2'>
					Your Contact Information
			</h2>
			<form onSubmit={onSubmit} className='pl-6'>
				<div className="grid grid-rows-2 gap-6">
					<div className="row-span-2 sm:col-span-1">
						<label for="email-address" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
						<input type="text" name="email-address" id="email-address" placeholder="example@google.com" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label for="phone-number" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
						<input type="text" name="phone-number" id="phone-number" placeholder="4445556666" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
				</div>
				<div className="mt-8">
					<button type="submit" className="w-full bg-blue-400 hover:bg-blue-800 text-white font-medium py-3 rounded-lg focus:outline-none">Modify</button>
				</div>
			</form>
		</div>
	);
}

export default function ProfilePage() {
	// eslint-disable-next-line
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
				<div className='border-l-8 border-red-400 bg-gray-100 font-bold pl-6 mb-6 w-1/4'>
					<h2>
						Company Information
					</h2>
				</div>
				<div className='rounded-2xl shadow-md'>
					<h2 className='font-bold text-center'>
						Details
					</h2>
					<div className='grid w-1/2 justify-self-center'>
						<div className='flex'>
							<h2 className="rounded-2xl bg-white h-full p-4">
								Your current role at the company: 
							</h2>
							<h2 className="rounded-2xl bg-white h-full p-4">
								Your current role at the company: 
							</h2>
							<label className="rounded-2xl bg-white h-full p-4">
								{user.role}
							</label>
						</div>

						<div className='flex w-1/2 justify-self-center'>
							<h2 className="rounded-2xl bg-white h-full p-4">
							Company Loyalty Points: 
							</h2>
							<label className="rounded-2xl bg-white h-full p-4">
							{user.company.loyalty_points}
							</label>
						</div>
					</div>
				</div>

				<div>
					<h2 className='font-bold text-center'>
						Registered Fleet Vehicles
					</h2>
					<div className="self-center rounded-2xl bg-gray-800 justify-self-center items-center w-full h-full p-4 space-y-2">
						{vehicleList()}
					</div>
				</div>

			</div>
			<div className='grid grid-cols-2 gap-6 w-5/6'>
				{PaymentForm()}
				{ContactInfoForm()}
			</div>
		</div>
	);
}