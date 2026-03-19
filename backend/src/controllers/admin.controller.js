import bcrypt from 'bcrypt';
import prisma from '../prisma.js';
import { validateEmail, validatePassword, validateName, validateAddress } from '../utils/validation.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await prisma.user.count();
    const totalStores = await prisma.store.count();
    const totalRatings = await prisma.rating.count();

    res.status(200).json({ totalUsers, totalStores, totalRatings });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, email, password, address, role } = req.body;

    if (!name || !validateName(name)) return res.status(400).json({ message: 'Invalid name.' });
    if (!email || !validateEmail(email)) return res.status(400).json({ message: 'Invalid email.' });
    if (!password || !validatePassword(password)) return res.status(400).json({ message: 'Invalid password.' });
    if (!address || !validateAddress(address)) return res.status(400).json({ message: 'Invalid address.' });
    
    const validRoles = ['SYSTEM_ADMINISTRATOR', 'NORMAL_USER', 'STORE_OWNER'];
    if (role && !validRoles.includes(role)) {
      return res.status(400).json({ message: 'Invalid role.' });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) return res.status(400).json({ message: 'Email already exists.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'NORMAL_USER';

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword, address, role: userRole },
      select: { id: true, name: true, email: true, role: true }
    });

    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const createStore = async (req, res) => {
  try {
    const { name, email, address, ownerId } = req.body;
    
    if (!name || name.length > 100) return res.status(400).json({ message: 'Valid store name required.' });
    if (!email || !validateEmail(email)) return res.status(400).json({ message: 'Valid store email required.' });
    if (!address || !validateAddress(address)) return res.status(400).json({ message: 'Valid address required.' });
    if (!ownerId) return res.status(400).json({ message: 'Owner ID is required.' });

    const owner = await prisma.user.findUnique({ where: { id: parseInt(ownerId) } });
    if (!owner) return res.status(404).json({ message: 'Owner not found.' });

    if (owner.role !== 'STORE_OWNER') {
       // if we want to enforce that a store can only be attached to a STORE_OWNER
       await prisma.user.update({
         where: { id: parseInt(ownerId) },
         data: { role: 'STORE_OWNER' }
       });
    }

    const existingStoreEmail = await prisma.store.findUnique({ where: { email } });
    if (existingStoreEmail) return res.status(400).json({ message: 'Store email already exists.' });

    const newStore = await prisma.store.create({
      data: { name, email, address, ownerId: parseInt(ownerId) }
    });

    res.status(201).json({ message: 'Store created successfully.', store: newStore });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getUsersList = async (req, res) => {
  try {
    const { search, role, sortBy = 'name', sortOrder = 'asc' } = req.query;

    let where = {};
    if (search) {
      where = {
        ...where,
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
          { address: { contains: search, mode: 'insensitive' } }
        ]
      }
    }
    if (role) {
      where = { ...where, role };
    }

    const users = await prisma.user.findMany({
      where,
      orderBy: { [sortBy]: sortOrder },
      select: {
        id: true, name: true, email: true, address: true, role: true,
        ownedStores: { select: { id: true, name: true, ratings: true } }
      }
    });

    // Formatting if Store Owner to show rating
    const formattedUsers = users.map(user => {
      let storeRatingInfo = null;
      if (user.role === 'STORE_OWNER' && user.ownedStores.length > 0) {
        // Calculate average rating of their stores
        const store = user.ownedStores[0]; // assuming 1 store per owner
        const ratings = store.ratings;
        let averageRating = 0;
        if (ratings.length > 0) {
          averageRating = ratings.reduce((acc, curr) => acc + curr.rating, 0) / ratings.length;
        }
        storeRatingInfo = {
          storeName: store.name,
          averageRating
        };
      }
      return {
        id: user.id, name: user.name, email: user.email, address: user.address, role: user.role, storeRatingInfo
      };
    });

    res.status(200).json(formattedUsers);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getStoresList = async (req, res) => {
  try {
      const { search, sortBy = 'name', sortOrder = 'asc' } = req.query;
  
      const where = search ? {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
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
  
      const formatted = stores.map(store => {
        let averageRating = 0;
        if (store.ratings.length > 0) {
          averageRating = store.ratings.reduce((acc, curr) => acc + curr.rating, 0) / store.ratings.length;
        }
        return {
          id: store.id, name: store.name, email: store.email, address: store.address, averageRating
        }
      });
      res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
