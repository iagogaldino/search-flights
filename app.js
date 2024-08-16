const axios = require("axios");
const configRequest = require("./configRequest");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
let dateFilter;
let departedDate;
let priceFilter;
let originUser;
let destinationUser;

function formatDateTimeToBRL(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} 🕒${hours}:${minutes}`;
}

function requestAPI() {
  console.log(dateFilter, departedDate, priceFilter, originUser, destinationUser)

  axios
    .request(configRequest(originUser, destinationUser))
    .then((response) => {
      let info = ``;
      let total = 0;

      for (let a of response.data.response.airSearchResults
        .unbundledAlternateDateOffers) {
        for (let b of a) {
          for (let c of b.itineraryPart) {
            for (let segment of c.segments) {
              let origin = segment.origin;
              let destination = segment.destination;
              let amount = b.total.alternatives[0][0].amount;
              let departureBack = formatDateTimeToBRL(segment.departure);
              let arrivalBack = formatDateTimeToBRL(segment.arrival);
              const msg = {
                origin,
                destination,
                amount,
                departureBack,
                arrivalBack,
              };

              if (
                segment.departure.includes(dateFilter) &&
                origin === originUser
              ) {
                msg.title = `✈️ *Outbound flight Information* ✈️`;
                info += prepareMessage(msg);
                total += amount;

                // console.log(flightInfo);
                if (b.total.alternatives[0][0].amount < priceFilter) {
                  console.log(
                    `>>>>>>>>>>>>>>>>> Date: ${dat} Price: ${b.total.alternatives[0][0].amount}`
                  );
                  eventEmitter.emit("alert-flight", flightInfo);
                }
              }

              if (
                segment.departure.includes(departedDate) &&
                origin === destinationUser
              ) {
                msg.title = `🛬 *Return flight Information* 🛬`;
                info += prepareMessage(msg);
                total += amount;
              }
            }
          }
        }
      }

      info += `
Total: R$${total}`;
      console.log(info);
      eventEmitter.emit("flight-info", info);
    })
    .catch((error) => {
      console.log(error);
    });
}

function prepareMessage(message) {
  return `
${message.title}

🌍 *From:* ${message.origin} ➡️ ${message.destination}
🛫 *Departure:* ${message.departureBack}
🛬 *Arrival:* ${message.arrivalBack}
💸 *Price:* R$${message.amount}
`;
}

function startRequest(DATEFILTER, DEPARTEDDATE, PRICEFILTER, ORIGINUSER, DESTINATIONUSER) {
  // console.log("startRequest");
  dateFilter = DATEFILTER;
  departedDate = DEPARTEDDATE;
  priceFilter = PRICEFILTER;
  originUser = ORIGINUSER;
  destinationUser = DESTINATIONUSER;

  requestAPI();
  setInterval(requestAPI, 580000); // Repeat every 180,000 ms (3 minutes)
}

// module.exports = startRequest;
module.exports.startRequest = startRequest;
module.exports.eventEmitter = eventEmitter;
