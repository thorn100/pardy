const t = require('tcomb');

const UserEmail = t.struct(
	{
		type: t.String,
		value: t.String,
	},
	'UserEmail'
);

const UserEmails = t.list(
	UserEmail,
	'UserEmails'
);

const UserName = t.struct(
	{
		givenName: t.String,
		familyName: t.String,
	},
	'UserName'
);

const User = t.struct(
	{
		displayName: t.String,
		emails: UserEmails,
		name: UserName,
	},
	'User'
);

module.exports = {
	User,
	UserEmail,
	UserEmails,
	UserName,
};
