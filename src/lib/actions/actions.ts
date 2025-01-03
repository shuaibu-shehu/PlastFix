"use server"

import { db } from '@/lib/prisma'

export async function addItem(data: any, email:string) {
    try {
        console.log("email", email);
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
                    userId: existintgUser?.id
                }
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
            email: email
        }
    });
}

export async function getPlasticItems(date) {
    try {
        const items = await db.plasticItem.findMany({
            where: {
                createdAt: {
                    gte: date
                }
            }
        });
        return items;
    } catch (error) {
        console.error('Error fetching plastic items:', error);
        throw error;
    }
}