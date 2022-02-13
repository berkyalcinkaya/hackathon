import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity, euclidean_distances
import numpy as np
from json import dumps



class Recomendation():

    #some static variables for creating course vectors
    COURSE_CATEGORIES = ["social science", "humanities","mathematics","physics", 
                     "chemistry", "environmental science", 
                     "biology", "engineering","computer science"]
    vector_template = [0 for i in COURSE_CATEGORIES]
    

    def __init__(self, json_input):
        # set distance method to be used, not configurable
        self.distance_method = 1  # 0 for euclidean distance, 1 for cosine similarity

        # parse input
        # input contains inputted hs course vectors
        # ratings contains their user-given ratings
        self.input, self.ratings = self.create_input_vector(json_input)
        self.ratings_sum =  sum(self.ratings) # used to normalize sum of distances btwn a college course and the set of all hs courses 

        # load college major data and vectorize
        self.df = pd.read_excel("major_rec/majors.xlsx", usecols = lambda col_name: ("vector" in col_name.lower()))
        self.vector_df = self.df.copy().applymap(Recomendation.string_to_vec)
        self.vector_df.columns = (column.split("_")[0] for column in self.vector_df.columns)
        
        # run the prediction and format output to be sent to front end
        self.get_rec()


    def get_rec(self):
        '''main method that returns response'''
        best_majors = self.get_best_majors()
        best_majors_json_ready =  Recomendation.make_json_ready(best_majors)
        return best_majors_json_ready


    def create_input_vector(self, json_input):
        '''creates a list of course vectors from input'''
        # json input is a list of dicts with high school course attributes
        # the key "course" stores the course subject, which is used to create a course vector
        input_course_vectors = [self.string_to_vec(course["subject"]) 
                                for course in json_input]
        
        #max course rating is a ten, divide by ten to produce weights from 0-1
        input_course_ratings = [int(course["rating"])/10 for course in json_input]

        # setting all weights to 0 will crash the engine
        if sum(input_course_ratings)==0:
            input_course_ratings = [1 for i in input_course_ratings]
        
        return input_course_vectors, input_course_ratings
    


    @classmethod
    def string_to_vec(cls, str):
        '''converts a course category name to one-hot encoded vector for downstream 
        numerical anlysis'''
        element_list = str.lower().split(",")
        vector = cls.vector_template.copy()
        for element in element_list:
            element_index_in_vector = cls.COURSE_CATEGORIES.index(element.strip().lower())
            vector[element_index_in_vector] = 1
        return vector
    
    
    def get_course_distance_to_each_input(self, college_course, method = 1):
        '''calculates the distance between each input (hs) course vector and a 
        single college course. Takes into account the user given ratings by multiplying 
        the course to course distance by rating. At the end, total course distance is
        divided by the sum of the weights'''

        # determine distance metrix
        if method==1:
            func = cosine_similarity
        elif method == 0:
            func = euclidean_distances
        
        # compute total distance
        total_course_distance = 0   
        for idx, hs_course in enumerate(self.input):
            weighted_distance = func([college_course],[hs_course])*self.ratings[idx]
            total_course_distance += weighted_distance
        
        return total_course_distance/self.ratings_sum  # normalize by sum of the ratings
    

    def get_major_distance_from_input(self, major):
        '''compute the total distance between a major in the dataset 
        and the input hs course set '''
        # get college courses for a major
        college_course_vectors = self.vector_df[major].tolist() 
        
        # compute total pairwise distance 
        total_distance = 0
        for college_course_vector in college_course_vectors:
            total_distance+=self.get_course_distance_to_each_input(college_course_vector, method = self.distance_method)

        # average the total pairwise comparisons
        num_of_comparisons = len(self.input) * len(college_course_vectors)
        major_distance = total_distance/num_of_comparisons
        return major_distance
    

    def get_best_majors(self):
        '''
        returns the three highest scoring majors along with thier max normalized scores in 
        tuple format'''
        major_distances = []
        majors = self.vector_df.columns
        for major in majors:
            major_distances.append(self.get_major_distance_from_input(major))

        # euclidean distances computes a low distance for highly similar hs and college course sets
        # while cosine_similarity computes a high value for highly similar courses
        if self.distance_method == 1:
            reverse_bool = True
        else:
            reverse_bool = False

        major_distances = Recomendation.normalize_scores(major_distances) # normalize the scores
        
        # turn the scores and their majors into a sorted list of tuples
        scores = sorted(zip(major_distances, majors), reverse=reverse_bool)
        
        # we care only about the top three scores
        return scores[:3]


    @staticmethod
    def normalize_scores(scores):
        '''normalize by max value in list'''
        norm = [(float(i)/max(scores))*100 for i in scores] # multiply by 100 to format into a percent
        return norm
    
    @staticmethod
    def make_json_ready(lst_of_tuples):
        ''' turns the recomendation output into a format that is ready to be jsonified'''
        # json format to be filled in
        json_temp = [
                    {"Major": None, "Score": None}, 
                    {"Major": None, "Score": None},
                    {"Major": None, "Score": None}
                    ]

        # add appropriate values to the json format
        for idx,tup in enumerate(lst_of_tuples):
            major = str(tup[1])
            score = int(tup[0][0][0])
            json_temp[idx]["Major"]=major
            json_temp[idx]["Score"]=score
        
        return json_temp
        




    

