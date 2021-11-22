import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import { getMe } from "../actions/auth";
import { redirectLoggedOut } from "../utils/utils";

export default function Home() {
  (async () => {
    try {
      await redirectLoggedOut();
      await getMe();
      router.push("/dashboard");
    } catch (error) {}
  })();

  return (
    <div>
      <Head>
        <title>Home | OrderIt</title>
        <meta name="description" content="OrderIt Food Ordering Service" />
        <link rel="icon" href="/images/logo.png" />
      </Head>
      <div className="h-screen w-screen flex flex-col items-center justify-center">
        <Image alt="" src="/images/logo.svg" height={72} width={63} />
        <div>Order It</div>
        <div className="lds-ellipsis">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
