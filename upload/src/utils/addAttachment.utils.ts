import dotenv from 'dotenv';

dotenv.config();

const {API_HOST, API_PORT} = process.env;

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

export const addAttachment = async (
  fileDisplayName: string,
  filePath: string,
  note: string,
  consultationId: string,
  cookie: string
) => {
  try {
    const response = await fetch(`http://${API_HOST}:${API_PORT}/graphql`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'cookie':cookie },
      body: JSON.stringify({ query, variables: {
        fileDisplayName,
        filePath,
        note,
        consultationId
      } })
    });

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
