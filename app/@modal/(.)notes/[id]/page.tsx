import Modals from '../../../../components/Modals/Modals'
import css from './NotePreview.module.css'
import { fetchNoteById } from "@/lib/api";
type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return (
    <Modals> <div className={css.container}>
      <div className={css.item}>
        <div className={css.header}>
          <h2>{note?.title}</h2>
        </div>
        <p className={css.tag}>{note?.tag}</p>
        <p className={css.content}>{note?.content}</p>
        <p className={css.date}>{note?.createdAt}</p>
      </div>
    </div>
    </Modals>
  );
};

export default NotePreview;