export async function api(url, options = {}) {
    const config = {
        method: 'GET',
        ...options,
    };


    console.log(localStorage.getItem('user'));
    const headers = {
        Authorization: JSON.parse(localStorage.getItem('user'))?.user.token || null,
        Accept: 'application/json',
        ...config.headers,
    };

    if (!(config.payload instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
        config.payload = JSON.stringify(config.payload);
    }

    const params = {
        headers,
        method: config.method,
        body: config.method !== 'GET' ? config.payload : undefined,
    };

    try {
        const response = await fetch(url, params);

        if (!response.ok) {
            throw new Error(`Request failed with status ${response.status}`);
        }

        const contentType = response.headers.get('content-type');

        if (contentType && contentType.includes('application/json')) {
            return response.json();
        } else {
            return response.blob();
        }
    } catch (error) {
        throw new Error(`Failed to fetch: ${error.message}`);
    }
}