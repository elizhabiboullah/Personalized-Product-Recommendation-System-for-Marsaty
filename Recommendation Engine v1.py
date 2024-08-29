import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

class RecommendationEngine:
    def __init__(self):
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = self.client['attar_database']
        self.products = self.db.products
        self.user_behaviors = self.db.user_behaviors

    def get_product_data(self):
        return pd.DataFrame(list(self.products.find()))

    def get_user_behavior(self, user_id):
        return pd.DataFrame(list(self.user_behaviors.find({'user_id': user_id})))

    def content_based_recommendations(self, product_id, top_n=5):
        df = self.get_product_data()
        tfidf = TfidfVectorizer(stop_words='english')
        tfidf_matrix = tfidf.fit_transform(df['description'])
        cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)
        idx = df.index[df['product_id'] == product_id].tolist()[0]
        sim_scores = list(enumerate(cosine_sim[idx]))
        sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
        sim_scores = sim_scores[1:top_n+1]
        product_indices = [i[0] for i in sim_scores]
        return df['product_id'].iloc[product_indices].tolist()

    def collaborative_filtering(self, user_id, top_n=5):
        # Implement collaborative filtering algorithm here
        # This is a placeholder and needs to be expanded
        pass

    def hybrid_recommendations(self, user_id, product_id, top_n=5):
        content_based = self.content_based_recommendations(product_id, top_n)
        collaborative = self.collaborative_filtering(user_id, top_n)
        # Combine and weight recommendations
        # This is a simple combination and can be improved
        hybrid = list(set(content_based + collaborative))[:top_n]
        return hybrid

# Usage
engine = RecommendationEngine()
recommendations = engine.hybrid_recommendations('user123', 'product456', top_n=5)
print(recommendations)