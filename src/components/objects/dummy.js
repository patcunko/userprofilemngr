import { Company } from './company';
import { User } from './user';
import { Purchase } from './purchase';
import { PaymentCredential } from './pur_credentials';
import { Vehicle } from './vehicle';

export const company = [new Company(123, 'Only Toyotas'), 
						new Company(456, 'Presidential Convoy Ltd.'), 
						new Company(789, "Beeg Fleet")];

export const users = [new User(534543, 'Zivkovic', 'Andrej', 'coolbeans@google.com', 4165555555, company[0], "CEO", 2555), 
					new User(432423, 'Vvvvvv', 'Felipe', 'vvvvvvvv@ortiz.com', 6479995555, company[0], "Project Manager", 1000),
					new User(2312321, 'Fresh', 'Mad', 'fresh@google.com', 6478885555, company[1], "Wah", 500), 
					new User(21312, 'Test', 'Johnny', 'testest@google.com', 1234567890, company[2], "Test", 9999)];

export const purchases = [new Purchase(1, users[0], new Date(Date.now()), "Item 1", 1, 100), 
						new Purchase(2, users[0], new Date(Date.now()), "Item 2", 2, 150), 
						new Purchase(3, users[0], new Date(Date.now()), "Item 3", 3, 120), 
						new Purchase(6, users[1], new Date(Date.now()), "Item 1", 2, 130), 
						new Purchase(7, users[2], new Date(Date.now()), "Item 2", 3, 160), 
						new Purchase(8, users[2], new Date(Date.now()), "Item 3", 4, 130), 
						new Purchase(9, users[2], new Date(Date.now()), "Item 1", 1, 120), 
						new Purchase(11, users[3], new Date(Date.now()), "Item 3", 3, 110), 
						new Purchase(12, users[3], new Date(Date.now()), "Item 4", 4, 450)];

export const purchase_credentials = [new PaymentCredential(1111222233334444, 123, new Date(Date.now()), 'Visa', '123 Here St.', users[0]), 
									new PaymentCredential(4444333322221111, 321, new Date(Date.now()), 'Mastercard', '123 Here St.', users[1]), 
									new PaymentCredential(1010101010101010, 456, new Date(Date.now()), 'PayPal', '456 Test Rd.', users[2]),
									new PaymentCredential(1234567891234567, 654, new Date(Date.now()), 'American Express', '789 Whatever Bv.', users[3])];

export const vehicles = [new Vehicle(1234, company[0], 'Toyota', 'Sequoia', 2024), 
						new Vehicle(5678, company[0], 'Toyota', 'Highlander', 2023), 
						new Vehicle(9999, company[0], 'Toyota', 'Camry', 2019), 
						new Vehicle(4, company[1], 'Cadillac', 'Escalade', 2025), 
						new Vehicle(5, company[1], 'Cadillac', 'Escalade', 2024), 
						new Vehicle(6, company[2], 'Mercedes', 'Sprinter', 2020)];

export function getOwnedVehicles(user) {
	const out = [];
	vehicles.forEach((vehicle) => {
		if (vehicle instanceof Vehicle && user instanceof User) {
			if (vehicle.owner.id === user.company.id) {
				out.push(vehicle);
			}
		}
	})
	return out;
}

export function getPaymentCreds(user) {
	for (let i in purchase_credentials) {
		if (purchase_credentials[i] instanceof PaymentCredential && user instanceof User) {
			if (purchase_credentials[i].owner.id === user.id) {
				return purchase_credentials[i];
			}
		}
	}
	return null;
}

export function getPurchases(user) {
	const out = [];
	purchases.forEach((purchase) => {
		if (purchase instanceof Purchase && user instanceof User) {
			if (purchase.purchased_by.id === user.id) {
				out.push(purchase);
			}
		}
	})
	return out;
}