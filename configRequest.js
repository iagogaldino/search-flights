// from = "PNZ";
// to = "GRU";
function configRequest(from, to) {
  let data = {
    promocodebanner: false,
    destinationCountryToUSA: false,
    lastSearchCourtesyTicket: false,
    passengerCourtesyType: null,
    airSearch: {
      cabinClass: null,
      currency: null,
      pointOfSale: "BR",
      awardBooking: false,
      searchType: "BRANDED",
      promoCodes: [""],
      originalItineraryParts: [
        {
          from: {
            code: to,
            useNearbyLocations: false,
          },
          to: {
            code: from,
            useNearbyLocations: false,
          },
          when: {
            date: "2024-10-19T00:00:00",
          },
          selectedOfferRef: null,
          plusMinusDays: null,
        },
        {
          from: {
            code: from,
            useNearbyLocations: false,
          },
          to: {
            code: to,
            useNearbyLocations: false,
          },
          when: {
            date: "2024-10-21T00:00:00",
          },
          selectedOfferRef: null,
          plusMinusDays: null,
        },
      ],
      itineraryParts: [
        {
          from: {
            code: "GRU",
            useNearbyLocations: false,
          },
          to: {
            code: "PNZ",
            useNearbyLocations: false,
          },
          when: {
            date: "2024-10-19T00:00:00",
          },
          selectedOfferRef: null,
          plusMinusDays: null,
        },
        {
          from: {
            code: "PNZ",
            useNearbyLocations: false,
          },
          to: {
            code: "GRU",
            useNearbyLocations: false,
          },
          when: {
            date: "2024-10-21T00:00:00",
          },
          selectedOfferRef: null,
          plusMinusDays: null,
        },
      ],
      passengers: {
        ADT: 1,
        CHD: 0,
        INF: 0,
      },
      trendIndicator: null,
      preferredOperatingCarrier: null,
    },
  };  
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url:
      "https://b2c-api.voegol.com.br/api/sabre-default/flights?context=b2c&flow=Issue",
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7",
      authorization:
        "Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjkyM0NFMDYyQkI0M0QzRTNFNEEzQUM2MkFENTMwNUMzRDEyNEM3MzIiLCJ4NXQiOiJranpnWXJ0RDAtUGtvNnhpclZNRnc5RWt4ekkiLCJ0eXAiOiJKV1QifQ.eyJkY3QiOiJWREZTVEVGUlRIbE9NR1E1YlU5UVUyTjJRamwyVFU5c1JqWnJhVFpxUVVFMmVFOVJaRlk0WjJkME4yVXZObk50YUdoRWNFdEhRekp3Y2xnMlpISXJLeXRDYUhCQkx6VnpRVUZFVVhGSk5HaFdiMDl3WkhSdU1rRlNPSEF6Vm1Kc01sVndNbkpGYzBVM1oybFljaTlNTkRZM1JYbG5kUzlOVWtkb0x5c3ljbUp0UlZwMFluUnlNbWRLV0drMFFWbGpVMGhNWTBadFFqZG1lRkJWU2s5SGRtWmtiMDFuZWxZMFYybHZPSGhGT0RkYVRuVTVSSGc0UlVzd00wVlhaRlIwWmxVeUwzRjBVbWt5VDFJMFFXMHZVa04wUjFOdFJERmxLeXRSTlhsalNHZHlTbE54VDFCRFNpdGlURU5RZVhGMWVGVkJWWFZKUVdOWGRuUllUVTU2ZUVaMVZWRlpLMlZaWm14MWJUTkJVR3g0VERaYWRXRlZlRms0Y20xWFZESnpOSGhyUTNOd2QyaENTR1JxV2pKQmFVOXNNRko1VEc1bFNrMDFjMDlzU0c1NldESlZTbEJ0TkdKNlQxUkRibGQ0V1dVMWVteE5Uek4xWlRSeVF5dEtjalIzS2lvPSIsInN0ZiI6IkczREMiLCJuYmYiOjE3MjM0NjU4NTYsImV4cCI6MTcyMzg5Nzg1NywiaWF0IjoxNzIzNDY1ODU3LCJpc3MiOiJodHRwczovL2F1dGgtYXBpLnZvZWdvbC5jbG91ZCIsImF1ZCI6ImIyYy52b2Vnb2wuY29tLmJyL1BST0QifQ.XTQ_NF78BAw4uNdGKkpktDrW0_4SJDus8GwmapxM_CHUOuhVbGlZin7yZ_kv6SM2RUtTF3ffdqv32FZaZ3h5LPp6-nCvRVRS7bQevOvimbZycZyyTN59YxEywzGajE8WOqNbSDg0yPhWS4aPgFNAJU2wD_TXh67GrC33Vlc9M1QSu2-k_ztRc_aLpxZ2XYebGiSa188vIVqKnFEANx_JXAmqDkqRDotA0QPlncLTunD48KG5N74bNhkeCRrN5JnZ5KIkm-nVPSQX0Hx8zgNYiza1_rMriVXKNOLCyyXlYAyHrGYmynRfpNWkWakoBPIP8FXNmnHO0YkYCvZx6ZQstg",
      "cache-control": "no-cache",
      "content-type": "application/json",
      loading: "false",
      origin: "https://b2c.voegol.com.br",
      pragma: "no-cache",
      priority: "u=1, i",
      referer: "https://b2c.voegol.com.br/",
      "sec-ch-ua":
        '"Not)A;Brand";v="99", "Google Chrome";v="127", "Chromium";v="127"',
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": '"Windows"',
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "user-agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36",
      "x-jsessionid": "",
      "x-sabre-cookie-encoded": "",
      Cookie:
        "dtCookie=v_4_srv_22_sn_AD0793A05B99DA821750622EE7292CC7_perc_100000_ol_0_mul_1_app-3Adad9f0ae23f43a32_1; incap_ses_787_2618276=SQw4X1L+XzwoG8Z+d/zrCg0GumYAAAAAyaUFO/6EipDLxH3yj2r+5Q==; nlbi_2618276=c5YgR1B+K1JrnaHgjGAFLwAAAAAjfVWxk1fet4NeuBGl0taz; visid_incap_2618276=P8Tv3vZMQaW9Zj5IUEYH7w0GumYAAAAAQUIPAAAAAAAys32F6ukBlGEnqVYBWrdb",
    },
    data: JSON.stringify( data ),
  };

  return config;
}

module.exports = configRequest;