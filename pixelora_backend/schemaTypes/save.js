export default {
    name: 'save',        // Unique identifier for this schema
    title: 'Save',       // Display name in Sanity Studio  
    type: 'document',      // This is a document type (can be queried independently)
    fields: [            // Array of fields that each comment document will have
        {
            name: 'postedBy',    // Field identifier for the user who posted the comment
            title: 'PostedBy',  // Display label in Studio
            type: 'postedBy',    // Reference to the user who posted the comment
        },
        {
            name: 'userId',     // Field identifier
            title: 'UserID',    // Display label in Studio
            type: 'string',      // Data type (text input)
        },
    ]
}