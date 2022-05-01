(async () => {
  const rawResponse = await fetch('https://afternoon-island-99074.herokuapp.com/auth/signup', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username: "hiEamonn", password: 'BigTest'})
  });
  const content = await rawResponse.json();

  console.log(content);
})();