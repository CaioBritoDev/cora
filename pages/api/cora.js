import axios from "axios";
const https = require("https");
const fs = require("fs");

async function coraToken(request, response) {

  const apiSecret = process.env.CLIENT_ID_STAGE; // In vercel, no possible to access in localhost

  // const cert = "./keys/certificate.pem";
  // const key = "./keys/private-key.key";
  // const url = "https://matls-clients.api.stage.cora.com.br/token";

  const cert = fs.readFileSync("/../../keys/certificate.pem");

  const key = fs.readFileSync("/../../keys/private-key.key");

  const url = "https://matls-clients.api.stage.cora.com.br/token";

  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: apiSecret,
  }).toString();

  /*const agent = new https.Agent({
    cert: cert,
    key: key,
  });

  axios
    .post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      httpsAgent: agent
    })
    .then((res) => {
      response.json({
        data: res.data, // Axios make res.json() and stores in the data
      });
    })
    .catch((error) => {
      response.json({
        err: error,
      });
    });*/

  const https = require("https");

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    cert: cert,
    key: key,
  };

  const req = https.request(url, options, (res) => {
    let data = "";

    res.on("data", (chunk) => {
      data += chunk;
    });

    res.on("end", () => {
      console.log(JSON.parse(data));
      response.json({
        data: JSON.parse(data)
      })
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
    response.json({
      err: error
    })
  });

  req.write(params); // Send the body
  req.end();

  // If you want to save the response in cache and perform your endpoint - in 10 seconds, versel make other request and put in the cache - your website never going to crash -> just for generic responses endpoints. Not my case
  // response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')

}

export default coraToken;
