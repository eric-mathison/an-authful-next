import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Shield } from "lucide-react"
import { Html5Icon, Disability01Icon } from "hugeicons-react"

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1>
                Next + <span className="text-primary">Auth</span>
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Testing the latest Next.js features and integration with Auth.js
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        id="features"
        className="w-full py-12 md:py-24 lg:py-32 bg-background"
      >
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-center text-3xl">Powerful Features</h2>
          <p className="text-muted-foreground md:text-xl text-center mb-8">
            Everything you need to take your productivity to the next level
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Html5Icon className="h-8 w-8 text-primary mb-2 stroke-2" />
                <CardTitle>Semantic HTML</CardTitle>
              </CardHeader>
              <CardContent>
                Examples of where to use semantic html on every page.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Disability01Icon className="h-8 w-8 text-primary mb-2 stroke-2" />
                <CardTitle>Web Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                Accessibility at its core using libraries like Shadcn and
                RadixUI.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Shield className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Advanced Security</CardTitle>
              </CardHeader>
              <CardContent>
                Rest easy knowing your data is protected with state-of-the-art
                encryption and security measures.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary text-white">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Supercharge Your Workflow?
              </h2>
              <p className="mx-auto max-w-[600px] text-purple-100 md:text-xl">
                Join thousands of satisfied customers and take your productivity
                to new heights.
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <form className="flex space-x-2">
                <Input
                  className="flex-1 bg-white text-gray-900"
                  placeholder="Enter your email"
                  type="email"
                />
                <Button type="submit" variant="secondary">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
              <p className="text-xs text-purple-100">
                14-day free trial. No credit card required.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
