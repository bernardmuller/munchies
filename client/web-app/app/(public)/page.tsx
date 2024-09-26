import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export default function Component() {
  return (
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
                    href="#pricing"
                    className="hover:underline"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/bernardmuller/munchies"
                    target="_blank"
                    className="hover:text-primary"
                  >
                    Github
                  </a>
                </li>
              </ul>
            </nav>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="/login">Sign in</a>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex flex-col items-center">
        <section className="w-full relative">
          <div className="bg-secondary absolute top-0 left-0 right-0 h-2/3 z-0 overflow-hidden">
            <div className="h-[30rem] w-[30rem] rounded-full bg-primary opacity-20 blur-[6rem] absolute left-[-14rem] top-[-14rem]" />
            <div className="h-[50rem] w-[50rem] rounded-full bg-primary opacity-30 blur-[20rem] absolute left-[20%] bottom-[-30rem]" />
            <div className="h-[30rem] w-[30rem] rounded-full bg-[#FFB572]/30 blur-[10rem] absolute left-[60%] top-[-18rem]" />
          </div>
          <div className="container mx-auto px-4 max-w-6xl relative z-10 pt-48">
            <div className="flex flex-col items-center gap-12">
              <div className="text-center text-white w-2/3">
                <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                  Simplify Your Grocery Shopping
                </h2>
                <p className="text-xl mb-6 text-gray-400">
                  Generate smart grocery lists based on your
                  meal plans. Save time, reduce waste, and eat
                  better with Munchies.
                </p>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  Get Started
                </Button>
              </div>
              <div className="w-full bg-background rounded-lg shadow-xl overflow-hidden mt-20 border-[1px] border-white">
                <div className="aspect-[16/9] flex items-center justify-center relative">
                  <div className="z-20 flex flex-col bg-[#141925]/10 items-center justify-center absolute top-0 left-0 right-0 bottom-0 h-full">
                    <Button className="bg-primary text-primary-foreground hover:bg-primary/90 absolute w-64 h-14 text-lg shadow-xl">
                      Get Started
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
            <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-white text-foreground p-6 rounded-lg shadow flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Meal Planning
                </h3>
                <p>
                  Plan your meals for the week with our
                  intuitive interface.
                </p>
              </div>
              <div className="bg-white text-foreground p-6 rounded-lg shadow flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Smart Lists
                </h3>
                <p>
                  Automatically generate grocery lists based
                  on your meal plans.
                </p>
              </div>
              <div className="bg-white text-foreground p-6 rounded-lg shadow flex-1">
                <h3 className="text-xl font-semibold mb-2">
                  Waste Reduction
                </h3>
                <p>
                  Buy only what you need, reducing food waste
                  and saving money.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="pricing"
          className="py-20 w-full bg-secondary text-white"
        >
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-3xl font-bold mb-10 text-center">
              Pricing Plans
            </h2>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="bg-background text-foreground p-6 rounded-lg shadow flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  Basic
                </h3>
                <p className="text-3xl font-bold mb-4">
                  $0
                  <span className="text-sm font-normal">
                    /month
                  </span>
                </p>
                <ul className="mb-6 flex-grow">
                  <li className="flex items-center mb-2">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Basic meal planning</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Simple grocery lists</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Up to 10 meals/month</span>
                  </li>
                </ul>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-auto">
                  Get Started
                </Button>
              </div>
              <div className="bg-background text-foreground p-6 rounded-lg shadow flex-1 flex flex-col">
                <h3 className="text-xl font-semibold mb-2">
                  Pro
                </h3>
                <p className="text-3xl font-bold mb-4">
                  $9.99
                  <span className="text-sm font-normal">
                    /month
                  </span>
                </p>
                <ul className="mb-6 flex-grow">
                  <li className="flex items-center mb-2">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Advanced meal planning</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Smart grocery lists</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Unlimited meals</span>
                  </li>
                  <li className="flex items-center mb-2">
                    <Check className="mr-2 h-5 w-5 text-primary" />
                    <span>Nutritional information</span>
                  </li>
                </ul>
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-auto">
                  Upgrade to Pro
                </Button>
              </div>
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
                Sign Up
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
  );
}
