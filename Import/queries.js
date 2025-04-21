C:\Users\sahan>mongoimport "E:\MongoDB Project\data\jobs_data.json" -d Job_Analytics_Portal -c jobs --jsonArray --drop
2025-04-21T22:02:39.888+0530    connected to: mongodb://localhost/
2025-04-21T22:02:39.890+0530    dropping: Job_Analytics_Portal.jobs
2025-04-21T22:02:39.914+0530    50 document(s) imported successfully. 0 document(s) failed to import.

C:\Users\sahan>mongoimport "E:\MongoDB Project\data\candidates_data.json" -d Job_Analytics_Portal -c candidates --jsonArray --drop
2025-04-21T22:10:25.494+0530    connected to: mongodb://localhost/
2025-04-21T22:10:25.495+0530    dropping: Job_Analytics_Portal.candidates
2025-04-21T22:10:25.508+0530    50 document(s) imported successfully. 0 document(s) failed to import.

C:\Users\sahan>mongoimport "E:\MongoDB Project\data\applications_data.json" -d Job_Analytics_Portal -c applications --jsonArray --drop
2025-04-21T22:23:17.875+0530    connected to: mongodb://localhost/
2025-04-21T22:23:17.876+0530    dropping: Job_Analytics_Portal.applications
2025-04-21T22:23:17.888+0530    50 document(s) imported successfully. 0 document(s) failed to import.

C:\Users\sahan>mongoimport "E:\MongoDB Project\data\companies_data.json" -d Job_Analytics_Portal -c companies --jsonArray --drop
2025-04-21T22:31:51.269+0530    connected to: mongodb://localhost/
2025-04-21T22:31:51.270+0530    dropping: Job_Analytics_Portal.companies
2025-04-21T22:31:51.281+0530    50 document(s) imported successfully. 0 document(s) failed to import.