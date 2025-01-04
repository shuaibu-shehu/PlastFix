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

export async function addItem(data: any, email: string) {
  try {
    console.log('email', email);
    const existintgUser = await getUserByEmail(email);
    console.log('Existing user:', existintgUser);

    console.log('Data:', data[0]);
    for (let i = 0; i < data.length; i++) {
      await db.plasticItem.create({
        data: {
          name: data[i].name,
          weight: Number(data[i].weight),
          quantity: Number(data[i].quantity),
          type: data[0].type,
          userId: existintgUser?.id,
        },
      });
    }

    // return result;
  } catch (error) {
    console.error('Error creating plastic item:', error);
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

interface GetPlasticItemsParams {
  dateString?: string;
  email: string;
}

export async function getPlasticItems({
  dateString,
  email,
}: GetPlasticItemsParams) {
  try {
    const user = await getUserByEmail(email);

    // const date = new Date(dateString);
    // const formattedDate = date.toISOString().split('T')[0]; // "2025-01-03"
    // console.log(formattedDate);

    let items: any[] = [];
    console.log('date', dateString, 'user id', user?.id);
    if (dateString) {
      items = await db.plasticItem.findMany({
        where: {
          createdAt: {
            gte: dateString,
          },
          userId: user?.id,
        },
      });
    } else {
      items = await db.plasticItem.findMany({
        where: {
          userId: user?.id,
        },
      });
    }
    return items;
  } catch (error) {
    console.error('Error fetching plastic items:', error);
    throw error;
  }
}

// export async function getAllPlasticItems(date: any, userId: string) {
//     try {
//         const items = await db.plasticItem.findMany({
//             where: {
//                 createdAt: {
//                     gte: date
//                 },
//                 userId: userId
//             }
//         });
//         return items;
//     } catch (error) {
//         console.error('Error fetching plastic items:', error);
//         throw error;
//     }
// }
