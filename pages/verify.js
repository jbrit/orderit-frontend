import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { activateAccount } from "../actions/auth";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Verify() {
  const { query } = useRouter();
  const activateMutation = useMutation(() => {
    return activateAccount(query.uid ?? "", query.token ?? "");
  });
  useEffect(() => {
    activateMutation.mutateAsync();
  }, [activateMutation]);
  return (
    <>
      <div className="min-h-screen pt-16 pb-12 flex flex-col bg-white">
        <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/">
              <a className="inline-flex">
                <span className="sr-only">OrderIt</span>
                <Image src="/images/logo.png" alt="OrderIt" height={48} width={42} />
              </a>
            </Link>
          </div>
          <div className="py-16">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                Email Verification Page
              </p>
              {activateMutation.isLoading && (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-24 w-24 border-b-2 border-gray-900"></div>
                </div>
              )}
              {activateMutation.isSuccess && (
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Email Successfully Verified
                </h1>
              )}
              {activateMutation.isError && (
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Email Could not be Verified
                </h1>
              )}
              <div className="mt-6">
                <Link href="/login">
                  <a className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                    Continue to Login<span aria-hidden="true"> &rarr;</span>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </main>
        <footer className="flex-shrink-0 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex justify-center space-x-4">
            <div className="text-sm font-medium text-gray-500">
              OrderIt &copy; 2021
            </div>
            {/* <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Contact Support
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Status
            </a>
            <span
              className="inline-block border-l border-gray-300"
              aria-hidden="true"
            />
            <a
              href="#"
              className="text-sm font-medium text-gray-500 hover:text-gray-600"
            >
              Twitter
            </a> */}
          </nav>
        </footer>
      </div>
    </>
  );
}
