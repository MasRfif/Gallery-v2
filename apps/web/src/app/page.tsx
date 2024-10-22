import Link from 'next/link';

export default function LandingPage() {
  return (
    <>
      <div
        className="w-full bg-center bg-cover h-screen"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1684194359587-3b5ca2d2e1ec?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
      >
        <div className="flex items-center justify-center w-full h-screen bg-gray-900/70">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white lg:text-4xl">
              Find your perfect <span className="text-blue-400">ART</span> for
              your Home
            </h1>
            <button className="w-fit px-5 py-2 mt-4 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
              <Link href="/home">Get Started</Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
