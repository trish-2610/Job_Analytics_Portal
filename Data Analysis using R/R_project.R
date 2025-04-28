#installing packages
install.packages("jsonlite")
install.packages("httr")
install.packages("ggplot2")
install.packages("dplyr")
install.packages("lubridate")

# loading libraries   
library(jsonlite)
library(httr)
library(ggplot2)
library(dplyr)
library(lubridate)

# Loading Json data 
applications_data <- fromJSON("https://raw.githubusercontent.com/trish-2610/Job_Analytics_Portal/main/data/applications_data.json")
candidates_data <- fromJSON("https://raw.githubusercontent.com/trish-2610/Job_Analytics_Portal/main/data/candidates_data.json")
companies_data <- fromJSON("https://raw.githubusercontent.com/trish-2610/Job_Analytics_Portal/main/data/companies_data.json")
jobs_data <- fromJSON("https://raw.githubusercontent.com/trish-2610/Job_Analytics_Portal/main/data/jobs_data.json")


# analysis

# 1. What is the distribution of application statuses?

status_dist <- applications_data %>%
  count(status)

ggplot(status_dist, aes(x = status, y = n, fill = status)) +
  geom_bar(stat = "identity") +
  labs(title = "Distribution of Application Statuses", x = "Status", y = "Number of Applications") +
  theme_minimal()

# 2. Which month saw the highest number of job applications?

monthly_apps <- applications_data %>%
  mutate(month = month(applied_on, label = TRUE)) %>%
  count(month)

ggplot(monthly_apps, aes(x = month, y = n, fill = month)) +
  geom_bar(stat = "identity") +
  labs(title = "Monthly Job Applications", x = "Month", y = "Applications Count") +
  theme_minimal()

# 3.Which Experience levels are most common among candidates?

experience_dist <- candidates_data %>%
  count(experience)

ggplot(experience_dist, aes(x = reorder(experience, n), y = n, fill = experience)) +
  geom_bar(stat = "identity") +
  coord_flip() +
  labs(title = "Experience Levels Among Candidates", x = "Education Level", y = "Count") +
  theme_minimal()

# 4. What are the Top 5 Companies by Average Salary?

avg_salary <- jobs_data %>%
  group_by(company) %>%
  summarise(avg_salary = mean(salary, na.rm = TRUE)) %>%
  top_n(5, avg_salary)

ggplot(avg_salary, aes(x = reorder(company, avg_salary), y = avg_salary, fill = company)) +
  geom_bar(stat = "identity") +
  labs(title = "Top 5 Companies by Average Salary", x = "Company", y = "Average Salary") +
  theme_minimal() +
  coord_flip()

# 5. What are the Top 5 Companies by their Founding Year ?
year_dist <- companies_data %>%
  count(founded) %>%
  top_n(5, n)

ggplot(year_dist, aes(x = as.factor(founded), y = n, fill = as.factor(founded))) +
  geom_bar(stat = "identity") +
  labs(title = "Top 5 Companies by Founding Year", x = "Founding Year", y = "Number of Companies") +
  theme_minimal() +
  coord_flip()

