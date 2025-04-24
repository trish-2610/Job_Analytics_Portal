// How many candidates are there from each location?
db.candidates.aggregate([
    { $group: { _id: "$location", total_candidates : { $sum: 1 } } },
    { $sort: { total_candidates : -1 } }
])
  
// What is the average number of skills candidates have?
db.candidates.aggregate([
    { $project : { number_of_skills: { $size: "$skills" } } },
    { $group : { _id: null, average_number_of_skills: { $avg: "$number_of_skills" } } }
  ])
  
// List the candidate with the highest number of skills (Top 1 only).
db.candidates.aggregate([
    { $project: { _id:0 , name: 1, skills_count : { $size: "$skills" } } },
    { $sort: { skills_count : -1 } },
    { $limit : 1  }
])
  
// What is the average experience of candidates (in years)?
db.candidates.aggregate([
    { $group:{_id : null ,
      average_experience:{$avg:"$experience"}}}
])

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
  
// What are the top 5 most common individual skills among all candidates?
db.candidates.aggregate([
    { $unwind : "$skills" },
    { $group : { _id : "$skills", count : { $sum: 1 } } },
    { $sort : { count : -1 } },
    { $limit : 5 }
  ])
  
// Which location has candidates with the highest average experience?
db.candidates.aggregate([
    { $group: { _id: "$location", avg_experience: { $avg: "$experience" } } },
    { $sort: { avg_experience: -1 } }
  ])
  
// Find the distribution of candidates by number of certifications (if applicable)?
db.candidates.aggregate([
    {$project:{number_of_certifications : {$size : "$certifications"} }},
    {$group:{_id:"$number_of_certifications",count:{$sum:1}}},
    {$sort:{_id:1}}
])

// How many candidates have zero/No skills?
db.candidates.aggregate([
    {$match: {skills:{$size:0}} },
    {$count: "$candidates_with_zero_or_NO_skills" }
])

// How many candidates have both skills and certifications?
db.candidates.aggregate([
    {$match:{$expr:{$and:[{$gt:[{$size:"$skills"},1]},{$gt:[{$size:"$certifications"},1]}]}}},
    {$count:"number_of_candidates_having_both_skills_and_certifications"}
])

