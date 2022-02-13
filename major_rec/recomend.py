import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity




class Recomendation():
    COURSE_CATEGORIES = ["social science", "humanities","mathematics","physics", 
                     "chemistry", "environmental science", 
                     "biology", "engineering","computer science"]
    vector_template = [0 for i in COURSE_CATEGORIES]
    
    def __init__(self, input):
        df = pd.read_excel("majors.xlsx",usecols = lambda col_name: ("vector" in col_name.lower()))
    

    @classmethod
    def string_to_vec(cls, str):
        element_list = str.lower().split(",")
        vector = cls.vector_template.copy()
        for element in element_list:
            element_index_in_vector = cls.COURSE_CATEGORIES.index(element.strip().lower())
            vector[element_index_in_vector] = 1
        return vector

    

