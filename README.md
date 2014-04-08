# demophone

Ever needed to show off your fancy new SMS-based interface? Struggled as you asked everyone to gather around your phone to see it? Demophone was made for you. It's a simple, online phone for SMS demos. 

![demophone screenshot](https://cloud.githubusercontent.com/assets/1435836/2635931/db674a62-be8a-11e3-857f-544b6fba9243.png)

# Deploying to Herkou

The first thing you need to do is get a phone number and Twilio auth tokens for demophone. Refer to the [Twilio FAQ](http://www.twilio.com/help/faq/phone-numbers). Once you have those, clone the repo and run these commands:

```
heroku create
git push heroku master
heroku config:set TWILIO_ACCOUNT_SID=<account-sid-here>
heroku config:set TWILIO_AUTH_TOKEN=<auth-token-here>
heroku config:set TWILIO_PHONE_NUMBER=<twilio-phone-number-here>
heroku info
```

This will provide you with the url of your app.

The final step is to create the Twilio hook. Go the [Twilio Phone Controls](https://www.twilio.com/user/account/phone-numbers/incoming), select your phone number, and a messaging url of `<app_url>/receiveText`.

# Adding a dash of security

To prevent people from using the endpoint to send twilio messages, you can enable Basic Auth. Just add a username and password to the environment variables. On Heroku:

```
heroku config:set HTTP_BASIC_USER=<username>
heroku config:set HTTP_BASIC_PASS=<password>
```