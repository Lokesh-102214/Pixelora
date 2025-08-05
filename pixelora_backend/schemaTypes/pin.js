export default {
    name: 'pin',        // Unique identifier for this schema
    title: 'Pin',       // Display name in Sanity Studio
    type : 'document',    // This is a document type (can be queried independently)
    fields: [            // Array of fields that each pin document will have
        {
            name: 'title',     // Field identifier
            title: 'Title',    // Display label in Studio
            type: 'string',    // Data type (text input)
        },
        {
            name: 'about',     // Field identifier
            title: 'About',    // Display label in Studio
            type: 'string',    // Data type (text input)
        },
        {
            name: 'destination',
            title: 'Destination',
            type: 'url',  // Data type for URLs (e.g., links to external sites)
        },
        {
            name: 'category',     // Field identifier
            title: 'Category',    // Display label in Studio
            type: 'string',    // Data type (text input)
        },
        
        {
            name: 'image',
            title: 'Image', 
            type: 'image',
            options : {
                hotspot: true,    // Enables image cropping and focal point selection
            } 
        },
        {
            name: 'userId',
            title: 'UserID',
            type: 'string',    // ID of the user who created the pin
        },
        {
            name: 'postedBy',
            title: 'PostedBy',    // Display label in Studio
            type: 'postedBy',   // Reference to the user who posted the pin
        },
        {
            name: 'save',
            title: 'Save',    // Display label in Studio
            type: 'array',
            of : [
                {type : 'save'}
            ]   // Array type to hold multiple saved references
        },
        {
            name: 'comments',
            title: 'Comments',    // Display label in Studio
            type: 'array',   // Array type to hold multiple comment references
            of : [
                {
                    type: 'comment',   // Reference to the comment schema
                }
            ]
        },
    ]

}