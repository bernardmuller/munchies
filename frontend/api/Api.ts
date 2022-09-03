import { getCookie } from "cookies-next";

export class Api {
  static setHeaders = () => {
    const token = getCookie('token')
    if (token) {
      return {
        authorization: `Bearer ${token}`,
        'Access-Control-Allow-Methods':
          'GET, POST, PATCH, PUT, DELETE, OPTIONS',
        credentials: 'include',
        'Content-Type': 'application/json',
      };
    }
    return {
      'Content-Type': 'application/json',
    };
  };

  static sendRequest = async (url: any, params: any) => {
    const headers = this.setHeaders();
    const data = params.body;
    delete params.body;

    const response = await fetch(url, {
      headers: { ...headers },
      body: JSON.stringify(data),
      ...params,
    })
      .then(res => res.json())
      .catch(err => {
        console.log('Request Error: ' + err);
      });
    return response;
  };

  static get(url: String) {
    return this.sendRequest(
      url,
      {
        method: 'GET',
      },
    );
  }

  static post(url: any, data: Object) {
    return this.sendRequest(
      url,
      {
        method: 'post',
        body: data,
      },
    );
  }

  static put(url: any, data: Object, token: String) {
    return this.sendRequest(
      url,
      {
        method: 'PUT',
        body: data,
      },
    );
  }

  static delete(url: any, token: String) {
    return this.sendRequest(
      url,
      {
        method: 'DELETE',
        body: {},
      },
    );
  }
}
