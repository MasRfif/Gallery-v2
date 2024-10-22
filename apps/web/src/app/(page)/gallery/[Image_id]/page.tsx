import React from 'react';
import Image from 'next/image';

export default function CollectionsSlug() {
  const collection = {
    title: 'Sample Collection Title',
    price: 1000000,
    yearCreated: '2023',
    genre: ['Genre 1', 'Genre 2'],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque placeat tempore veritatis quidem dolores doloribus, ad necessitatibus laboriosam. Esse deleniti reprehenderit soluta dolore distinctio quam nobis ullam in sed debitis!',
    creator: 'Sample Creator',
    featuredImage: {
      fields: {
        file: {
          url: 'https://images.unsplash.com/photo-1578926078640-668b1fb75403?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
          details: {
            image: {
              height: 500,
              width: 500,
            },
          },
        },
      },
    },
  };

  if (collection) {
    const { price, yearCreated, genre, description, creator } = collection;
    const featuredImage = collection.featuredImage;

    return (
      <section className="flex flex-col items-center p-10 pb-5 w-full h-screen">
        <div className=" w-fit h-[30rem] overflow-hidden  rounded-[42px]">
          <Image
            src="https://images.unsplash.com/photo-1578926078640-668b1fb75403?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="A painting"
            height={featuredImage.fields.file.details.image.height}
            width={featuredImage.fields.file.details.image.width}
            className="h-full w-full object-cover object-top"
          />
        </div>
        <div className="mx-auto max-w-[600px]  text-black  dark:text-white">
          <h3 className="mt-2 text-center text-4xl font-extrabold">
            {collection.title}
          </h3>
          <div className="my-8 flex w-full flex-wrap justify-center gap-2">
            <p className="w-max rounded-[42px] bg-teal-400 px-8 py-2 text-black">
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(price)}
            </p>
            <p className="w-max rounded-[42px] bg-red-400 px-8 py-2 text-black">
              {creator}
            </p>
            <p className="w-max rounded-[42px] bg-yellow-400 px-8 py-2 text-black">
              {new Date(yearCreated).getFullYear()} - SM
            </p>
            <ul className="flex flex-wrap justify-center gap-2">
              {genre.map((item) => (
                <li key={item} className="rounded-[42px] bg-pink-400 px-8 py-2">
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-12 px-4">
            <p>{description}</p>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section>
        <h2>No Collection Found!</h2>
      </section>
    );
  }
}
