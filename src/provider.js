import {
  GET_LIST,
  GET_ONE,
  UPDATE,
} from 'react-admin';

export default (serverUrl) => {
  let url = '';
  let transformer = null;

  const options = {
    headers: new Headers({
      // 'Accept': 'application/json',
    }),
  };

  return (type, resource, params) => {
    switch (type) {
      case GET_LIST: {
        url = serverUrl + `/${resource}`
        options.method = 'GET';
        transformer = (response) => {
          return { data: response.items.map((x) => {
            x['id'] = x.metadata.name;
            return x
          }), total: response.items.length }
        }
        break;
      }

      case GET_ONE: {
        url = serverUrl + `/${resource}/${params.id}`;
        options.method = 'GET';
        transformer = (response) => {
          response['id'] = response.metadata.name;
          return {
            data: response,
          }
        }
        break;
      }

      case UPDATE: {
        url = serverUrl + `/${resource}/${params.id}`;
        options.method = 'PATCH';
        options.body = JSON.stringify(params.data);
        options.headers['content-type'] = 'application/strategic-merge-patch+json';

        transformer = (response) => {
          console.log(response)
          response['id'] = response.metadata.name;
          return {
            data: response,
          }
        }
        break;
      }
    }

    console.log(url);
    console.log(options);

    return fetch(url, options)
      .then(res => res.json())
      .then(transformer);
  }
}
