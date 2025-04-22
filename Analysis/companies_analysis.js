// What is the number of companies founded in each year? Sort by number of companies in descending order.
db.companies.aggregate([
    {
      $group: {
        _id: "$founded",
        number_of_companies: { $sum: 1 }
      }
    },
    {
      $sort: { number_of_companies: -1 }
    }
  ])

// Which locations have the highest number of companies?
db.companies.aggregate([
    {
      $group: {
        _id: "$location",
        number_of_companies: { $sum: 1 }
      }
    },
    {
      $sort: { number_of_companies: -1 }
    }
  ])

// Which companies have the highest number of job postings?
db.companies.aggregate([
    {
      $project: {
        _id:0,
        name: 1,
        job_count: { $size: "$posted_jobs" }
      }
    },
    {
      $sort: { job_count: -1 }
    }
  ])

// Which companies were founded the earliest, and how many job postings do they have?(Top-5 Companies)
db.companies.aggregate([
    {
      $project: {
        _id:0,
        name: 1,
        founded: 1,
        job_postings: { $size: "$posted_jobs" }
      }
    },
    {
      $sort: { founded: 1 } 
    },
    {
      $limit: 5 
    } 
  ])

// What is the average number of job postings per company for each location?
db.companies.aggregate([
    {
      $project: {
        _id :0,
        location: 1,  
        job_postings: { $size: "$posted_jobs" }
      }
    },
    {
      $group: {
        _id: "$location",  
        avg_job_postings: { $avg: "$job_postings" }
      }
    }
  ])
