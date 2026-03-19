import prisma from '../prisma.js';

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body;
    const userId = req.user.id;

    if (!storeId || rating === undefined) {
      return res.status(400).json({ message: 'Store ID and rating are required.' });
    }

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const store = await prisma.store.findUnique({ where: { id: parseInt(storeId) } });
    if (!store) {
      return res.status(404).json({ message: 'Store not found.' });
    }

    const existingRating = await prisma.rating.findUnique({
      where: {
        userId_storeId: {
          userId,
          storeId: parseInt(storeId)
        }
      }
    });

    if (existingRating) {
      const updatedRating = await prisma.rating.update({
        where: { id: existingRating.id },
        data: { rating: parseInt(rating) }
      });
      return res.status(200).json({ message: 'Rating updated successfully.', rating: updatedRating });
    } else {
      const newRating = await prisma.rating.create({
        data: {
          userId,
          storeId: parseInt(storeId),
          rating: parseInt(rating)
        }
      });
      return res.status(201).json({ message: 'Rating submitted successfully.', rating: newRating });
    }

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
