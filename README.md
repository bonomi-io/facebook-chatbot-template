# Facebook Chatbot Template

This is a template project for building a chatbot on the Messenger Platform. It is built using NodeJS, Express and Typescript, and consists of a verification and message receiver endpoints, and a couple of examples.

## Install

npm install

## Credits

Created by Bonomi (http://bonomi.io), please feel free to use it!

## Notes

### Change page profile text
```
curl -X POST -H "Content-Type: application/json" -d '{
  "greeting": [
    {
      "locale":"default",
      "text":"Hello {{user_first_name}}! Are you ready to see the cutests cats and dogs"
    }
  ]
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=YOUR_PAGE_ACCESS_TOKEN"
```

### Change page get started button payload
```
curl -X POST -H "Content-Type: application/json" -d '{
  "get_started": {"payload": "GET_STARTED"}
}' "https://graph.facebook.com/v2.6/me/messenger_profile?access_token=YOUR_PAGE_ACCESS_TOKEN"
```