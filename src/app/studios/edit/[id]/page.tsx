import { Suspense } from 'react';
import { headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';
import { getSession } from '@/app/libs/session';
import { getStudioById } from '@/app/libs/api';
import AddStudios from '@/app/(dashboard)/dashboard/_components/AddStudios';
import LoadingState from '@/app/component/shared/LoadingState';
import type { StudioPageProps } from '@/app/types/type';

async function EditStudio({ params }: StudioPageProps) {
     const { id } = await params;
     const session = await getSession(await headers());
     if (!session) redirect(`/login?callbackURL=${encodeURIComponent(`/studios/edit/${id}`)}`);
     const studio = await getStudioById(id);
     if (!studio || studio.ownerEmail !== session.user.email) notFound();
     return <AddStudios key={studio._id} studio={studio} />;
}

export default function EditStudioPage(props: StudioPageProps) {
     return <Suspense fallback={<LoadingState />}><EditStudio {...props} /></Suspense>;
}
