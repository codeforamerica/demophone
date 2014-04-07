# demophone

Ever needed to show off your fancy new SMS-based interface? Struggled as you asked everyone to gather around your phone to see it? Demophone was made for you. It's a simple, online phone for SMS demos. 

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