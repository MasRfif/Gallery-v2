import NavBar from '@/Compenents/Navbar';

export default function product() {
  return (
    <>
      <NavBar />
      <section className="flex justify-center h-full w-full">
        <div className="p-10 h-screen w-[80rem] gap-10">
          <section className="w-full p-10">
            <div className="flex flex-row w-full h-fit">
              <div className=" flex flex-col items-center justify-start w-full max-w-sm ">
                <div
                  className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-l-lg max-sm:rounded-xl shadow-md"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1578926078640-668b1fb75403?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  }}
                ></div>

                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white ">
                    Fields in Westerham {''} <br />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      by Helen Allingham
                    </span>
                  </h3>

                  <div className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200 pr-5">
                      $129
                    </span>
                    <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>{' '}
              <div className="bg-white rounded-r-lg h-fit w-fit max-md:hidden">
                <div className="w-full h-64 p-5">
                  <h2 className="text-4xl sm:text-3xl font-bold mb-4">
                    Fields in Westerham
                  </h2>
                  <p className="text-gray-700 mb-8  h-40">
                    The Nike Revolt is a stylish and comfortable sneaker perfect
                    for everyday wear. Featuring a durable construction and a
                    breathable upper, this shoe is sure to keep your feet
                    feeling fresh all day long.
                  </p>
                  <div className="flex items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 hidden min-md:block">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="w-full p-10">
            <div className="flex flex-row w-full h-fit">
              <div className=" flex flex-col items-center justify-start w-full max-w-sm ">
                <div
                  className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-l-lg max-sm:rounded-xl shadow-md"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1578926078640-668b1fb75403?q=80&w=1966&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                  }}
                ></div>

                <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
                  <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white ">
                    Fields in Westerham {''} <br />
                    <span className="text-xs text-gray-600 dark:text-gray-400">
                      by Helen Allingham
                    </span>
                  </h3>

                  <div className="flex items-center justify-center px-3 py-2 bg-gray-200 dark:bg-gray-700">
                    <span className="font-bold text-gray-800 dark:text-gray-200 pr-5">
                      $129
                    </span>
                    <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>{' '}
              <div className="bg-white rounded-r-lg h-fit w-fit max-md:hidden">
                <div className="w-full h-64 p-5">
                  <h2 className="text-4xl sm:text-3xl font-bold mb-4">
                    Fields in Westerham
                  </h2>
                  <p className="text-gray-700 mb-8  h-40">
                    The Nike Revolt is a stylish and comfortable sneaker perfect
                    for everyday wear. Featuring a durable construction and a
                    breathable upper, this shoe is sure to keep your feet
                    feeling fresh all day long.
                  </p>
                  <div className="flex items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4 hidden min-md:block">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}
