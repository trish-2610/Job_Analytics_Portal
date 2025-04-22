// How many jobs are posted in each city (location) ? Sort them in descending order.
db.jobs.aggregate([
    { $group: { _id: "$location", total_jobs: { $sum: 1 } } },
    { $sort: { total_jobs: -1 } }
  ])

// What is the average salary offered for each job type (e.g., Full_Time, Part_time, Internship, Training)?
db.jobs.aggregate([
    {$group:{_id:"$type",average_salary:{$avg:"$salary"}}},
    {$sort:{average_salary:-1}}
  ])