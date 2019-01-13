import querystring from 'querystring';

const buildFormData = data => {
  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, data[key]);
  });
  return formData;
};

const formatBody = (method, type, data) => {
  if (method === 'GET' || !data) return undefined;
  if (type === 'application/json') return JSON.stringify(data);
  if (type === 'multipart/form-data') return buildFormData(data);
  return undefined;
};

export default class Base {
  get(props) {
    return this._request({
      method: 'GET',
      ...props,
    });
  }

  post(props) {
    return this._request({
      method: 'POST',
      ...props,
    });
  }

  put(props) {
    return this._request({
      method: 'PUT',
      ...props,
    });
  }

  _request({
    data,
    headers = {},
    method = 'GET',
    path,
  }) {
    const contentType = headers['Content-Type'] || 'application/json';
    const url = [this.base, path].join('/');
    const body = formatBody(method, contentType, data);
    const query =
      method === 'GET' && data ? `?${querystring.stringify(data)}` : '';

    return fetch(`${url}${query}`, {
      headers,
      body,
      method,
    }).then(async response => {
      const { status: code } = response;
      if (response.ok && code >= 200 && code < 300) {
        try {
          const data = await response.json();
          return { data };
        } catch (error) {
          throw new Error('Error parsing response body');
        }
      }
    }).catch(({ message = 'Network error' }) => {
      return { error: { message, code: 0 } };
    });
  }
}
