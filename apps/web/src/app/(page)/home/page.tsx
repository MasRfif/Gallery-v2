// import Navbar from '@/Compenents/Navbar';
// export default function Home() {
//   return (
//     <>
//       <Navbar />
//       <div className="justify-center bg-gradient-to-b from-[#9e8556] to-transparent w-full h-fit">
//         <div
//           className="w-full bg-center bg-cover h-[38rem]"
//           style={{
//             backgroundImage: `url('https://images.unsplash.com/photo-1587480335344-95513e5cf3b7?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
//           }}
//         >
//           <div className="flex items-center justify-center w-full h-full bg-[#312715]/60">
//             <div className="text-center">
//               <h1 className="text-3xl font-semibold text-white lg:text-4xl">
//                 Find an <span className="text-[#6b4d14]">ART</span> that make
//                 your wall Happy
//               </h1>
//               <button className="w-fit px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-black rounded-md lg:w-auto hover:bg-[#2e2719] focus:outline-none focus:bg-[#2e2719]">
//                 start searching
//               </button>
//             </div>
//           </div>
//         </div>
//         <section className="p-10">
//           <div className="bg-black w-full h-full text-white p-10">Text</div>
//         </section>
//         <section className="p-10">
//           <h1 className="text-3xl font-bold">Latest Painting</h1>

//           <div className="flex max-xs:flex-col gap-4 h-96 p-10 ">
//             <div className="flex bg-black w-full h-full justify-center items-center ">
//               <div className="text-white">Image</div>
//             </div>
//             <div className="bg-black w-full h-full text-white p-10">Text</div>
//           </div>
//         </section>
//         <section className="p-10">
//           <h1 className="text-3xl font-bold">Best Seller</h1>
//           <div className="flex gap-4 h-96 p-10 ">
//             <div className="bg-black w-full h-full text-white p-10">Text</div>
//             <div className="flex bg-black w-full h-full justify-center items-center ">
//               <div className="text-white">Image</div>
//             </div>
//           </div>
//         </section>
//         <section className="p-10">
//           <h1 className="flex w-full justify-center text-3xl font-bold">
//             {' '}
//             View More Category{' '}
//           </h1>
//           <div className="grid grid-cols-5 grid-rows-6 gap-4 p-10 h-[40rem] w-full">
//             <div className="bg-black  row-span-6">
//               {' '}
//               <div className="flex justify-center items-center text-white h-full">
//                 Image
//               </div>
//             </div>
//             <div className="bg-black col-span-2 row-span-3">
//               <div className="flex justify-center items-center text-white h-full">
//                 Image
//               </div>
//             </div>
//             <div className="bg-black col-span-2 row-span-3 col-start-2 row-start-4">
//               <div className="flex justify-center items-center text-white h-full">
//                 Image
//               </div>
//             </div>
//             <div className="bg-black row-span-6 col-span-2 col-start-4 row-start-1">
//               <div className="flex text-white h-full p-10">Text</div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </>
//   );
// }

'use client';

