const COREAPI_URL = 'http://coreapi:4000/graphql'; // Replace with your coreapi container's GraphQL endpoint

import dotenv from 'dotenv';



export const addAttachment = async (
  fileDisplayName: string,
  filePath: string,
  note: string,
  consultationId: string,
  cookie: string
) => {
  const query = `
    mutation AddAttachment(
      $fileDisplayName: String!,
      $filePath: String!,
      $note: String!,
      $consultationId: String!
    ) {
      addAttachment(
        fileDisplayName: $fileDisplayName,
        filePath: $filePath,
        note: $note,
        consultationId: $consultationId
      ) {
        id
      }
    }
  `;

  const variables = {
    fileDisplayName,
    filePath,
    note,
    consultationId
  };

  try {
    const response = await fetch(COREAPI_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Set-Cookie': cookie, 'cookie': cookie },
      body: JSON.stringify({ query, variables })
    });

    //console.info('GraphQL Response:', response, 'JSON response',  jsonResponse );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.errors) { // This enables us to forward graphQL errors to the client
      throw new Error(result.errors[0].message);
    }

    return result.data.addAttachment;
  } catch (error) {
    console.error('Error posting data to core api:', error);
    throw error;
  }
};
