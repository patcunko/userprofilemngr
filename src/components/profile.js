import './../App.css';

import { getOwnedVehicles, getPurchases } from './objects/dummy';

import React, {useContext} from "react";
import {useNavigate} from "react-router";
import LoginContext from "../context/login-context";

import date_icon from './../resources/date.png';
import item_icon from './../resources/item.png';
import quantity_icon from './../resources/multiplication.png';
import points_icon from './../resources/points.png';

const ListVehicle = (props) => {
	return (
		<div className="rounded-lg bg-white border p-5 hover:bg-gray-200">
			<label className="text-xl font-semibold whitespace-nowrap text-black">{props.vehicle.make} {props.vehicle.model} {props.vehicle.model_year}</label>
		</div>
	);
}

const ListPurchase = (props) => {
	return (
		<div className="grid grid-cols-4 drop-shadow-md rounded-lg bg-white border grow w-full h-30 p-5 space-x-4 hover:bg-gray-200">
			<div className="flex justify-self-start space-x-1 rtl:space-x-reverse">
				<img src={date_icon} className="h-6 self-center" alt="Person Icon" />
				<span className="text-xl font-semibold whitespace-nowrap dark:text-black text-wrap">{props.purchase.purchase_date.toLocaleString()}</span>
			</div>
			<div className="flex col-span-2 justify-self-center space-x-1 rtl:space-x-reverse">
				<img src={item_icon} className="h-6 self-center" alt="Person Icon" />
				<span className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.purchase.purchase_item}</span>
				<img src={quantity_icon} className="h-6 self-center" alt="Person Icon" />
				<span className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.purchase.item_quantity}</span>
			</div>
			<div className="flex justify-self-end space-x-1 rtl:space-x-reverse">
				<img src={points_icon} className="h-6 self-center" alt="Person Icon" />
				<span className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.purchase.point_reward}</span>
			</div>
		</div>
	);
}

function CompanyDetails(user) {
	return (
		<div className='rounded-2xl shadow-md'>
			<h2 className='font-bold text-center'>
				Details
			</h2>
			<div className="border-t border-gray-200">
				<dl>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Company Name: 
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0">
							{user.company.name}
						</dd>
					</div>
					<div className="bg-white px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Your Current Position at Company: 
						</dt>
						<dd className="mt-1 text-sm text-gray-900 sm:mt-0">
							{user.role}
						</dd>
					</div>
					<div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-6">
						<dt className="text-sm font-medium text-gray-500">
							Company Loyalty Points: 
						</dt>
						<dd className="mt-1 text-sm text-green-500 font-bold sm:mt-0">
							{user.company.loyalty_points}
						</dd>
					</div>
				</dl>
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
						<label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
						<input type="text" name="card-number" id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
						<input type="text" name="expiration-date" id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
						<input type="text" name="cvv" id="cvv" placeholder="000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
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
						<label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
						<input type="text" name="email-address" id="email-address" placeholder="example@google.com" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
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

	function vehicleList() {
		return getOwnedVehicles(user).map((vehicle) => {
			return (
				<ListVehicle
					vehicle = {vehicle}
				/>
			);
		});
	}

	function purchaseList() {
		return getPurchases(user).map((purchase) => {
			return (
				<ListPurchase
					purchase = {purchase}
				/>
			);
		});
	}

	return (
		<div className="grid space-y-6 justify-items-center">
			<div className="shadow-2xl bg-green-300 text-center align-middle text-black font-bold text-lg py-4 w-full h-14">
				Welcome, {user.first_name} {user.last_name}!
			</div>

			<div className="rounded-2xl shadow-2xl bg-white w-5/6 h-50 space-y-4 pt-6">
				<div className='border-l-8 border-red-400 bg-gray-100 font-bold pl-6 mb-6 w-1/4'>
					<h2>
						Company Information
					</h2>
				</div>
				{CompanyDetails(user)}
				<div>
					<h2 className='font-bold text-center'>
						Registered Fleet Vehicles
					</h2>
					<div className="rounded-2xl bg-gray-800 p-4 space-y-2">
						{vehicleList()}
					</div>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-6 w-5/6'>
				{PaymentForm()}
				{ContactInfoForm()}
			</div>
			<div className="rounded-2xl shadow-2xl bg-white w-5/6 h-50 space-y-4 pt-6">
				<div className='border-l-8 border-yellow-400 bg-gray-100 font-bold pl-6 mb-6 w-1/4'>
					<h2>
						Purchase History
					</h2>					
				</div>
				<div className="rounded-2xl bg-gray-800 p-4 space-y-2">
					{purchaseList()}
				</div>
			</div>
		</div>
	);
}