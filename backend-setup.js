// Install necessary packages:
// npm install express mongoose bcrypt jsonwebtoken dotenv

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

// MongoDB Models
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  preferences: [String],
});

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  vendor: { type: String, required: true },
  features: [String],
});

const interactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  interactionType: { type: String, enum: ['view', 'purchase', 'rate'] },
  rating: { type: Number, min: 1, max: 5 },
  timestamp: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Interaction = mongoose.model('Interaction', interactionSchema);

// Controller Logic
const recommendationController = {
  getRecommendations: async (req, res) => {
    const userId = req.params.userId;
    
    // Implement hybrid recommendation logic here
    const contentBasedRecommendations = await getContentBasedRecommendations(userId);
    const collaborativeFilteringRecommendations = await getCollaborativeFilteringRecommendations(userId);
    
    // Combine and weight recommendations
    const hybridRecommendations = combineRecommendations(contentBasedRecommendations, collaborativeFilteringRecommendations);
    
    res.json(hybridRecommendations);
  },
};

// Helper functions for recommendation algorithms
async function getContentBasedRecommendations(userId) {
  const user = await User.findById(userId);
  const userPreferences = user.preferences;
  
  // Find products that match user preferences
  const recommendations = await Product.find({ features: { $in: userPreferences } })
    .limit(10)
    .lean();
  
  return recommendations;
}

async function getCollaborativeFilteringRecommendations(userId) {
  // Find similar users based on interactions
  const userInteractions = await Interaction.find({ userId });
  const similarUsers = await findSimilarUsers(userId, userInteractions);
  
  // Get products that similar users interacted with
  const recommendations = await Interaction.find({
    userId: { $in: similarUsers },
    productId: { $nin: userInteractions.map(i => i.productId) }
  })
    .populate('productId')
    .limit(10)
    .lean();
  
  return recommendations.map(r => r.productId);
}

function combineRecommendations(contentBased, collaborativeFiltering) {
  // Implement logic to combine and weight recommendations
  // use more sophisticated methods
  const combined = [...contentBased, ...collaborativeFiltering];
  return combined.slice(0, 10); // Return top 10 unique recommendations
}

// Routes
const router = express.Router();
router.get('/recommendations/:userId', recommendationController.getRecommendations);

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
