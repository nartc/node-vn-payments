import { VNPay, TEST_CONFIG } from '../../src/vnpay';
/* eslint-disable no-param-reassign */

const vnpay = new VNPay({
	paymentGateway: TEST_CONFIG.paymentGateway,
	merchant: TEST_CONFIG.merchant,
	secureSecret: TEST_CONFIG.secureSecret,
});

export function checkoutVNPay(req, res) {
	const checkoutData = res.locals.checkoutData;
	checkoutData.returnUrl = `http://${req.headers.host}/payment/vnpay/callback`;
	checkoutData.orderInfo = 'Thanh toan giay adidas';
	checkoutData.orderType = 'fashion';

	const checkoutUrl = vnpay.buildCheckoutUrl(checkoutData);
	res.locals.checkoutUrl = checkoutUrl;

	return checkoutUrl;
}

export function callbackVNPay(req, res) {
	const query = req.query;

	const results = vnpay.verifyReturnUrl(query);

	if (results) {
		res.locals.email = 'tu.nguyen@naustud.io';
		res.locals.orderId = results.transactionId || '';
		res.locals.price = results.amount;
		res.locals.isSucceed = results.isSuccess;
		res.locals.message = results.message;
	} else {
		res.locals.isSucceed = false;
	}
}