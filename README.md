# Personalized Product Recommendation System for Marsaty

## Purpose

- Personalized product recommendations for users
- Integration of multiple recommendation algorithms (Content-Based Filtering, Collaborative Filtering, Hybrid Approaches)
- Enhancing the user experience by providing tailored product suggestions
- Real-time data processing and recommendations
- Expanding knowledge in machine learning and recommendation systems
- Implementing and deploying a scalable recommendation engine in a mobile app environment

## Definitions & Usage

- **Content-Based Filtering:** A recommendation method that suggests items similar to those a user has liked in the past, based on the item's content (e.g., product descriptions, categories).

- **Collaborative Filtering:** A technique that recommends items by finding users with similar behavior or preferences and suggesting items those users liked. This can be user-based or item-based.

- **Hybrid Approach:** A combination of multiple recommendation methods (e.g., content-based and collaborative filtering) to improve the accuracy and relevance of recommendations.

- **Recommendation Engine:** A system that processes user data and item information to generate personalized recommendations, often using machine learning algorithms.

## Folder Structure

The `/server` and `/frontend` folders have been organized as follows:

### Backend (`/server`):

- **api/**: Contains the API routes and controllers for handling requests related to recommendations, user activities, and product management.
- **models/**: Defines the data models for users, products, and interactions stored in MongoDB.
- **utils/**: Includes utility functions for logging, error handling, and other reusable code components.
- **config/**: Configuration files for environment variables, database connections, and other settings.
- **services/**: Business logic related to generating recommendations, integrating machine learning models, and interacting with the database.

### Frontend (`/frontend`):

- **assets/**: Contains images, fonts, and other static assets used in the mobile app.
- **components/**: Reusable React Native components such as buttons, cards, and lists.
- **screens/**: The main screens of the mobile app, including the Home screen, Product Details screen, and Recommended Products screen.
- **navigation/**: Configuration for navigating between different screens in the mobile app.
- **store/**: State management setup, possibly using Redux or Context API.
- **utils/**: Utility functions and constants used across the frontend application.

## Database Structure

The MongoDB database is structured to efficiently store user data, product information, and user interactions, which are crucial for generating accurate recommendations.

### Collections:

- **users**:
  - `_id`: Unique identifier for each user.
  - `displayName`: Name of the user.
  - `email`: Email address of the user.
  - `preferences`: An array storing the user's product preferences (categories, brands, etc.).
  - `history`: A record of user interactions (views, clicks, purchases).

- **products**:
  - `_id`: Unique identifier for each product.
  - `name`: Name of the product.
  - `category`: The category to which the product belongs.
  - `description`: Detailed description of the product.
  - `attributes`: Additional product attributes (e.g., color, size, brand).

- **interactions**:
  - `_id`: Unique identifier for each interaction.
  - `userId`: Reference to the user who performed the interaction.
  - `productId`: Reference to the product that was interacted with.
  - `type`: Type of interaction (view, click, purchase).
  - `timestamp`: When the interaction occurred.
