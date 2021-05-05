module.exports = {
  api: {
    key: process.env.MAILCHIMP_API_KEY || 'XXX',
    dc: process.env.MAILCHIMP_DC || 'XXX',
    listId: process.env.MAILCHIMP_AUDIENCE_ID || 0,
  },
};
