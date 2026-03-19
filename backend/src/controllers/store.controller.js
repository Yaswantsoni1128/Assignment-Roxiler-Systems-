import prisma from '../prisma.js';

export const getStores = async (req, res) => {
  try {
    const { search, sortBy = 'name', sortOrder = 'asc' } = req.query;

    const where = search ? {
      OR: [
        { name: { contains: search, mode: 'insensitive' } },
        { address: { contains: search, mode: 'insensitive' } }
      ]
    } : {};

    const stores = await prisma.store.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      include: {
        ratings: true,
      }
    });

    const storesWithStats = stores.map(store => {
      const totalRatings = store.ratings.length;
      let averageRating = 0;
      let userRating = null;

      if (totalRatings > 0) {
        averageRating = store.ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings;
      }
      
      if (req.user) {
        const userRatingObj = store.ratings.find(r => r.userId === req.user.id);
        if (userRatingObj) {
          userRating = userRatingObj.rating;
        }
      }

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating,
        userRating,
        totalRatings
      };
    });

    res.status(200).json(storesWithStats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getStoreDashboard = async (req, res) => {
  try {
    const ownerId = req.user.id;
    
    const store = await prisma.store.findFirst({
      where: { ownerId },
      include: {
        ratings: {
          include: {
            user: { select: { id: true, name: true, email: true } }
          }
        }
      }
    });

    if (!store) {
      return res.status(404).json({ message: 'Store not found for this owner.' });
    }

    const totalRatings = store.ratings.length;
    let averageRating = 0;
    if (totalRatings > 0) {
      averageRating = store.ratings.reduce((acc, curr) => acc + curr.rating, 0) / totalRatings;
    }

    const ratingsWithUsers = store.ratings.map(r => ({
      userId: r.user.id,
      userName: r.user.name,
      userEmail: r.user.email,
      rating: r.rating,
      createdAt: r.createdAt
    }));

    res.status(200).json({
      storeId: store.id,
      averageRating,
      totalRatings,
      ratings: ratingsWithUsers
    });

  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
