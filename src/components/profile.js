import './../App.css';

import axios from 'axios';
import { useParams } from 'react-router-dom';

import { getOwnedVehicles, getPaymentCreds, getPurchases } from './objects/dummy';

import React, {useContext, useState, useEffect} from "react";
import {useNavigate} from "react-router";
import LoginContext from "../context/login-context";

import left_chevron from './../resources/chevron-left-small.svg';

import date_icon from './../resources/date.png';
import item_icon from './../resources/item.png';
import quantity_icon from './../resources/multiplication.png';
import points_icon from './../resources/points.png';

const ListVehicle = (props) => {
	return (
		<div className="rounded-lg bg-white border p-5 hover:bg-gray-200" key={props.vehicle.id}>
			<label className="text-xl font-semibold whitespace-nowrap text-black">{props.vehicle.make} {props.vehicle.model} {props.vehicle.model_year}</label>
		</div>
	);
}

const ListPurchase = (props) => {
	return (
		<div className="lg:grid grid-cols-4 drop-shadow-md rounded-lg bg-white border p-5 hover:bg-gray-200" key={props.purchase.purchase_no}>
			<div>
				<div className='flex'>
					<img src={date_icon} className="h-6 self-center" alt="Time and Date Icon" />
					<span className="text-xl self-center font-semibold whitespace-nowrap dark:text-black text-wrap">{props.purchase.purchase_date.toLocaleString()}</span>
				</div>
			</div>
			<div className="flex col-span-2 justify-self-center">
				<div className='flex'>
					<img src={item_icon} className="h-6 self-center" alt="Item Icon" />
					<span className="text-xl self-center font-semibold whitespace-nowrap dark:text-black">{props.purchase.purchase_item}</span>
					<img src={quantity_icon} className="h-6 self-center" alt="Quantity Icon" />
					<span className="text-xl self-center font-semibold whitespace-nowrap dark:text-black">{props.purchase.item_quantity}</span>
				</div>
			</div>
			<div className='justify-self-end self-center'>
				<div className='flex'>
					<img src={points_icon} className="h-6 self-center" alt="Rewards Points Icon" />
					<span className="text-xl font-semibold whitespace-nowrap dark:text-black">{props.purchase.point_reward}</span>
				</div>
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
						<dt className="flex text-sm font-medium text-gray-500 space-x-1">
							<p>
								Your Loyalty Points at 
							</p>
							<p className='text-blue-500 font-bold'>
								{user.company.name}: 
							</p>
						</dt>
						<dd className="mt-1 text-sm text-green-500 font-bold sm:mt-0">
							{user.loyalty_points}
						</dd>
					</div>
				</dl>
			</div>
		</div>
	);
}

