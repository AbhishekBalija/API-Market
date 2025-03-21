import { Link } from "react-router-dom"
import { ArrowRight, Code, Database, Globe, Lock, Search, Server } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto max-w-7xl px-4 flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Code className="h-6 w-6" />
            <span className="text-xl font-bold">APIMarket</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link to="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Explore
            </Link>
            <Link to="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Pricing
            </Link>
            <Link to="#" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
              Documentation
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Sign up</Button>
            </Link>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Buy and Sell APIs with Ease
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    The premier marketplace for developers to discover, sell, and integrate APIs. Streamline your
                    development process and monetize your services.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link to="/register">
                    <Button className="w-full">
                      Get Started
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link to="#explore">
                    <Button variant="outline" className="w-full">
                      Explore APIs
                    </Button>
                  </Link>
                </div>
              </div>
              <img
                src="src/assets/hero.png"
                width={550}
                height={550}
                alt="API Marketplace Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:aspect-square"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted" id="explore">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Discover APIs</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Browse through thousands of APIs across various categories to find the perfect solution for your
                  project.
                </p>
              </div>
            </div>

            <div className="mx-auto w-full max-w-2xl space-y-4 py-8">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search for APIs..."
                  className="w-full appearance-none bg-background pl-8 shadow-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="group relative overflow-hidden rounded-lg border bg-background p-2">
                  <div className="flex h-[200px] items-center justify-center rounded-md bg-muted">
                    <Server className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold">Payment Processing API</h3>
                    <p className="text-sm text-muted-foreground">Secure payment processing for your applications</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-sm font-medium">$49/month</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm text-muted-foreground">4.8</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                              key={star}
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="h-4 w-4 text-yellow-500"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 flex justify-center">
              <Button variant="outline">Load More</Button>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Why Choose APIMarket?</h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  We provide the tools and platform for developers to succeed in the API economy.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Global Reach</h3>
                <p className="text-center text-muted-foreground">
                  Connect with developers and businesses from around the world.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Secure Transactions</h3>
                <p className="text-center text-muted-foreground">
                  Our platform ensures secure payments and data protection.
                </p>
              </div>

              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6">
                <div className="rounded-full bg-primary/10 p-3">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Analytics</h3>
                <p className="text-center text-muted-foreground">
                  Gain insights into your API usage and customer behavior.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 border-t">
          <div className="container mx-auto max-w-7xl grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Ready to join the API economy?</h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                Create an account today and start buying or selling APIs.
              </p>
            </div>
            <div className="mx-auto flex flex-col gap-2 min-[400px]:flex-row">
              <Link to="/register">
                <Button className="w-full">Sign Up Now</Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Log In
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto max-w-7xl flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row px-4">
          <div className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} APIMarket. All rights reserved.
            </p>
          </div>
          <div className="flex gap-4">
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Terms
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Privacy
            </Link>
            <Link to="#" className="text-sm text-muted-foreground hover:text-primary">
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

