import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'sonner'

interface NewNoteCartProps {
  onNoteCreated: (content: string) => void
}

let  speechRecognition: SpeechRecognition | null = null

export function NewNoteCard(props: NewNoteCartProps) {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(true)
  const [content, setContent] = useState('')
  const [isRecording, setIsRecording] = useState(false)

  function handleStartEditor() {
    setShouldShowOnboarding(!shouldShowOnboarding)
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value)

    if (event.target.value == '') {
      setShouldShowOnboarding(true)
    }

  }

  function handleSaveNote(event: FormEvent) {
    event.preventDefault()

    if(content.trim() === ''){
      return
    }

    props.onNoteCreated(content);

    setContent('')
    setShouldShowOnboarding(!shouldShowOnboarding)

    toast.success('Nota criado com sucesso')
  }

  function handleStartRecording() {
    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if(!isSpeechRecognitionAPIAvailable){
      alert('Infelizmente seu navegador não suporta a API de gravação')
      return
    }

    setIsRecording(!isRecording)
    setShouldShowOnboarding(!shouldShowOnboarding)

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition;

    speechRecognition = new SpeechRecognitionAPI()

    speechRecognition.lang = 'pt-BR'
    speechRecognition.continuous = true // não para de gravar até que seja dado o STOP pelo o usuário
    speechRecognition.maxAlternatives = 1 // recupera somente uma das palavras alternativas
    speechRecognition.interimResults = true // vai carregando texto conforme vai sendo falado

    speechRecognition.onresult = (e) => {
      
      const transcription = Array.from(e.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')
      
      setContent(transcription)
    }
    
    speechRecognition.onerror = (e) => {
      console.error(e)
    }

    speechRecognition.start()
  }

  function handleStopRecording() {
    setIsRecording(!isRecording)

    speechRecognition?.stop
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
            w-full
            inset-0
            md-inset-auto
            md:left-1/2
            md:top-1/2
            md:-translate-x-1/2
            md:-translate-y-1/2
            md:max-w-[640px]
            md:h-[60vh]
            md:rounded-md
            flex
            flex-col
            outline-none
            overflow-hidden
            bg-slate-700'
          >
            <Dialog.Close className='absolute right-0 top-0 p-1.5 bg-slate-800 text-slate-400 hover:text-slate-100'>
              <X className='size-5' />
            </Dialog.Close>
            <form className='flex flex-1 flex-col'>
              <div className='flex flex-1 flex-col gap-3 p-5'>
                <span className="text-sm font-medium text-slate-200">Adicionar Nota</span>
                {shouldShowOnboarding ? (
                  <p className="text-sm leading-6 text-slate-300">
                    Comece
                    &nbsp;<button type='button' onClick={handleStartRecording} className='text-lime-400 font-medium hover:text-lime-500 hover:underline'>gravando uma nota</button>
                    &nbsp;em áudio ou se preferir
                    &nbsp;<button type='button' onClick={handleStartEditor} className='text-lime-400 font-medium hover:text-lime-500 hover:underline'>utilize apenas texto</button>
                  </p>
                ) : <textarea
                  autoFocus
                  className='text-sm leading-6 resize-none flex-1 outline-none text-slate-400 bg-transparent'
                  onChange={handleContentChanged}
                  value={content}
                />}
              </div>

              {isRecording ? (
                <button
                  type='button'
                  onClick={handleStopRecording}
                  className='w-full 
                  flex
                  items-center
                  justify-center
                  gap-2
                  py-4 
                  text-center 
                  text-sm 
                  outline-none 
                  font-bold  
                  bg-slate-900 
                  text-slate-300
                  hover:text-slate-100
                  '
                >
                  <div className='size-3 bg-red-500 rounded-full animate-pulse' />
                  Gravando! (clique p/ interromper)
                </button>
              ) : (
                <button
                  type='button'
                  onClick={handleSaveNote}
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
              )}

            </form>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  )
}