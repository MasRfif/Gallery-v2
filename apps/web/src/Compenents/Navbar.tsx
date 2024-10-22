'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function NavBar() {
  const navLinks = [
    { name: 'Home', href: '/home' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Product', href: '/product' },
    { name: 'About', href: '/About' },
  ];

  const [isFixed, setIsFixed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsFixed(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav
        className={`${isFixed ? 'fixed bg-gradient-to-b from-[#9e8556]/40 to-transparent' : 'bg-[#9e8556]'} w-full h-fit z-40 px-3 backdrop-blur-md transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <Link href={'/'}>
            <Image
              src="/logo.svg"
              alt="Logo"
              width={50}
              height={50}
              className="mr-3"
            />
          </Link>

          <div className="flex w-full justify-end max-sm:hidden ">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`${isFixed ? 'bg-[#49350f]/40 text-white' : ''} hover:bg-black/40 hover:text-gray-300 px-5 py-2 mx-7 rounded-md text-md font-medium`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="relative">
            <div
              className="flex justify-end items-center gap-x-6 p-4 cursor-pointer"
              onClick={toggleDropdown}
            >
              <Image
                className="object-cover w-12 h-11 rounded-full ring ring-gray-300 dark:ring-gray-600"
                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=4&w=880&h=880&q=100"
                alt="User "
                width={50}
                height={50}
              />
            </div>

            {isOpen && (
              <div className="fixed right-2 bg-white shadow-lg rounded mt-2  w-48 transition-all duration-300 ease-in-out transform opacity-100 scale-100">
                <div className="lg:hidden sm:hidden">
                  {' '}
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <Link
                  href={'/login'}
                  className="block px-4 py-2  text-gray-800 hover:bg-gray-100 "
                >
                  Login
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
