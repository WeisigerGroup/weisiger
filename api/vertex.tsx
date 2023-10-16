import $ from 'jquery';

interface AjaxData {
  client_id: string;
  client_secret: string;
  grant_type: string;
  scope: string;
}

interface AjaxResponse {
  access_token: string;
}

export const fetchToken = (): Promise<AjaxResponse> => {

    /* 
      fetch("https://auth.vertexsmb.com/identity/connect/token", {
      method: "POST",
      headers: {
          'Content-Type': 'application/x-www-form-urlencoded', // set the content type for form data
      },
      body: new URLSearchParams({
          "client_id": "943115e883d243e48c359f6599b198ef",
          "client_secret": "0fc0eb81a635420585f2662a71d58b3d",
          "grant_type": "client_credentials",
          "scope": "vtms-internal-api ecw-wizard-api"
      }),
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      return response.json();
  })
  .then(data => {
      // handle data (parsed JSON)
  })
  .catch(error => {
      console.error("Failed to fetch token:", error);
  });

  */


  const data: AjaxData = {
    client_id: "943115e883d243e48c359f6599b198ef",
    client_secret: "0fc0eb81a635420585f2662a71d58b3d",
    grant_type: "client_credentials",
    scope: "vtms-internal-api ecw-wizard-api"
  };

  return new Promise((resolve, reject) => {
    $.ajax({
      url: "https://auth.vertexsmb.com/identity/connect/token",
      method: "POST",
      data: data
    })
    .done(response => {
      resolve(response as AjaxResponse);
    })
    .fail(error => {
      reject(error);
    });
  });
};
