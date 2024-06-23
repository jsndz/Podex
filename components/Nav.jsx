"use client";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";

const Nav = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const setProvider = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setProvider();
  }, []);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image src="/podex.png" width={50} height={50} alt="Podex Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Podex
          </span>
        </Link>
        <div className="sm:flex hidden">
          {session?.user ? (
            <div className="flex gap-3 md:gap-5">
              <Link href="/profile">
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  alt="user_image"
                ></Image>
              </Link>
              <Link href="/create-prompt" className="black_btn">
                Create Post
              </Link>
              <button
                type="button"
                onClick={() => signOut()}
                className="outline_btn"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="outline_btn"
                  >
                    Sign In
                  </button>
                ))}
            </div>
          )}
        </div>
        <div className="sm:hidden flex relative">
          {session?.user ? (
            <button onClick={toggleMenu} className="p-2 focus:outline-none">
              {isMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          ) : (
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type="button"
                    key={provider.name}
                    onClick={() => signIn(provider.id)}
                    className="outline_btn"
                  >
                    Sign In
                  </button>
                ))}
            </div>
          )}
          {isMenuOpen && (
            <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
              <div className="flex flex-col gap-2 p-2">
                <Link
                  href="/profile"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-800 dark:text-white hover:bg-gray-200 py-2 px-4 rounded-md"
                >
                  Profile
                </Link>
                <Link
                  href="/create-prompt"
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                  className="text-gray-800 dark:text-white hover:bg-gray-200 py-2 px-4 rounded-md"
                >
                  Create Prompt
                </Link>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    signOut();
                  }}
                  className="black_btn"
                >
                  signout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