const PaymentForm = (props) => {
	const navigate = useNavigate();
	async function onSubmit(e) {
		navigate("/");
	}

	const offset = props.pay_cred.expiry_date.getTimezoneOffset();
	const newDate = new Date(props.pay_cred.expiry_date.getTime() - (offset*60*1000));
	const formattedDate = newDate.toISOString().split('T')[0];

	return (
		<div className="bg-white rounded-lg shadow-lg pl-0 p-6">
			<h2 className='border-l-8 border-pink-400 bg-gray-100 font-bold pl-6 md:px-6 mb-6 w-fit'>
				Your Payment Information
			</h2>
			<form onSubmit={onSubmit} className='pl-6'>
				<div className="grid grid-cols-2 gap-6">
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="card-number" className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
						<input type="text" name="card-number" defaultValue={props.pay_cred.account_number} id="card-number" placeholder="0000 0000 0000 0000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700 mb-2">Expiration Date</label>
						<input type="date" name="expiration-date" defaultValue={formattedDate} id="expiration-date" placeholder="MM / YY" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
						<input type="text" name="cvv" id="cvv" defaultValue={props.pay_cred.cvv} placeholder="000" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="card-holder" className="block text-sm font-medium text-gray-700 mb-2">Card Holder</label>
						<input type="text" name="card-holder" id="card-holder" defaultValue={props.pay_cred.owner.first_name + " " + props.pay_cred.owner.last_name} placeholder="Full Name" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
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
	// eslint-disable-next-line
	const [isLoggedIn, setIsLoggedIn, user, setUser] = useContext(LoginContext);
	const navigate = useNavigate();
	async function onSubmit(e) {
		navigate("/");
	}

	return (
		<div className="bg-white rounded-lg shadow-lg pl-0 p-6">
			<h2 className='border-l-8 border-purple-400 bg-gray-100 font-bold pl-6 md:px-6 mb-6 w-fit'>
					Your Contact Information
			</h2>
			<form onSubmit={onSubmit} className='pl-6'>
				<div className="grid grid-rows-2 gap-6">
					<div className="row-span-2 sm:col-span-1">
						<label htmlFor="email-address" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
						<input type="text" name="email-address" id="email-address" defaultValue={user.email} placeholder="example@google.com" pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$" required className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
					</div>
					<div className="col-span-2 sm:col-span-1">
						<label htmlFor="phone-number" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
						<input type="text" name="phone-number" id="phone-number" defaultValue={user.phone_num} placeholder="4445556666" className="w-full py-3 px-4 border border-gray-400 rounded-lg focus:outline-none focus:border-blue-500"/>
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
	const [isLoggedIn, setIsLoggedIn, setUser] = useContext(LoginContext);
	const { id } = useParams();
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		axios.get(`http://localhost:5000/api/users/${id}`)
		.then(response => {
			setUserData(response.data);
		})
		.catch(error => {
			console.error('Error fetching user data:', error);
		});
}, [id]);

if (!userData || !userData.user) {
	return <div>Loading...</div>;
}

const { user, purchases, vehicles } = userData;

	function vehicleList() {
		return getOwnedVehicles(user).map((vehicle) => {
			return (
				<ListVehicle
					key = {vehicle.id}
					vehicle = {vehicle}
				/>
			);
		});
	}

	function purchaseList() {
		return getPurchases(user).map((purchase) => {
			return (
				<ListPurchase
					key = {purchase.id}
					purchase = {purchase}
				/>
			);
		});
	}

	function paymentForm() {
		const pay_cred = getPaymentCreds(user);
		return (
			<PaymentForm
				key = {pay_cred.owner.id}
				pay_cred = {pay_cred}
			/>
		);
	}

	return (
		<div className="grid space-y-6 justify-items-center">
			<div className="shadow-2xl bg-green-300 text-center align-middle text-black font-bold text-lg py-4 w-full h-14">
				Welcome, {user.first_name} {user.last_name}!
			</div>

			<div className="rounded-2xl shadow-2xl bg-white w-5/6 h-50 space-y-4 pt-6">
				<div className='border-l-8 border-red-400 bg-gray-100 font-bold px-6 mb-6 w-fit'>
					<h2>
						Company Information
					</h2>
				</div>
				{CompanyDetails(user)}
				<div>
					<h2 className='font-bold text-center'>
						Registered Fleet Vehicles
					</h2>
					<div className="rounded-2xl bg-gray-800 p-4 space-y-2 bg-center bg-repeat-round" style={{backgroundSize: 100, backgroundImage: `url(${left_chevron})`}}>
						{vehicleList()}
					</div>
				</div>
			</div>
			<div className='grid grid-cols-2 gap-6 w-5/6'>
				{paymentForm()}
				{ContactInfoForm()}
			</div>
			<div className="rounded-2xl shadow-2xl bg-white w-5/6 h-50 space-y-4 pt-6">
				<div className='border-l-8 border-yellow-400 bg-gray-100 font-bold px-6 mb-6 w-fit'>
					<h2>
						Purchase History
					</h2>					
				</div>
				<div className="rounded-2xl bg-gray-800 p-4 space-y-2 bg-center bg-repeat-round" style={{backgroundSize: 100, backgroundImage: `url(${left_chevron})`}}>
					{purchaseList()}
				</div>
			</div>
		</div>
	);
}