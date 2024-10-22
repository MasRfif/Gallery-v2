import Navbar from '@/Compenents/Navbar';
export default function Home() {
  return (
    <>
      <Navbar />
      <div className="justify-center bg-gradient-to-b from-[#9e8556] to-transparent w-full h-fit">
        <div
          className="w-full bg-center bg-cover h-[38rem]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1587480335344-95513e5cf3b7?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
          }}
        >
          <div className="flex items-center justify-center w-full h-full bg-[#312715]/60">
            <div className="text-center">
              <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                Find an <span className="text-[#6b4d14]">ART</span> that make
                your wall Happy
              </h1>
              <button className="w-fit px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-black rounded-md lg:w-auto hover:bg-[#2e2719] focus:outline-none focus:bg-[#2e2719]">
                start searching
              </button>
            </div>
          </div>
        </div>
        <section className="p-10">
          <div className="bg-black w-full h-full text-white p-10">Text</div>
        </section>
        <section className="p-10">
          <h1 className="text-3xl font-bold">Latest Painting</h1>

          <div className="flex max-xs:flex-col gap-4 h-96 p-10 ">
            <div className="flex bg-black w-full h-full justify-center items-center ">
              <div className="text-white">Image</div>
            </div>
            <div className="bg-black w-full h-full text-white p-10">Text</div>
          </div>
        </section>
        <section className="p-10">
          <h1 className="text-3xl font-bold">Best Seller</h1>
          <div className="flex gap-4 h-96 p-10 ">
            <div className="bg-black w-full h-full text-white p-10">Text</div>
            <div className="flex bg-black w-full h-full justify-center items-center ">
              <div className="text-white">Image</div>
            </div>
          </div>
        </section>
        <section className="p-10">
          <h1 className="flex w-full justify-center text-3xl font-bold">
            {' '}
            View More Category{' '}
          </h1>
          <div className="grid grid-cols-5 grid-rows-6 gap-4 p-10 h-[40rem] w-full">
            <div className="bg-black  row-span-6">
              {' '}
              <div className="flex justify-center items-center text-white h-full">
                Image
              </div>
            </div>
            <div className="bg-black col-span-2 row-span-3">
              <div className="flex justify-center items-center text-white h-full">
                Image
              </div>
            </div>
            <div className="bg-black col-span-2 row-span-3 col-start-2 row-start-4">
              <div className="flex justify-center items-center text-white h-full">
                Image
              </div>
            </div>
            <div className="bg-black row-span-6 col-span-2 col-start-4 row-start-1">
              <div className="flex text-white h-full p-10">Text</div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
