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
// Result : 
// Location : 'Austin', total_number_of_job_posting: 4 
// Location : 'Los Angeles', total_number_of_job_posting: 3 },
// Location : 'Chicago', total_number_of_job_posting: 3 },
// Location : 'Phoenix', total_number_of_job_posting: 2 },
// and more 


// What is the average salary offered for each job type (e.g., Full_Time, Part_time, Internship, Training)?
db.jobs.aggregate([
    {$group:{_id:"$type",average_salary:{$avg:"$salary"}}},
    {$sort:{average_salary:-1}}
  ])
// Result : 
// job type = 'Full_Time', average_salary: 99702.7027027027 
// job type = 'Part_time', average_salary: 63000 
// job type = 'Training', average_salary: 57500 
// job type = 'Internship', average_salary: 52333.333


//What is the distribution of job postings by required experience level (e.g., Freshers, 1-2 years, 3-5 years, etc.)?
db.jobs.aggregate([
    {$group: {_id: "$experience_required",count: { $sum: 1 }}},
    {$sort: { _id: 1 }}
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
// Result : 
// Experience in years =  0, count: 2
// Experience in years =  1, count: 6 
// Experience in years =  2, count: 15 
// Experience in years =  3, count: 14 
// Experience in years =  4, count: 10 
// Experience in years =  5, count: 3 


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
// Result : 
// job type = 'Full_Time', maximum_salary: 160000 
// job type = 'Internship', maximum_salary: 92000 
// job type = 'Part_time', maximum_salary: 78000 
// job type = 'Training', maximum_salary: 61000 


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
// company = 'NeuroSoft', job_postings: 1 
// company = 'CloudTech', job_postings: 1 
// company = 'DataVision', job_postings: 1 
// and more 


// What is the average salary offered for each experience level (e.g., Freshers, 1-2 years, 3-5 years)?
db.jobs.aggregate([
    {
      $group: {
        _id: "$experience_required",
        average_salary: { $avg: "$salary" }
      }
    },
    {
      $sort: { _id : 1 }
    }
  ])
// Result :
// Experience in years =  0, average_salary: 32500 
// Experience in years =  1, average_salary: 64666.66
// Experience in years =  2, average_salary: 75600 
// Experience in years =  3, average_salary: 101214.28
// Experience in years =  4, average_salary: 110800 
// Experience in years =  5, average_salary: 117666.66


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
// Result : the most common job type is "Full_Time" and count is "37"


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
// Result : 
// Salary Range = 0, count: 3 
// Salary Range = 50000, count: 31 
// Salary Range > 100000 , count: 16



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
// Result : 
// Company = 'DeepThink', average_salary: 160000 
// Company = 'AI Tech', average_salary: 145000 
// Company = 'ChainBase', average_salary: 134000 
// Company = 'DataVision', average_salary: 130000 
// Company = 'SecureTech', average_salary: 125000 
// Company = 'ProdMaster', average_salary: 125000 
// and more 
