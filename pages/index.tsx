import { GetServerSidePropsContext } from "next"
import { Button } from "components/Button/Button"
import { LP_GRID_ITEMS } from "../lp-items"
import { useRef } from "react";
import Head from "next/head";
import Header from "../components/NavBar/Header";
import Carousel from "components/Containers/Carousel";
import SortingVisualizer from "components/Visuals/SortingVisualizer";
import LeetCodeCard from "components/Cards/LeetCode";


export default function Web() {

  const sortFunctionRef = useRef<() => void>();
  
  const triggerSort = () => {
    if (sortFunctionRef.current) {
      sortFunctionRef.current();
    }
  };
  return (
    <>
      <Head>
        <meta property="og:url" content="https://next-enterprise.vercel.app/" />
        <meta
          property="og:image"
          content="https://raw.githubusercontent.com/Blazity/next-enterprise/main/project-logo.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <title>Next.js, Docker, GitHub Actions Showcase </title>
      </Head>
      <Header />
      <div id="animation-container">
        <SortingVisualizer numBars={50}  />
      </div>
      <div>
        <LeetCodeCard/>
      </div>
      <section className="bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
          <div className="mx-auto place-self-center">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Kode&#275;
            </h1>
            <h2 style={{fontSize:"230%" ,marginTop: '10%',}}>Move at the speed of code.</h2>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              The multi-instance chatGPT coding platform
            </p>
            <div style={{fontSize:"230%" ,marginTop: '20px',}}>
            <Button className="mr-3" onClick={triggerSort} href={""} style={{width: '150px'}}>
              Login
            </Button>
            <Button style={{width: '150px'}} 
              href="https://vercel.com/new/git/external?repository-url=https://github.com/Blazity/next-enterprise"
              intent="secondary"
            >
              Sign-up
            </Button>
            </div>
          </div>
        </div>
        <MainCarousel/>
      </section>
      <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto grid max-w-screen-xl px-4 py-8 text-center lg:py-16">
        <div className="mx-auto place-self-center">
          <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
            Learn More
          </h1>
        </div>
      </div>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:py-16 lg:px-6">
          <div className="justify-center space-y-8 md:grid md:grid-cols-2 md:gap-12 md:space-y-0 lg:grid-cols-3">
            {LP_GRID_ITEMS.map((singleItem) => (
              <div key={singleItem.title} className="flex flex-col items-center justify-center text-center">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 p-1.5 text-blue-700 dark:bg-primary-900 lg:h-12 lg:w-12">
                  {singleItem.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold dark:text-white">{singleItem.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{singleItem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export const MainCarousel = () =>{
  const carouselItems = [
    {
      title: 'Plan Your Project',
      description: 'Helps you map application requirments from the ground up',
      imageUrl: 'path-to-image-1.jpg',
    },
    {
      title: 'Design each piece',
      description: 'Create components or classes to import your application',
      imageUrl: 'path-to-image-1.jpg',
    },
    {
      title: 'Assemble your application',
      description: 'This is the card content.',
      imageUrl: 'path-to-image-1.jpg',
    },
    {
      title: 'Card Title 4',
      description: 'This is the card content.',
      imageUrl: 'path-to-image-1.jpg',
    },
    {
      title: 'Card Title 5',
      description: 'This is the card content.',
      imageUrl: 'path-to-image-1.jpg',
    },
    {
      title: 'Card Title 6',
      description: 'This is the card content.',
      imageUrl: 'path-to-image-1.jpg',
    },
  ];

  return (
    <div className="App">
      <Carousel items={carouselItems} />
    </div>
  );
}

export async function getServerSideProps({ req, res }: GetServerSidePropsContext) {
  if (req.headers?.host?.includes("next-enterprise.vercel.app")) {
    return {
      redirect: {
        destination: "https://blazity.com/open-source/nextjs-enterprise-boilerplate",
        permanent: true,
      },
    }
  }

  return {
    props: {},
  }
}
