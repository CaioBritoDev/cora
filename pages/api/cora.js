import axios from "axios";
const https = require("https");
const fs = require("fs");

async function coraToken(request, response) {
  const apiSecret = process.env.CLIENT_ID_STAGE; // In vercel, no possible to access in localhost

  // const cert = "./keys/certificate.pem";
  // const key = "./keys/private-key.key";
  // const url = "https://matls-clients.api.stage.cora.com.br/token";

  
  const cert = fs.readFileSync(
    "./keys/certificate.pem"
  );
  const key = fs.readFileSync(
    "./keys/private-key.key"
  );
  const url = "https://matls-clients.api.stage.cora.com.br/token";
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: apiSecret,
  }).toString();

  const agent = new https.Agent({
    cert: cert,
    key: key,
  });

  axios
    .post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      httpsAgent: agent,
    })
    .then((res) => {
      response.json(res.data)
    })
    .catch((error) => {
      response.json(error)
    });

  // If you want to save the response in cache and perform your endpoint - in 10 seconds, versel make other request and put in the cache - your website never going to crash -> just for generic responses endpoints. Not my case
  // response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
}

export default coraToken;
