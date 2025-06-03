window.onload = function () {
  const params = new URLSearchParams(window.location.search);
  const userParam = params.get('user');

  if (userParam) {
      try {
          const userData = JSON.parse(decodeURIComponent(userParam));
          const redirectURL = userData.redirectURL;
          window.opener.postMessage(userData, redirectURL);
      } catch (error) {
          console.error("Error to handle data", error);
      }
  } else {
      console.log("No URL.");
  }

  setTimeout(() => window.close(), 500);
};
