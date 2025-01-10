const COREAPI_URL = 'http://coreapi:4000/graphql'; // Replace with your coreapi container's GraphQL endpoint

export const fetchSomeData = async () => {
  const query = `
    query {
      someData {
        id
        name
      }
    }
  `;

  try {
    const response = await fetch(COREAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};