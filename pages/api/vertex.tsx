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
    client_id: "b3ab744f94204912b9ce5cbbff8072ef",
    client_secret: "46825601092f4941b2ee736075802565",
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