import React, { useState, FormEvent, ChangeEvent, useRef } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [file, setFile] = useState<File | undefined>();
  const [title, setTitle] = useState<string>(''); // Added title
  const [caption, setCaption] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [yearCreated, setYearCreated] = useState<string>(''); // Added yearCreated
  const [creator, setCreator] = useState<string>(''); // Added creator
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string>(''); // Added featuredImageUrl
  const [imageDimensions, setImageDimensions] = useState<{
    height: number;
    width: number;
  } | null>(null); // Added imageDimensions
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [submittedPreview, setSubmittedPreview] = useState<{
    url: string;
    title: string; // Updated to include title
    caption: string;
    description: string;
    price: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', title); // Include title
    formData.append('caption', caption);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('yearCreated', yearCreated); // Include yearCreated
    formData.append('creator', creator); // Include creator
    formData.append('featuredImageUrl', featuredImageUrl); // Include featuredImageUrl
    formData.append('imageDimensions', JSON.stringify(imageDimensions)); // Include imageDimensions

    setIsLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/post`,
        {
          method: 'POST',
          body: formData,
        },
      );

      const data = await response.json();

      if (!data.response || !data.response.ok) {
        console.error('Unexpected response:', data);
        throw new Error('Unexpected response from server');
      }

      setSubmittedPreview({
        url: previewUrl!,
        title,
        caption,
        description,
        price,
      });

      setTitle('');
      setCaption('');
      setDescription('');
      setPrice(0);
      setYearCreated('');
      setCreator('');
      setFeaturedImageUrl('');
      setImageDimensions(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      toast('📸 Image uploaded!', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
    } catch (error) {
      console.error('Error during submission:', error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="h-full w-screen flex justify-center items-center">
      <div className="p-48 ">
        {submittedPreview && (
          <div className="border bg-white shadow-lg rounded-lg p-4 w-[30rem] mb-5">
            <Image
              src={submittedPreview.url}
              alt="Painting preview"
              className="w-full h-64 object-cover rounded-md"
              width={500}
              height={500}
            />
            <h2 className="text -xl font-bold mt-4">
              {submittedPreview.title}
            </h2>
            <h2 className="text-xl font-bold mt-4">
              {submittedPreview.caption}
            </h2>
            <p className="text-sm text-gray-500">
              {submittedPreview.description}
            </p>
            <p className="text-lg text-green-600 font-semibold mt-2">
              ${submittedPreview.price}
            </p>
          </div>
        )}
      </div>
      <div className="p-96  w-screen">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col bg-black p-5 w-96 gap-2 mb-8 rounded-xl"
        >
          <ToastContainer
            position="top-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
          <input
            type="text"
            placeholder="Title"
            className="border rounded-xl py-2 px-2"
            value={title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setTitle(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Caption"
            className="border rounded-xl py-2 px-2"
            value={caption}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCaption(e.target.value)
            }
          />
          <textarea
            placeholder="Description"
            className="border rounded-xl py-2 px-2"
            value={description}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setDescription(e.target.value)
            }
          />
          <input
            type="number"
            placeholder="Price"
            className="border rounded-xl py-2 px-2"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrice(parseFloat(e.target.value))
            }
          />
          <input
            type="text"
            placeholder="Year Created"
            className="border rounded-xl py-2 px-2"
            value={yearCreated}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setYearCreated(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Creator"
            className="border rounded-xl py-2 px-2"
            value={creator}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCreator(e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Featured Image URL"
            className="border rounded-xl py-2 px-2"
            value={featuredImageUrl}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setFeaturedImageUrl(e.target.value)
            }
          />
          <div>
            <label
              htmlFor="file"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              File
            </label>

            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center w-full max-w-lg p-5 mx-auto mt-2 text-center bg-white border-2 border-gray-300 border-dashed cursor-pointer dark:bg-gray-900 dark:border-gray-700 rounded-xl"
            >
              {previewUrl ? (
                <Image
                  src={previewUrl}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-md"
                  width={500}
                  height={500}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-8 h-8 text-gray-500 dark:text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                  />
                </svg>
              )}

              <h2 className="mt-1 font-medium tracking-wide text-gray-700 dark:text-gray-200">
                {previewUrl ? 'Change Image' : 'Image File'}
              </h2>

              <p className="mt-2 text-xs tracking-wide text-gray-500 dark:text-gray-400">
                Upload your file PNG, JPG
              </p>

              <input
                id="dropzone-file"
                type="file"
                accept="image/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`${
              isLoading ? 'bg-slate-300 ' : 'bg-slate-500 '
            } mt-5 text-white py-2 rounded-xl`}
          >
            {isLoading ? 'Loading..' : 'Submit'}
          </button>
        </form>
      </div>
    </main>
  );
}
