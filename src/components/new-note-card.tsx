import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

export function NewNoteCard() {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')

  function handleStartEditor() {
    setShouldShowOnboarding(false)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value == '') {
      setShouldShowOnboarding(true)
    }

  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()
    console.log(content);

    toast.success('Nota criado com sucesso')
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger
        className="flex
        flex-col
        rounded-md 
        text-left 
        gap-3
        overflow-hidden
        relative
        outline-none
        hover:ring-2
        focus-visible:ring-2
        p-5
        bg-slate-800 
        hover:ring-slate-600
        focus-visible:ring-lime-400"
      >
        <span className="text-sm font-medium text-slate-200">Adicionar nota</span>
        <p className="text-sm leading-6 text-slate-400">
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/40'>
          <Dialog.Content
            className='fixed
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            max-w-[640px]
            w-full
            h-[60vh]
            rounded-md
            flex
            flex-col
            outline-none
            overflow-hidden
            bg-slate-700'
          >
            <Dialog.Close className='absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
              <X className='size-5' />
            </Dialog.Close>
            <form onSubmit={handleSaveNote} className='flex flex-1 flex-col'>
              <div className='flex flex-1 flex-col gap-3 p-5'>
                <span className="text-sm font-medium text-slate-200">Adicionar Nota</span>
                {shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-slate-300">
                    Comece
                    <button type='button' className='text-lime-400 font-medium hover:text-lime-500 hover:underline'>gravando uma nota</button>
                    em áudio ou se preferir
                    <button type='button' onClick={handleStartEditor} className='text-lime-400 font-medium hover:text-lime-500 hover:underline'>utilize apenas texto</button>
                  </p>
                ) : <textarea
                  autoFocus
                  className='text-sm leading-6 resize-none flex-1 outline-none text-slate-400 bg-transparent'
                  onChange={handleContentChanged}
                />}
              </div>

              <button
                type='submit'
                className='w-full 
                  py-4 
                  text-center 
                  text-sm 
                  outline-none 
                  font-bold  
                  bg-lime-400 
                  text-lime-950
                  hover:bg-lime-500
                  '
              >
                Salvar nota
              </button>
            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}