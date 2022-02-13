# COURSPACE.TECH
A web app that helps high schoolers prepare for their academic world ahead.

## The User Interface
With our intuitive UI, students can create and evaluate their educational roadmap by adding courses to their high school timeline, calculating their GPA, and viewing their progress on NC's graduation requirements

## The COURSPACE Recommendation Engine
From planning to prediction.

### The Data - manual vector encoding
 - We utilized NC State's Course Catalog to record 11 required courses for each of the ten chosen majors
 - These courses were then represented as vectors based on their subject (ex: Humanities, physics, engineering)

### The Input - from an intuitive user interface
- Students can input the courses they have taken throughout highschool **along with a rating of how much they enjoyed the course**
    - The rating acts as weight when trying to assess the similarity between any two highschool and college course vectors
- These courses are classified as vectors in the same way as the college major data

### The Algorithm - weighted cosine similarity evaluation
- For each major in our minimal dataset, the weighted cosine similarity between each input highschool course vector and each college course vector in any given major is computed. The cosine similarity measure is essentially a measure of the angle between any two vectors:

![](major_rec/cos_sim_demo.png)

- The sum of the pairwise cosine similariy scores between each major and the inputted highschool courses are normalized by the maximum similarity score, and the three majors that produce the greatest cosine similarity score are recommended to the students

Check out **major_rec_engine/major_rec_engine.ipynb** to see a walkthrough of the engine.
