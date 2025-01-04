'use server';

import {db} from '@/lib/prisma';

async function checkDBConnection() {
  try {
    const test = await db.$queryRaw`SELECT 1;`; // Basic query to check DB connection
    console.log('Database connection successful:', test);
  } catch (error) {
    console.error('Database connection error:', error);
  }
}

export async function addItem(data: any[], email: string) {
  checkDBConnection();

  try {
    console.log('email:', email);

    const existingUser = await getUserByEmail(email);
    console.log('Existing user:', existingUser);

    if (!existingUser) {
      throw new Error('User not found');
    }

    console.log('Data:', data);

    const results = [];
    for (let i = 0; i < data.length; i++) {
      try {
        const newItem = await db.plasticItem.create({
          data: {
            name: data[i].name,
            weight: Number(data[i].weight),
            quantity: Number(data[i].quantity),
            type: data[0].type,
            userId: existingUser.id,
          },
        });
        results.push({success: true, item: newItem});
      } catch (itemError) {
        console.error(`Error adding item at index ${i}:`, itemError);
        results.push({success: false, error: itemError.message, item: data[i]});
      }
    }

    return {
      message: 'Items processed',
      results,
    };
  } catch (error) {
    console.error('Error creating plastic items:', error);
    throw error;
  }
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email: email,
    },
  });
}

export async function getPlasticItems(date: string) {
  try {
    const items = await db.plasticItem.findMany({
      where: {
        createdAt: {
          gte: date,
        },
      },
    });
    console.log(items);
    return items;
  } catch (error) {
    console.error('Error fetching plastic items:', error);
    throw error;
  }
}
