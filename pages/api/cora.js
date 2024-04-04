import axios from "axios";

async function coraToken(request, response) {
  const apiSecret = process.env.CLIENT_ID_STAGE; // In vercel, no possible to access in localhost

  const cert = "./keys/certificate.pem";
  const key = "./keys/private-key.key";
  const url = "https://matls-clients.api.stage.cora.com.br/token";
  const params = `grant_type=client_credentials&client_id=${apiSecret}`;

  var xhr = new XMLHttpRequest();

  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.setRequestHeader("cert", cert);
  xhr.setRequestHeader("key", key);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      response.json({
        response: xhr.responseText,
      });
    }
  };

  xhr.send(params);

  /*axios.post(url, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        cert: cert,
        key: key,
      }
    })
    .then((res) => res.json())
    .then((jsonFormat) => response.json(jsonFormat))
    .catch((error) => {
      console.error("Erro ao fazer a solicitação:", error);
      response.json(error.response);
    });*/

  // If you want to save the response in cache and perform your endpoint - in 10 seconds, versel make other request and put in the cache - your website never going to crash -> just for generic responses endpoints. Not my case
  // response.setHeader('Cache-Control', 's-maxage=10, stale-while-revalidate')
}

export default coraToken;
