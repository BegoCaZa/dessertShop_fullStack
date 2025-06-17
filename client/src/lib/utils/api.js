const URL_BASE = 'http://localhost:3000';
const URL_API = '/api/desserts';

export const getAllDesserts = async () => {
  try {
    const response = await fetch(URL_BASE + URL_API);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const updateStock = async (id, quantity) => {
  try {
    const response = await fetch(URL_BASE + URL_API + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Failed to update stock');
    }
  } catch (error) {
    throw new Error(error);
  }
};
