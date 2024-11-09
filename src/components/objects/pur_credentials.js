export class PaymentCredential {

	constructor(account_number, cvv, expiry_date, account_type, address, owner) {
		this.account_number = account_number;
		this.cvv = cvv;
		this.expiry_date = expiry_date;
		this.account_type = account_type;
		this.address = address;
		this.owner = owner;
	}


}