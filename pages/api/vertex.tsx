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

  const data: AjaxData = {
    client_id: "23ce5afd5b6c4feca7e2f489e4604cd8", // Update with the new Client ID provided by Vertex
    client_secret: "2ea48c9276fe4fe6a94419e62f15445a", // Update with the new Client Secret provided by Vertex
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