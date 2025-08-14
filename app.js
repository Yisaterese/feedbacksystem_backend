const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

let reviews = [];

app.get('/feedback', async (req, res) => {
  try {
    res.json({ success: true, data: reviews });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error occurred while fetching feedback' });
  }
});

app.post('/feedback', (req, res) => {
  const { name: name, rating: rating, comment: comment } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Username must be a non-empty string' });
  }
  if (!comment || typeof comment !== 'string' || comment.trim().length === 0) {
    return res.status(400).json({ success: false, message: 'Review text must be a non-empty string' });
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return res.status(400).json({ success: false, message: 'Score must be an integer between 1 and 5' });
  }

  const newReview = {
    id: reviews.length + 1,
    name: name.trim(),
    rating: rating,
    comment: comment.trim(),
    timestamp: new Date().toISOString(),
  };

  reviews.push(newReview);
  res.status(201).json({ success: true, data: newReview });
});

app.get('/feedback/analytics', (req, res) => {
  try {
    if (reviews.length === 0) {
      return res.json({
        success: true,
        data: { averageRating: 0.0, ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } },
      });
    }

    const ratingSum = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = Math.round((ratingSum / reviews.length) * 10) / 10;
    const ratingDistribution = reviews.reduce(
        (counts, review) => {
          counts[review.rating]++;
          return counts;
        },
        { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );

    res.json({ success: true, data: { averageRating, ratingDistribution } });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error occurred while calculating analytics' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});