import Head from 'next/head'
import {Button} from "@/components/ui/button"
import {Badge} from "@/components/ui/badge"

interface FeatureCardProps {
  title: string
  description: string
  comingSoon?: boolean
}

function FeatureCard({title, description, comingSoon = false}: FeatureCardProps) {
  return (
    <div className="bg-white text-foreground p-6 rounded-lg shadow flex-1 relative">
      {comingSoon && (
        <Badge className="absolute top-4 right-4 bg-yellow-500 text-white">
          Coming Soon
        </Badge>
      )}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p>{description}</p>
    </div>
  )
}

export default function Component() {
  const pageTitle = "Munchies - Simplify Your Grocery Shopping"
  const pageDescription = "Plan meals effortlessly and generate smart shopping lists with Munchies. Save time, reduce waste, and eat better."

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />
        <meta name="twitter:image" content="/twitter-image.jpg" />
        <link rel="canonical" href="https://munchies.bernardmuller.co.za" />
      </Head>
      <div className="bg-background text-foreground">
        <header className="w-full bg-transparent absolute top-0 text-white py-4 z-40">
          <div className="mx-auto px-4 max-w-6xl flex justify-between items-center">
            <h1 className="text-3xl font-bold text-white">Munchies</h1>
            <div className="flex items-center space-x-4">
              <nav>
                <ul className="flex space-x-4">
                  <li>
                    <a
                      href="#features"
                      className="hover:text-primary/50"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://github.com/bernardmuller/munchies"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-primary"
                    >
                      Github
                    </a>
                  </li>
                </ul>
              </nav>
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                <a href="/sign-in">Sign in</a>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex flex-col items-center">
          <section className="w-full relative">
            <div className="bg-secondary absolute top-0 left-0 right-0 h-2/3 z-0 overflow-hidden">
              <div
                className="h-[30rem] w-[30rem] rounded-full bg-primary opacity-20 blur-[6rem] absolute left-[-14rem] top-[-14rem]"/>
              <div
                className="h-[50rem] w-[50rem] rounded-full bg-primary opacity-30 blur-[20rem] absolute left-[20%] bottom-[-30rem]"/>
              <div
                className="h-[30rem] w-[30rem] rounded-full bg-[#FFB572]/30 blur-[10rem] absolute left-[60%] top-[-18rem]"/>
            </div>
            <div className="container mx-auto px-4 max-w-6xl relative z-10 pt-48">
              <div className="flex flex-col items-center gap-12">
                <div className="text-center text-white w-2/3">
                  <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                    Simplify Your Grocery Shopping
                  </h2>
                  <p className="text-xl mb-6 text-gray-400">
                    {process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true" ? "Manage shopping lists effortlessly and soon generate smart shopping lists with Munchies. Save time, reduce waste, and eat better—new features coming soon!"
                      : "Generate smart shopping lists based on your meal plans. Save time, reduce waste, and eat better with Munchies."}
                  </p>
                  <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href="/sign-in">Get Started</a>
                  </Button>
                </div>
                <div
                  className="w-full bg-background rounded-lg shadow-xl overflow-hidden mt-20 border-[1px] border-white">
                  <div className="aspect-[16/9] flex items-center justify-center relative">
                    <div
                      className="z-20 flex flex-col bg-[#141925]/10 items-center justify-center absolute top-0 left-0 right-0 bottom-0 h-full">
                      <Button
                        className="bg-primary text-primary-foreground hover:bg-primary/90 absolute w-64 h-14 text-lg shadow-xl">
                        <a href="/sign-up">
                          Get Started
                        </a>
                      </Button>
                    </div>
                    <img
                      src="/hero.png"
                      alt="Hero image"
                      className="w-full object-cover top-0 opacity-90"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="features" className="py-32 w-full">
            <div className="container mx-auto px-4 max-w-6xl">
              <h2 className="text-3xl font-bold mb-10 text-center">
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <FeatureCard
                  title="Create Shopping Lists"
                  description="Build custom shopping lists based on your needs with just a few taps."
                  comingSoon={false}
                />
                <FeatureCard
                  title="Share with Your Household"
                  description="Easily share your lists with your family and friends."
                  comingSoon={false}
                />
                <FeatureCard
                  title="Waste Reduction"
                  description="Buy only what you need, reducing food waste and saving money."
                  comingSoon={false}
                />
                <FeatureCard
                  title="Meal Planning"
                  description="Plan your meals for the week with our intuitive interface."
                  comingSoon={process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true"}
                />
                <FeatureCard
                  title="Smart Lists"
                  description="Automatically generate grocery lists based on your meal plans."
                  comingSoon={process.env.NEXT_PUBLIC_FLAG_FEATURE_MEALPLANS !== "true"}
                />

              </div>
            </div>
          </section>

          <section className="py-20 w-full">
            <div className="container mx-auto px-4 max-w-6xl text-center">
              <h2 className="text-3xl font-bold mb-4">
                Ready to simplify your grocery shopping?
              </h2>
              <p className="text-xl mb-8">
                Join Munchies today and start planning smarter
                meals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full sm:w-auto">
                  <a href="/sign-up">
                    Sign up
                  </a>
                </Button>
              </div>
            </div>
          </section>
        </main>


        <footer className="bg-secondary text-white py-10 w-full">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <p>&copy; 2024 Munchies. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  )
}