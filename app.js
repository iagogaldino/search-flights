const axios = require("axios");
const configRequest = require("./configRequest");
const EventEmitter = require("events");
const eventEmitter = new EventEmitter();
let dateFilter;
let departedDate;
let priceFilter;
let originUser;
let destinationUser;

let configAPI = configRequest(originUser, destinationUser);

function formatDateTimeToBRL(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}/${month}/${year} 🕒${hours}:${minutes}`;
}

function authorizationRequest() {
 const d =  {
    method: "get",
    url: "https://gol-auth-api.voegol.com.br/api/authentication/create-token",
    headers: { 
      'accept': 'text/plain', 
      'accept-language': 'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7', 
      'cache-control': 'no-cache', 
      'loading': 'false', 
      'origin': 'https://b2c.voegol.com.br', 
      'pragma': 'no-cache', 
      'priority': 'u=1, i', 
      'referer': 'https://b2c.voegol.com.br/', 
      'sec-ch-ua': '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"', 
      'sec-ch-ua-mobile': '?0', 
      'sec-ch-ua-platform': '"Windows"', 
      'sec-fetch-dest': 'empty', 
      'sec-fetch-mode': 'cors', 
      'sec-fetch-site': 'same-site', 
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36', 
      'x-aat': 'ptfv9SxYjuwbZKpvEMSXGiCNrc9iX0a8ofmLNCPYWbEb9+e+8kzu+YAw2Wqev1K6zTp92OpKrZlKf++YIckVBA==', 
      'Cookie': 'dtCookie=v_4_srv_29_sn_B16B7D0F34EABD837337FB1B93C1CF7C_perc_100000_ol_0_mul_1_app-3Adad9f0ae23f43a32_1; incap_ses_1479_2618276=wfRSP0ySNVvGPYREyHaGFFv9wWYAAAAAEhaeXIVaPdz/x+sbYvRYOA==; nlbi_2618276=LEXAJG5i+BkZhrYbjGAFLwAAAACU5UHDWlxujtmDXc/AISXp; visid_incap_2618276=P8Tv3vZMQaW9Zj5IUEYH7w0GumYAAAAAQUIPAAAAAAAys32F6ukBlGEnqVYBWrdb'
    }
  }
  // console.log('authorizationRequest')
  axios
  .request(d)
  .then((response)=>{
    const authorization = `Bearer ${response.data.response.token}`;
    configAPI.headers.authorization = authorization;
    requestAPI();
  })
  .catch((error) => {console.log(error)});
}

function requestAPI() {
  // console.log(dateFilter, departedDate, priceFilter, originUser, destinationUser)
  if (configAPI.headers.authorization === 'NULL') {
    authorizationRequest();
    return;
  }
  axios
    .request(configAPI)
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
      console.log(configAPI);
      if (error.response.status === 401) {
        // console.log("Token invalido");
        authorizationRequest();
      }
      
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
  dateFilter = DATEFILTER;
  departedDate = DEPARTEDDATE;
  priceFilter = PRICEFILTER;
  originUser = ORIGINUSER;
  destinationUser = DESTINATIONUSER;

  requestAPI();
  setInterval(requestAPI, 580000);
}

// module.exports = startRequest;
module.exports.startRequest = startRequest;
module.exports.eventEmitter = eventEmitter;
