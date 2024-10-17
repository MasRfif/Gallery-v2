'use client';

import React, { useState, FormEvent, ChangeEvent, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Home() {
  const [file, setFile] = useState<File | undefined>();
  const [caption, setCaption] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(); // For image preview in dropzone
  const [submittedPreview, setSubmittedPreview] = useState<{
    url: string;
    caption: string;
    description: string;
    price: number;
  } | null>(null); // For submitted painting card
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Update preview as soon as the user selects a file
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile)); // Set preview URL immediately
    }
  };

  // Handle form submission
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);
    formData.append('caption', caption);
    formData.append('description', description);
    formData.append('price', price.toString());

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

      if (data.response.ok) {
        // Update preview with submitted values for the painting card
        setSubmittedPreview({
          url: previewUrl!,
          caption,
          description,
          price,
        });

        // Clear form fields after submission
        setCaption('');
        setDescription('');
        setPrice(0);

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
          progress: undefined,
          theme: 'colored',
        });
      } else {
        throw new Error('Unexpected response from server');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="h-full w-screen flex justify-center items-center">
      <div className="p-48 ">
        {submittedPreview && (
          <div className="border shadow-lg rounded-lg p-4 w-[30rem] mb-5">
            <img
              src={submittedPreview.url}
              alt="Painting preview"
              className="w-full h-64 object-cover rounded-md"
            />
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
              {/* If there's a preview URL, display the image; otherwise, show the SVG */}
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Selected"
                  className="w-full h-64 object-cover rounded-md"
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
                onChange={handleFileChange} // Use the new handler
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
