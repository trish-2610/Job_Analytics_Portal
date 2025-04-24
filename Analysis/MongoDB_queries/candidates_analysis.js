// How many candidates are there from each location?
db.candidates.aggregate([
    { $group: { _id: "$location", total_candidates : { $sum: 1 } } },
    { $sort: { total_candidates : -1 } }
])
// Result :
// 'Toronto', total_candidates: 6 
// 'London', total_candidates: 5 
// 'San Francisco', total_candidates: 5 
// 'Chicago', total_candidates: 4 
// 'New York', total_candidates: 4 
//  and more 


// What is the average number of skills candidates have?
db.candidates.aggregate([
    { $project : { number_of_skills: { $size: "$skills" } } },
    { $group : { _id: null, average_number_of_skills: { $avg: "$number_of_skills" } } }
  ])
// Result : average number of skills candidates have = 3


// List the candidate with the highest number of skills (Top 1 only).
db.candidates.aggregate([
    { $project: { _id:0 , name: 1, skills_count : { $size: "$skills" } } },
    { $sort: { skills_count : -1 } },
    { $limit : 1  }
])
// Result : candidate with the highest number of skills is = name : 'Alice Williams' and skills count : 3  


// What is the average experience of candidates (in years)?
db.candidates.aggregate([
    { $group:{_id : null ,
      average_experience:{$avg:"$experience"}}}
])
// Result :  average experience of candidates : 3.30 (3 years)


// How many candidates fall into different experience ranges ( 0–2 , 2–5 , >5 )?
db.candidates.aggregate([
    {
      $bucket: {
        groupBy: "$experience",
        boundaries: [0 , 2 , 5],
        default: "Experience > 5 Years",
        output: { count: { $sum: 1 } }
      }
    }
  ])
// Result : 
// Experience ranges = 
// 0-2 , count: 1 
// 2-5 , count: 40 
// 'Experience > 5 Years', count: 8  


// What are the top 5 most common individual skills among all candidates?
db.candidates.aggregate([
    { $unwind : "$skills" },
    { $group : { _id : "$skills", count : { $sum: 1 } } },
    { $sort : { count : -1 } },
    { $limit : 5 }
  ])
// Result :
// Top-5 Most common skills :
// 'JavaScript', count: 12 
// 'MySQL', count: 9
// 'Java', count: 6 
// 'Python', count: 6 
// 'Ruby', count: 6 


// Which location has candidates with the highest average experience?
db.candidates.aggregate([
    { $group: { _id: "$location", avg_experience: { $avg: "$experience" } } },
    { $sort: { avg_experience: -1 } }
  ])
// Result :
// 'Vancouver', avg_experience: 5 
// 'Boston', avg_experience: 4
// 'Seattle', avg_experience: 4 
// 'Chicago', avg_experience: 4 
// 'Toronto', avg_experience: 3.6
// and more 

  
// Find the distribution of candidates by number of certifications (if applicable)?
db.candidates.aggregate([
    {$project:{number_of_certifications : {$size : "$certifications"} }},
    {$group:{_id:"$number_of_certifications",count:{$sum:1}}},
    {$sort:{_id:1}}
])
// Result : 
// Number of certifications = 1 , count: 43  
// Number of certifications = 2 , count: 6 

// How many candidates have zero/No skills?
db.candidates.aggregate([
    {$match: {skills:{$size:0}} },
    {$count: "candidates_with_zero_or_NO_skills" }
])
// Result : 0 (it means all candidates having at least 1 skill) 


// How many candidates have both skills and certifications?
db.candidates.aggregate([
    {$match:{$expr:{$and:[{$gt:[{$size:"$skills"},1]},{$gt:[{$size:"$certifications"},1]}]}}},
    {$count:"number_of_candidates_having_both_skills_and_certifications"}
])
// Result : candidates have both skills and certifications = 6 
