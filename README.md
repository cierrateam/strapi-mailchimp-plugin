# Strapi plugin Mailchimp

This plugin allows users to subscribe via API to Mailchimp newsletters

## How to install
- put package to ./plugins
- add permissions for mailchimp endpoint `/mailchimp/subscribe` to read by anonymous users (Role public)
- add to `./.env` param `MAILCHIMP_API_KEY`, `MAILCHIMP_DC` and `MAILCHIMP_AUDIENCE_ID`
