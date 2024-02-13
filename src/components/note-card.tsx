export function NoteCard() {
  return (
    <button className="rounded-md text-left bg-slate-800 p-5 space-y-6 overflow-hidden relative outline-none hover:ring-2  hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400 ">
      <span className="text-sm font-medium text-slate-200">há 2 dias</span>
      <p className="text-sm leading-6 text-slate-300">
        O Drizzle possui um plugin do ESLint para evitar que realizemos updates ou deletes sem where...
        <br />
        Para configurar o plugin, é preciso instalar como abaixo:
        <br />
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus, provident ratione voluptate voluptates, iste quas alias quo maxime quos consequuntur hic repellendus deserunt eius quisquam at sit omnis. Harum, voluptate.
      </p>
      <div className="absolute bottom-0 right-0 left-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none"></div>
    </button>
  )
}