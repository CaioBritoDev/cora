function coraToken(request, response) {

  const apiSecret = process.env.SECRET_KEY
  const dynamicDate = new Date().toDateString();

  response.json({
    time: dynamicDate,
    secret: apiSecret
  });

}

export default coraToken;