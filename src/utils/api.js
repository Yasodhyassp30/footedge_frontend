export async function api(url, options = {}) {
  const config = {
      method: 'GET',
      ...options,
  };

  const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...config.headers,
  };

  const params = {
      headers,
      method: config.method,
      body: config.payload && JSON.stringify(config.payload),
  };

  try {
      const response = await fetch(url, params);

      if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
      }

      const contentType = response.headers.get('content-type');

      if (contentType && contentType.includes('application/json')) {
          return response.json();
      }

      return response.blob();
  } catch (error) {
      throw new Error(`Failed to fetch: ${error.message}`);
  }
}
