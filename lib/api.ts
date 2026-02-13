import type { Note } from "../types/note";
import axios from "axios";

export interface FetchNotesResponse{
    notes: Note[],
    totalPages:number
}

const NEXT_PUBLIC_NOTE_TOKEN=process.env.NEXT_PUBLIC_NOTEHUB_TOKEN

export const fetchNotes = async (
    search?:string,
    page: number = 1,
    perPage : number = 10
) :Promise<FetchNotesResponse> =>{
    const response = await axios.get<FetchNotesResponse>("https://notehub-public.goit.study/api/notes", 
        {params:{
            ...(search && { search }),
            page,
            perPage
        },
         headers: {
      accept: 'application/json',
      Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
    },
    })
    return response.data;
}
export interface CreateNotePayload {
  title: string;
  content: string;
  tag: string;
}
export const createNote = async (newNote:CreateNotePayload):Promise<Note>=>{
    const {data} = await axios.post<Note>("https://notehub-public.goit.study/api/notes", 
        newNote,
         {headers:{
            Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
         }
        }
    )
    return data
}

export const deleteNote = async (id:string):Promise<Note> =>{
    const {data} = await axios.delete<Note>(`https://notehub-public.goit.study/api/notes/${id}`, 
        {headers:{
            Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
         }
        }
    )
    return data
}



export const fetchNoteById = async (id: string): Promise<Note> => {
const res = await axios.get<Note>(`https://notehub-public.goit.study/api/notes/${id}`,
    {headers:{
            Authorization: `Bearer ${NEXT_PUBLIC_NOTE_TOKEN}`,
         }
        }
);
  return res.data;
};
