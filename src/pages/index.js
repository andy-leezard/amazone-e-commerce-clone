import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import ProductFeed from "../components/ProductFeed";
import Prod from "../products/products.json";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazone</title>
      </Head>

      {/* Header */}
      <Header/>
      <main className="max-w-screen-2xl mx-auto">
        {/**Banner */}
        <Banner/>
        {/**Product Feed */}
        {/*<ProductFeed products={products}/>*/}
        <ProductFeed products={Prod}/>
      </main>
      <Footer/>
    </div>
  );
}