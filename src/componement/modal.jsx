import React, { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Clapperboard } from 'lucide-react'

export default function Modal({isOpen , setIsOpen}) {
  

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
      >
        Let's Start 
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
              Welcome to Movie Browser, your gateway to discovering the best movies and TV shows! Whether you're in the mood for an epic movie adventure or looking to dive into your favorite TV series, we’ve got you covered. Choose your preferred experience below and start browsing
              </Dialog.Title>
            </div>

            <div className="flex justify-center space-x-4 p-6">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-gray-200 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500 focus-visible:ring-offset-2"
                
              >
                Browse Movies
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                
              >
                Browse Tv Shows
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </>
  )
}