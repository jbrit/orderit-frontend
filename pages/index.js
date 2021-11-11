import Head from "next/head";
import router from "next/router";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    router.push("/dashboard");
  }, []);
  return (
    <div>
      <Head>
        <title>Home | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      {/* <main>Welcome, more updates rolling in soon!</main> */}
    </div>
  );
}
