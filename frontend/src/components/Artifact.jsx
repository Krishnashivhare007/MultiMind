import { Code2, PanelRightClose } from 'lucide-react'
import React from 'react'

function Artifact() {
  return (
    <div className='hidden lg:flex h-full border border-white/6 flex-col overflow-hidden shrink-0 w-62.5'>
    <div className='flex flex-col h-full bg-[#0d0f14]'>
      <div className='h-14 px-4 border-b border-white/6 flex items-center gap-3 shrink-0'>
        <button className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0'>
          <PanelRightClose size={20}/>
        </button>
        <div className='flex items-center gap-2 flex-1 min-w-0'>
            <div>
              <Code2/>
            </div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Artifact
