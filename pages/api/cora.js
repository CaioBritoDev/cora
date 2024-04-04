function coraToken(request, response) {

  const apiSecret = process.env.API_SECRET
  const dynamicDate = new Date().toDateString();

  response.json({
    time: dynamicDate,
    secret: apiSecret
  });
  
}

export default coraToken;