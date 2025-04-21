db.createCollection("candidates", {
    validator: {
      $jsonSchema: {
        required: ["name", "email", "location", "skills", "experience", "certifications", "applied_jobs", "registration_date"],
        properties: {
          name: { bsonType: "string" },
          email: { bsonType: "string", pattern: "^.+@.+\\..+$" },
          location: { bsonType: "string" },
          skills: {
            bsonType: "array",
            items: {
              bsonType: "string"
            },
            minItems: 1
          },
          experience: { bsonType: "int", minimum: 0 },
          certifications: {
            bsonType: "array",
            items: { bsonType: "string" }
          },
          applied_jobs: {
            bsonType: "array",
            items: { bsonType: "objectId" }
          },
          registration_date: { bsonType: "date" }
        }
      }
    },
    validationAction: "error"
  });
  