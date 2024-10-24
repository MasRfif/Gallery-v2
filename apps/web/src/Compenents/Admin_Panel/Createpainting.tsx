'use client';
import Image from 'next/image';
import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  useRef,
} from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define a type for Painting
interface Painting {
  id: string;
  title: string;
  yearCreated: string;
  creator: string;
  caption: string;
  description: string;
  price: number;
  imageUrl: string;
}

export default function CreatePainting() {
  const [file, setFile] = useState<File | undefined>();
  const [caption, setCaption] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [title, setTitle] = useState<string>('');
  const [yearCreated, setYearCreated] = useState<string>('');
  const [creator, setCreator] = useState<string>('');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paintings, setPaintings] = useState<Painting[]>([]);
  const [editingPainting, setEditingPainting] = useState<Painting | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchPaintings() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts`,
        );
        const result = await response.json();

        console.log(result);

        if (Array.isArray(result.data)) {
          setPaintings(result.data);
        } else {
          console.error('Expected paintings array not found:', result);
          setPaintings([]);
        }
      } catch (error) {
        console.error('Error fetching paintings:', error);
        setPaintings([]);
      }
    }
    fetchPaintings();
  }, []);

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
    formData.append('caption', caption);
    formData.append('description', description);
    formData.append('price', price.toString());
    formData.append('title', title);
    formData.append('yearCreated', yearCreated);
    formData.append('creator', creator);
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/post`,
        { method: 'POST', body: formData },
      );
      const data = await response.json();
      if (data.response.ok) {
        setCaption('');
        setDescription('');
        setPrice(0);
        setTitle('');
        setYearCreated('');
        setCreator('');
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

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm(
      'Are you sure you want to delete this painting?',
    );
    if (!confirmDelete) return;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts/${id}`,
        { method: 'DELETE' },
      );
      if (response.ok) {
        setPaintings(paintings.filter((painting) => painting.id !== id));
        toast('🖼️ Painting deleted!', {
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
        throw new Error('Failed to delete painting');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (painting: Painting) => {
    setEditingPainting(painting);
    setTitle(painting.title);
    setCaption(painting.caption);
    setDescription(painting.description);
    setPrice(painting.price);
    setYearCreated(painting.yearCreated);
    setCreator(painting.creator);
    setPreviewUrl(painting.imageUrl);
  };

  const handleUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedPainting = {
        id: editingPainting!.id,
        title,
        yearCreated,
        creator,
        caption,
        description,
        price,
        imageUrl: editingPainting!.imageUrl,
      };
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/post/${editingPainting!.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedPainting),
        },
      );
      if (response.ok) {
        setPaintings(
          paintings.map((painting) =>
            painting.id === editingPainting!.id ? updatedPainting : painting,
          ),
        );

        setEditingPainting(null);
      } else {
        toast.error('Failed to update painting');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to update painting');
    }
  };

  return (
    <section className="flex justify-between w-96">
      <div className="flex">
        {/* Painting Input Form Card */}
        <div
          className="bg-slate-600 shadow-lg rounded-lg p-10"
          style={{ width: '500px' }}
        >
          <h1 className="text-3xl font-bold">Create Painting</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
            {/* Input Fields */}
            <div>
              <label
                htmlFor="image"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Image
              </label>
              <input
                type="file"
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Username
              </label>
              <input
                type="text"
                placeholder="Title"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="yearCreated"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Year Created
              </label>
              <input
                type="text"
                placeholder="Year Created"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700"
                value={yearCreated}
                onChange={(e) => setYearCreated(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="creator"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Creator
              </label>
              <input
                type="text"
                placeholder="Creator"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700"
                value={creator}
                onChange={(e) => setCreator(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="caption"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Caption
              </label>
              <input
                type="text"
                placeholder="Caption"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Description
              </label>
              <textarea
                placeholder="Description"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-4 h-32 py-2.5 text-gray-700"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div>
              <label
                htmlFor="price"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Price
              </label>
              <input
                type="number"
                placeholder="Price"
                className="block mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded-md"
            >
              {isLoading ? 'Uploading...' : 'Create Painting'}
            </button>
          </form>
          {/* Additional form for editing painting */}
          {editingPainting && (
            <form onSubmit={handleUpdate} className="flex flex-col gap-2">
              {/* ... (additional input fields for editing) */}
              <button
                type="submit"
                className="bg-green-500 text-white py-2 px-4 rounded-md"
              >
                Update Painting
              </button>
            </form>
          )}
        </div>
        {previewUrl && (
          <div>
            <h2>Image Preview:</h2>
            <Image
              src={previewUrl}
              alt="Image Preview"
              className="w-full h-64 object-cover rounded-md"
              width={200}
              height={200}
            />
          </div>
        )}
        {/* Painting Display Section */}
        <div className="flex-1 ml-4">
          {paintings.map((painting) => (
            <div
              key={painting.id}
              className="border bg-white shadow-lg rounded-lg p-4 mb-4"
            >
              <Image
                src={painting.imageUrl}
                alt={painting.title}
                width={200}
                height={200}
                className="w-full h-64 object-cover rounded-md"
              />
              <h2 className="text-xl font-bold mt-4">{painting.caption}</h2>
              <p className="text-sm text-gray-500">{painting.description}</p>
              <p className="text-lg text-green-600 font-semibold mt-2">
                ${painting.price}
              </p>
              <p className="text-sm text-gray-500">Title: {painting.title}</p>
              <p className="text-sm text-gray-500">
                Year: {painting.yearCreated}
              </p>
              <p className="text-sm text-gray-500">
                Creator: {painting.creator}
              </p>
              <button
                className="bg-yellow-500 text-white py-2 px-4 mt-4 rounded-md"
                onClick={() => handleEdit(painting)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 mt-4 rounded-md"
                onClick={() => handleDelete(painting.id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
