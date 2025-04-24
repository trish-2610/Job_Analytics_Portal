Job_Analytics_Portal> db.candidates.createIndex({email:1},{unique:true})
// Output : email_1
Job_Analytics_Portal> db.candidates.createIndex({location:1})
// Output : location_1
Job_Analytics_Portal> db.candidates.createIndex({skills:1})
// Output : skills_1