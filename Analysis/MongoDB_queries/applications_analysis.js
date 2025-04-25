// How many applications are there for each status (Pending, Reviewed, Interviewed, Rejected, Hired)?
db.applications.aggregate([
    {
      $group: {
        _id: "$status",
        job_applications_count: { $sum: 1 }
      }
    },
    {
      $sort: { job_applications_count: -1 }
    }
  ])
// Result :
// 'Rejected', job_applications_count: 11
// 'Pending', job_applications_count: 10 
// 'Reviewed', job_applications_count: 10
// 'Interviewed', job_applications_count: 10
// 'Hired', job_applications_count: 9


// How many applications were submitted per day?
db.applications.aggregate([
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$applied_on" }
        },
        applications_submitted: { $sum: 1 }
      }
    },
    { $sort: { applications_submitted : -1 } } 
  ])
// Result :
// '2023-08-30', applications_submitted: 3 
// '2023-07-22', applications_submitted: 3 
// '2023-11-18', applications_submitted: 2 
// '2023-05-05', applications_submitted: 2 
// '2023-06-05', applications_submitted: 2 
//  and more 

 
// What is the most recent application date for each job?
db.applications.aggregate([
    {
      $group: {
        _id: "$job_id",
        most_recent_application : { $max: "$applied_on" }  
      }
    },
    { $sort: { most_recent_application: -1 } }  
  ])
// Result :
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e53'),most_recent_application: ISODate('2024-01-10T00:00:00.000Z')
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e55'),most_recent_application: ISODate('2023-12-17T00:00:00.000Z')
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e5e'),most_recent_application: ISODate('2023-12-01T00:00:00.000Z')
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e54'),most_recent_application: ISODate('2023-11-25T00:00:00.000Z')
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e68'),most_recent_application: ISODate('2023-11-25T00:00:00.000Z')
// and more 


// What is the total number of applications for each candidate (by candidate_id)?
db.applications.aggregate([
    {
      $group: {
        _id: "$candidate_id",  // Group by candidate_id
        total_applications: { $sum: 1 }  // Count the total number of applications per candidate
      }
    },
    { 
      $sort: { total_applications: -1 }  // Sort by total applications in descending order
    }
  ])

  
// What is the most common status of job applications?
db.applications.aggregate([
    {
      $group: {
        _id: "$status" ,  
        count: { $sum: 1 }  
      }
    },
    { 
      $sort: { count: -1 }  
    },
    { 
      $limit: 1  
    }
  ])
// Result :
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e49'), total_applications: 3 
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e43'), total_applications: 2 
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e41'), total_applications: 2 
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e44'), total_applications: 2
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e48'), total_applications: 2 
// and more 


// What is the distribution of applications over the months?
db.applications.aggregate([
    {
      $group: {
        _id: { $month: "$applied_on" },  
        count: { $sum: 1 }               
      }
    },
    {
      $sort: { _id: 1 }  
    }
  ])
// Result :  where id means month (1 - January , 2 - February ...)
// id: 1, count: 1
// id: 2, count: 1 
// id: 3, count: 5 
// id: 4, count: 3 
// id: 5, count: 5 
// id: 6, count: 9
// id: 7, count: 7 
// id: 8, count: 5
// id: 9, count: 4 
// id: 10, count: 2 
// id: 11, count: 6 
// id: 12, count: 2 
  

// Which candidates have applied to the most jobs? List the top 5 candidates with the highest number of applications.
db.applications.aggregate([
    {
      $group: {
        _id: "$candidate_id" , 
        count: { $sum: 1 }    
      }
    },
    {
      $sort: { count: -1 }    
    },
    {
      $limit: 5               
    }
  ])
// Result :
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e49'), count: 3 
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e44'), count: 2 
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e43'), count: 2 
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e48'), count: 2 
// id: ObjectId('5f9d8e2e1c4f6c35b3c40e46'), count: 2  

