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
// Result : 
// Year : 2014, number_of_companies: 6 
// Year : 2010, number_of_companies: 5 
// Year : 2015, number_of_companies: 5 
// Year : 2008, number_of_companies: 4 
// Year : 2007, number_of_companies: 4 
// and more 


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
// Result : 
// 'San Francisco, USA', number_of_companies: 8 
// 'Toronto, Canada', number_of_companies: 7 
// 'London, UK', number_of_companies: 6 
// 'Berlin, Germany', number_of_companies: 6 
// 'Sydney, Australia', number_of_companies: 5 
// 'Paris, France', number_of_companies: 5 


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
// Result : 
// name: 'TechPioneers Inc.', job_count: 2 
// name: 'Global Tech Co.', job_count: 2 
// name: 'Innovation Hub', job_count: 2 
// name: 'TechGiant Corp.', job_count: 2 
// name: 'NextGen Technologies', job_count: 2  


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
// Result : 
// name: 'Digital World Enterprises', founded: 1995, job_postings: 2 
// name: 'TechGiant Corp.', founded: 1998, job_postings: 2 
// name: 'Tech Innovations Ltd.', founded: 2000, job_postings: 2 
// name: 'CloudNet Innovations', founded: 2005, job_postings: 2 
// name: 'Global Tech Co.', founded: 2005, job_postings: 2 


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
// Result : 
// 'New York, USA', avg_job_postings: 2 
// 'Los Angeles, USA', avg_job_postings: 2 
// 'Paris, France', avg_job_postings: 2 
// 'Berlin, Germany', avg_job_postings: 2 
// 'Boston, USA', avg_job_postings: 2 
//  and more 