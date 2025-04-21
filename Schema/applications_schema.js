db.createCollection("applications", {
    validator: {
      $jsonSchema: {
        required: ["job_id", "candidate_id", "applied_on", "status"],
        properties: {
          job_id: { bsonType: "objectId" },
          candidate_id: { bsonType: "objectId" },
          applied_on: { bsonType: "date" },
          status: {
            bsonType: "string",
            enum: ["Pending", "Reviewed", "Interviewed", "Rejected", "Hired"]
          }
        }
      }
    },
    validationAction: "error"
  });