import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const [width, setWidth] = useState( '400' );
  const [height, setHeight] = useState( '100' );
  const [bgColor, setBgColor] = useState( '#7c04ec' );
  const [fgColor, setFgColor] = useState( '#ffffff' );
  const [imageFormat, setImageFormat] = useState( 'png' );
  const [text, setText] = useState( '' );
  const [fontsize, setFontsize] = useState( '' );
  const [imageUrl, setImageUrl] = useState( '' );
  const [isLoading, setIsLoading] = useState( false );
  const [sharedUrl, setSharedUrl] = useState( '' );
  const [isInitialLoading, setIsInitialLoading] = useState( true );
  const validFormats = ['jpeg', 'png', 'webp', 'tiff'];


  const handleGenerateImage = async ( e ) => {
    setIsLoading( true );
    e.preventDefault();
    try {
      await generateImageLink();
      toast.success( 'URL Generated!' );
    } catch ( error ) {
      console.error( 'Error generating image:', error );
      toast.error( "Something went wrong, try again later" );
    } finally {
      setTimeout( () => {
        setIsLoading( false );
      }, 500 );
    }
  };

  const generateImageLink = async () => {
    const baseUrl = window.location?.origin?.includes( "http://localhost" ) ? "http://localhost:4000" : window.location?.origin;
    const apiURL = `${baseUrl}/${width?.trim()}x${height?.trim()}/${bgColor?.slice( 1 )}/${fgColor?.slice( 1 )}/${imageFormat}?text=${encodeURIComponent( text?.trim() )}&fontsize=${encodeURIComponent( fontsize?.trim() )}`

    try {
      const response = await axios.get( apiURL,
        { responseType: 'blob' } // Important: Set responseType to 'blob'
      );
      // Convert the response to a URL
      const url = URL.createObjectURL( response.data );
      setTimeout( () => {
        setImageUrl( url );
        setSharedUrl( apiURL );
      }, 500 );
      return response;
    } catch ( error ) {
      return error;
    }
  }
  const handleCopyLink = () => {
    if ( imageUrl ) {
      navigator.clipboard.writeText( sharedUrl );
      toast.success( 'URL Copied!' );

    }
  };

  const initialLoading = async () => {
    await generateImageLink();
    setTimeout( () => {
      setIsInitialLoading( false );
    }, 200 );
  }

  useEffect( () => {
    initialLoading();
  }, [] );

  return ( <>
    <Toaster
      position="top-right"
      reverseOrder={false}
    />
    {
      isInitialLoading ?
        <div class="relative flex justify-center items-center bg-purple-950 bg-opacity-25 h-[100svh]">
          <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500 "></div>
          <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" class="rounded-full h-28 w-28" />
        </div>
        :
        <div>
          <div className=" bg-white dark:bg-gray-900 min-h-screen flex flex-col items-center justify-center p-6">
            <h1 className="text-4xl font-bold text-purple-500">Dummy Image Generator</h1>
            <div className=" px-6  rounded-lg shadow-lg w-full max-w-2xl ">
              <div className='w-100 mb-7'>
                {imageUrl && (
                  <div className="mt-3">
                    <img src={imageUrl} alt="Generated" className="border border-gray-300 block mx-auto " />
                  </div>
                )}
                <div className="max-w-md mx-auto">
                  <div className="flex mt-5">
                    <input type="text" defaultValue={sharedUrl} id="website-admin" className="rounded-none rounded-s-md rounded-e-0 bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="URL" />
                    <button onClick={handleCopyLink} title='Copy' className="inline-flex items-center px-3 text-sm text-white bg-purple-500 border border-e-md border-gray-300 rounded-e-md  dark:border-gray-600">
                      Copy
                    </button>
                  </div>
                </div>
              </div>

              <form className="max-w-md mx-auto" onSubmit={handleGenerateImage}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="number" value={width} onChange={e => setWidth( e.target.value )} name="width" id="width" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white tex dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                    <label htmlFor="width" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Width</label>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <input type="number" value={height} onChange={e => setHeight( e.target.value )} name="height" id="height" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " required />
                    <label htmlFor="height" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Height</label>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="hs-color-input" className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Background color</label>
                    <input type="color" value={bgColor} onChange={e => setBgColor( e.target.value )} className="p-1 h-10 w-20 block bg-white border border-purple-500 cursor-pointer rounded-sm disabled:opacity-50 disabled:pointer-events-none" id="hs-color-input" title="Choose your color"></input>
                  </div>
                  <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="hs-color-input" className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Text color</label>
                    <input type="color" value={fgColor} onChange={e => setFgColor( e.target.value )} className="p-1 h-10 w-20 block bg-white border border-purple-500 cursor-pointer rounded-sm disabled:opacity-50 disabled:pointer-events-none" id="hs-color-input" title="Choose your color"></input>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="relative z-0 w-full mb-5 group">
                    <label htmlFor="format" className="block text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">Image Format:</label>
                    <select
                      id="format"
                      value={imageFormat}
                      onChange={( e ) => setImageFormat( e.target.value )}
                      className="mt-1 p-2 border border-purple-500 bg-white dark:bg-gray-900 dark:text-gray-400 text-gray-500 dark:text-rounded-md w-full"
                    >
                      {
                        validFormats && validFormats.map( ( format, index ) => {
                          return <option className='' key={index} value={format}>{format}</option>
                        } )
                      }
                    </select>
                  </div>

                  <div className='flex items-end'>
                    <div className="relative z-0 w-full mb-5 group">
                      <input type="number" value={fontsize} onChange={e => setFontsize( e.target.value )} name="fontsize" id="fontsize" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " />
                      <label htmlFor="fontsize" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Font Size:</label>
                    </div>
                  </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                  <input type="text" value={text} onChange={e => setText( e.target.value )} name="text" id="text" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-purple-500 focus:outline-none focus:ring-0 focus:border-purple-600 peer" placeholder=" " />
                  <label htmlFor="text" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-purple-600 peer-focus:dark:text-purple-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Text</label>
                </div>

                <button type="submit" disabled={isLoading} className="text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                  {
                    isLoading
                      ? <span className="ml-2">
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                          <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                        Loading...
                      </span>
                      : <span className="ml-2">Generate</span>
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
    }
  </>
  );
};

export default App;
