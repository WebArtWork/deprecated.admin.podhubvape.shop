export const environment = {
	appId: 'vibes',
	roles: [
		'vibes-owner',
		'vibes-partner',
		'vibes-admin',
		'vibes-warehouse',
		'vibes-accountant',
		'vibes-sales'
	],
	roleName: {
		'vibes-owner': 'Owner',
		'vibes-partner': 'Analyst/Partner',
		'vibes-admin': 'Administrator',
		'vibes-warehouse': 'Warehouse Worker',
		'vibes-accountant': 'Accountant',
		'vibes-sales': 'Sales Consultant'
	},
	roleDescription: {
		'vibes-owner': 'Full access to everything.',
		'vibes-partner': 'Full view-only access, without editing rights.',
		'vibes-admin':
			'Full access except for wholesale prices, purchase invoices, and supplier details.',
		'vibes-warehouse':
			'Can view incoming documents without seeing item prices or supplier details; can transfer stock between warehouses and verify quantities in invoices.',
		'vibes-accountant':
			'Access to financial documents (incomings, outgoings).',
		'vibes-sales':
			'Can access retail prices, trade operations, stock in the store, cash register, and manual discounts (three types of discounts3% cumulative, 5% military, 10% corporate up to 1000 UAH).'
	},
	url: 'https://webart.work',
	production: true,
	languages: [
		{
			code: 'en',
			name: 'English',
			origin: 'English'
		},
		{
			name: 'Ukrainian',
			origin: 'українська',
			code: 'uk'
		}
	],
	language: {
		name: 'Ukrainian',
		origin: 'українська',
		code: 'uk'
	}
};
