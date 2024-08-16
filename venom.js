// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require("venom-bot");
const { startRequest, eventEmitter } = require("./app");
const config = require('./config')
let clientStarted;
let phoneNumberWhatsApp = config.phoneNumberWhatsApp;
const from = `${phoneNumberWhatsApp}@c.us`;

startRequest(
  config.dateFilter,
  config.departedDate,
  config.priceFilter,
  config.originUser,
  config.destinationUser
);
return;
venom
  .create({
    session: "session-name", //name of session
  })
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  clientStarted = client;
  startRequest(
    config.dateFilter,
    config.departedDate,
    config.priceFilter,
    config.originUser,
    config.destinationUser
  );

  eventEmitter.on("flight-info", (info) => {
    console.log("flight-info", info);
    clientStarted
      .sendText(from, info)
      .then((result) => {
        // console.log("Result: ", result);
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro);
      });
  });

  eventEmitter.on("alert-flight", (alertFlight) => {
    clientStarted
      .sendText(from, alertFlight)
      .then((result) => {
        // console.log("Result: ", result);
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro);
      });
  });

  client.onMessage((message) => {
    if (message.body === "Hi" && message.isGroupMsg === false) {
      client
        .sendText(message.from, "Welcome Venom 🕷")
        .then((result) => {
          console.log("Result: ", result); //return object success
        })
        .catch((erro) => {
          console.error("Error when sending: ", erro); //return object error
        });
    }
  });
}
