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

//What is the distribution of job postings by required experience level (e.g., Freshers, 1-2 years, 3-5 years, etc.)?
db.jobs.aggregate([
    {$group: {_id: "$experience_required",count: { $sum: 1 }}},
    {$sort: { count: -1 }}
  ])
// using $bucket
db.jobs.aggregate([
    {
      $bucket: {
        groupBy: "$experience_required",
        boundaries: [0, 2, 5],
        default: "Experience greater than 5",
        output: {
          count: { $sum: 1 }
        }
      }
    }
  ])

// What is the highest salary offered for each job type (e.g., Full-Time, Part-Time, Internship, Training)?
db.jobs.aggregate([
    { 
      $group: { 
        _id: "$type", 
        maximum_salary: { $max: "$salary" } 
      } 
    },
    { 
      $sort: { maximum_salary: -1 } 
    }
  ])

// How many job postings are there for each company? Sort the results in descending order of the number of postings.
db.jobs.aggregate([
    {
      $group: {
        _id: "$company",
        job_postings: { $sum: 1 }
      }
    },
    {
      $sort: { job_postings: -1 }
    }
  ])

// What is the average salary offered for each experience level (e.g., Freshers, 1-2 years, 3-5 years)?
db.jobs.aggregate([
    {
      $group: {
        _id: "$experience_required",
        average_salary: { $avg: "$salary" }
      }
    },
    {
      $sort: { average_salary: -1 }
    }
  ])

// What is the most common job type (e.g., Full-Time, Part-Time, Internship, Training)?
db.jobs.aggregate([
    {
      $group: {
        _id: "$type",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } },
    { $limit: 1 }
  ])

// What is the distribution of job postings by salary range?
db.jobs.aggregate([
    {
      $bucket: {
        groupBy: "$salary",
        boundaries: [0, 50000, 100000],
        default: "Salary > 100000",
        output: {
          count: { $sum: 1 }
        }
      }
    }
  ])

// What is the total number of job postings for each location? Sort them in descending order.
db.jobs.aggregate([
    {
      $group: {
        _id: "$location",
        total_number_of_job_posting: { $sum: 1 }
      }
    },
    {
      $sort: { total_number_of_job_posting: -1 }
    }
  ])

// What is the average salary offered for each company?
db.jobs.aggregate([
    {
      $group: {
        _id: "$company",
        average_salary: { $avg: "$salary" }
      }
    },
    {
      $sort: { average_salary: -1 }
    }
  ])
