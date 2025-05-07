window.onload = function () {
    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('user');
    if (userParam) {
      const userData = JSON.parse(decodeURIComponent(userParam));
      window.opener.postMessage(userData, "https://localhost:4433");
    } else {
      console.log("No URL.");
    }
    setTimeout(() => window.close(), 500);
  };
  