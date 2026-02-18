'use client'
import { useRouter } from 'next/navigation';
import css from './Modals.module.css'
type Props = {
  children: React.ReactNode;
};

const Modals = ({ children }: Props) => {
  const router = useRouter();
  
  const close = () => router.back();

  return (
    <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
>
  <div className={css.modal}>
    {children}
    <button className={css.backBtn} onClick={close}>Close</button>
  </div>
</div>
  );
};

export default Modals;