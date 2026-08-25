import { Code2, Copy, Eye, PanelRightClose, PanelRightOpen } from 'lucide-react'
import React, { useState } from 'react'
import {useSelector} from 'react-redux'
import {easeInOut, motion} from 'motion/react'

function Artifact() {
  const [tab,setTab] = useState("code")
  const [collapsed,setCollapsed] = useState(false)
  const {artifacts} = useSelector(state=>state.message)

  if(artifacts.length==0) return;

  return (
    <motion.div 
    initial={{width:350}}
    animate={{width:collapsed?48:350}}
    transition={{
      duration:0.25,
      ease:easeInOut
    }}

    className='hidden lg:flex h-full border border-white/6 flex-col overflow-hidden shrink-0 w-62.5'>

      {!collapsed ?  <div className='flex flex-col h-full bg-[#0d0f14]'>
      <div className='h-14 px-4 border-b border-white/6 flex items-center gap-3 shrink-0'>
        <button 
        onClick={()=>setCollapsed(true)}
        className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0'>
          <PanelRightClose size={20}/>
        </button>
        <div className='flex items-center gap-2 flex-1 min-w-0'>
            <div className='flex items-center justify-center w-6 h-6 rounded-md bg-blue-500/10 border border-blue-500/20 shrink-0'>
              <Code2 className='text-blue-400' size={16}/>
            </div>
            <div className='text-[13px] font-medium text-slate-200 truncate'>
              {artifacts?.[0]?.title}
            </div>
        </div>

        <div className='flex items-center gap-1 shrink-0'>
            <button className='flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-slate-400 hover:text-slate-200 hover:bg-white/5 rounded-lg transition-colors duration-150 bg-transparent border-none cursor-pointer'> 
              <Copy size={15}/>
            </button>
        </div>

        <div className='flex items-center gap-1 bg-white/4 border border-white/6 p-1 rounded-lg'>
          <button
          onClick={()=>setTab("code")}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors duration-150 ${tab === "code" ? "bg-blue-500 text-white":"text-slate-500 hover:text-slate-200"}`}>
              <Code2 size={11}/> code
          </button>
          <button
          onClick={()=>setTab("preview")}
          className={`flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-md transition-colors duration-150 ${tab === "preview" ? "bg-blue-500 text-white":"text-slate-500 hover:text-slate-200"}`}>
            <Eye size={11}/> preview
          </button>
        </div>
      </div>

        <div className='h-auto flex border-b border-white/6 overflow-x-auto scrollbar-none [&::-webkit-scrollbar]:hidden shrink-0'>
          {
            artifacts[0]?.files?.map((f,i)=>(
              <button className='px-4 py-2.5 text-[11px] font-medium whitespace-nowrap transition-colors duration-150 border-r border-white/5 relative cursor-pointer bg-transparent text-blue-400'>
                {f?.name}
              </button>
            ))
          }
        </div>

    </div>
    :
    <div className='hidden lg:flex border border-white/6 flex-col h-full items-center py-4 gap-3 shrink-0 bg-[#0d0f14]'>

      <button 
        onClick={()=>setCollapsed(false)}
        className='flex items-center justify-center w-7 h-7 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-white/5 transition-colors duration-150 bg-transparent border-none cursor-pointer shrink-0'>
          <PanelRightOpen size={20}/>
        </button>
        <div className='flex items-center gap-2 flex-1 min-w-0'>
            <div className='text-[10px] font-medium text-slate-600 tracking-widest uppercase whitespace-nowrap'
            style={{writingMode:"vertical-lr"}}>
              {artifacts?.[0]?.title}
            </div>
            </div>
      
    </div>}
   
    </motion.div>
  )
}

export default Artifact
