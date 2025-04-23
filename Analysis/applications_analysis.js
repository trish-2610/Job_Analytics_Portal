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
  
