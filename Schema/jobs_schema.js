db.createCollection("jobs", {
  validator: {
    $jsonSchema: {
      required: ["title", "company", "location", "salary", "type", "posted_on", "skills_required", "experience_required", "remote"],
      properties: {
        title: { bsonType: "string" },
        company: { bsonType: "string" }, 
        location: { bsonType: "string" },
        salary: { bsonType: "int", minimum: 0 },
        type: { enum: ["Full_Time", "Part_time", "Internship", "Training"] },
        posted_on: { bsonType: "date" },
        skills_required: {
          bsonType: "array",
          items: {
            bsonType: "string"
          },
          minItems: 1
        },
        experience_required: { bsonType: "int", minimum: 0 },
        remote: { bsonType: "bool" }
      }
    }
  },
  validationAction: "error"
});
