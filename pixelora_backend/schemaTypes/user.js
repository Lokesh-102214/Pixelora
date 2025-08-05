export default {
  name: 'user',        // Unique identifier for this schema
  title: 'User',       // Display name in Sanity Studio
  type: 'document',    // This is a document type (can be queried independently)
  fields: [            // Array of fields that each user document will have
    {
      name: 'userName',     // Field identifier
      title: 'Username',    // Display label in Studio
      type: 'string',       // Data type (text input)
    },
    {
      name: 'image',
      title: 'Image', 
      type: 'string',       // Stores image URL as string
    },
  ]
}
