import {fetchNotesByTag } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === 'all' ? undefined : slug[0];
  const response = await fetchNotesByTag(category);

  return (
    <div>
      {response?.notes?.length > 0 && <NoteList notes={response.notes} />}
    </div>
  );
};

export default NotesByCategory;