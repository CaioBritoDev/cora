function coraToken(request, response) {
  const dynamicDate = new Date();

  response.json({
    time: dynamicDate
  });
}

export default coraToken;