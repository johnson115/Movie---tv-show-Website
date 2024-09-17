import React from 'react'
import { Dialog } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import { CirclePlay, Clapperboard, Film, Tv } from 'lucide-react'

export default function Modal({isOpen , setIsOpen}) {
  const Navigate = useNavigate();

  return (
    <>
      <button
        type="button"
        id='trailer'
        onClick={() => setIsOpen(true)}
        className="rounded-md  flex  bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        
        Let's Start 
        <CirclePlay className='ml-2' />
      </button>


      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="relative  shodow-lg w-full z-200"
      >
        <div className="fixed inset-0 bg-black/70" aria-hidden="true" />

        <div className="fixed inset-0 flex w-full px-14 shadow-lg items-center justify-center p-4">
          <Dialog.Panel className="w-full bg-red-700 max-w-sm rounded ">
            <div className="flex flex-col items-center p-6 space-y-6"> 
              <Clapperboard className="h-24 w-24 text-yellow-500" />
              <Dialog.Title className="text-lg font-medium leading-6 text-gray-100">
              Welcome to the ultimate entertainment browser! Whether you're in the mood for thrilling movies or captivating TV shows, we've got you covered. Choose your adventure below and start exploring a world of entertainment
              </Dialog.Title>
            </div>

            <div className="flex justify-center space-x-4 p-6">
              <button
                type="button"
                id='trailer'
                className="inline-flex text-white justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                onClick={()=> Navigate("/browseMovies") }
              >
                Browse Movies
                <Film  />
              </button>
              <button
                type="button"
                id='trailer'
                className="inline-flex text-white justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={()=> Navigate("/browseTvShows") }
              >
                Browse Tv Shows
                <Tv  />
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}