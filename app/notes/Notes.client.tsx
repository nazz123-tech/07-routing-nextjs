'use client';
import { useState } from 'react'
import SearchBox from '../../components/SearchBox/SearchBox'
import css from './NotesPage.module.css'
import { fetchNotes } from '../../lib/api'
import Pagination from '../../components/Pagination/Pagination'
import Modal from '../../components/Modal/Modal'
import NoteForm from '../../components/NoteForm/NoteForm'
import NoteList from '../../components/NoteList/NoteList'
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import 'modern-normalize';


function NotesClient(){
  
 const [isModalOpen, setIsModalOpen]=useState<boolean>(false)
 const [search, setSearch]=useState('')
 const [currentPage,setCurrentPage]=useState(1)
 const perPage = 12;
 const [debouncedSearch] = useDebounce(search, 300);
  const query= useQuery({
    queryKey: ['notes',debouncedSearch,currentPage,perPage],
    queryFn: () => fetchNotes(debouncedSearch, currentPage, perPage),
    placeholderData: keepPreviousData
  })
   
 const openModal = () =>{
  setIsModalOpen(true)
 }
 const closeModal = () =>{
  setIsModalOpen(false)
 }
const notes=query.data?.notes ?? []
const totalPages = query.data?.totalPages ?? 0;
  return (
      <div className={css.app}>
	      <header className={css.toolbar}>
		  <SearchBox
      value={search}
      onChange={value=>{
        setSearch(value)
        setCurrentPage(1)
      }}
      />
		  {totalPages>1 && <Pagination 
      pageCount={totalPages} 
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      />}
		  <button onClick={openModal} className={css.button}>Create note +</button>
        </header>
        <NoteList notes={notes}/>
        {isModalOpen && 
        <Modal onClose={closeModal}>
          <NoteForm onClose={closeModal}/>
          </Modal>}
    </div>

  )
}

export default NotesClient