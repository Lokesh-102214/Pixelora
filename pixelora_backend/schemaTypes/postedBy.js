export default {
    name : "postedBy",        // Unique identifier for this schema
    title: "PostedBy",       // Display name in Sanity Studio
    type : "reference",    // This is a reference type (points to another document)
    to: [                     // Array of references this can point to
        { type: "user" }  // Reference to the user schema
    ],
}