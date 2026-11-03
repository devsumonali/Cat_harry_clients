'use server';

import { headers } from 'next/headers';
import { auth } from '@/app/libs/auth';
import { db } from '@/app/libs/mongodb';

export async function publishStudio(formData: FormData) {
     const session = await auth.api.getSession({ headers: await headers() });
     if (!session) return { error: 'Please log in before adding a studio.', unauthorized: true };

     const fields = ['title', 'category', 'description', 'squareFootage', 'ceilingHeight',
          'maxCapacity', 'powerSupply', 'imageUrl', 'hourlyRate', 'securityDeposit',
          'minimumBookingHours', 'streetAddress', 'city', 'postalCode', 'overtimePolicy', 'houseRules'];
     const studio = {
          ...Object.fromEntries(fields.map((field) => [field, String(formData.get(field) || '').trim()])),
          amenities: formData.getAll('amenities').map(String),
          email: session.user.email,
          ownerId: session.user.id,
          ownerEmail: session.user.email,
          ownerName: session.user.name,
     };
     if (!studio.title || !studio.category) return { error: 'Please enter a title and select a category.' };

     try {
          const result = await db.collection('studios').insertOne({ ...studio, createdAt: new Date().toISOString() });
          if (!result.insertedId) return { error: 'Failed to save the studio. Please try again.' };
          return { success: true };
     } catch {
          return { error: 'Unable to reach the studio server. Please try again.' };
     }
}
