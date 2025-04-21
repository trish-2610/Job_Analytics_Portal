db.createCollection("companies", {
    validator: {
      $jsonSchema: {
        required: ["name", "location", "founded", "posted_jobs"],
        properties: {
          name: { bsonType: "string" },
          location: { bsonType: "string" },
          founded: {
            bsonType: "int",
            minimum: 1900,
            maximum: 2025
          },
          posted_jobs: {
            bsonType: "array",
            items: { bsonType: "objectId" }
          }
        }
      }
    },
    validationAction: "error"
  });
  