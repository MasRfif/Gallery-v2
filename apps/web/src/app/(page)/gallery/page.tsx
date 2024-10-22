import NavBar from '@/Compenents/Navbar';
import Image from 'next/image';
// Example image data (with width and height representing aspect ratios)
const images = [
  {
    id: 1,
    url: '/path-to-image1.jpg',
    name: 'Image One',
    width: 300,
    height: 200,
  },
  {
    id: 2,
    url: '/path-to-image2.jpg',
    name: 'Image Two',
    width: 400,
    height: 300,
  },
  {
    id: 3,
    url: '/path-to-image3.jpg',
    name: 'Image Three',
    width: 250,
    height: 400,
  },
  {
    id: 4,
    url: '/path-to-image4.jpg',
    name: 'Image Four',
    width: 600,
    height: 300,
  },
  {
    id: 5,
    url: '/path-to-image5.jpg',
    name: 'Image Five',
    width: 300,
    height: 200,
  },
  {
    id: 6,
    url: '/path-to-image6.jpg',
    name: 'Image Six',
    width: 350,
    height: 350,
  },
  {
    id: 7,
    url: '/path-to-image7.jpg',
    name: 'Image Seven',
    width: 200,
    height: 300,
  },
];

export default function Gallery() {
  return (
    <>
      <NavBar />
      <section className="flex justify-center h-full w-full">
        <div className="p-10 bg-white w-[80rem]">
          <h1 className="text-3xl font-bold mb-8 text-center">Gallery</h1>
          {/* Masonry Grid Layout */}
          <div className="grid grid-cols-3 grid-auto-flow-dense gap-0">
            {images.map((image) => (
              <div
                key={image.id}
                className="bg-black relative group w-full"
                style={{
                  gridRowEnd: `span ${Math.ceil(image.height / 100)}`,
                  aspectRatio: `${image.width} / ${image.height}`,
                }}
              >
                <Image
                  src={image.url}
                  alt={image.name}
                  className="w-full h-full object-cover"
                  width={image.width}
                  height={image.height}
                />
                {/* Hover effect to display painting name */}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-white text-lg">{image.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
