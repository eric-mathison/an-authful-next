import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Html5Icon,
  Disability01Icon,
  SecurityLockIcon,
  SecurityPasswordIcon,
  Link03Icon,
  RocketIcon,
  GithubIcon,
} from "hugeicons-react"

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
          <h2 className="text-center text-3xl mb-2">Features</h2>
          <p className="text-muted-foreground md:text-xl text-center mb-8">
            Start off right using this as a boilerplate for your next project
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Html5Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Semantic HTML</CardTitle>
              </CardHeader>
              <CardContent>
                Examples of where to use semantic html on every page.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Disability01Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Web Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                Accessibility at its core using libraries like Shadcn and
                RadixUI.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <SecurityPasswordIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Two Factor Security</CardTitle>
              </CardHeader>
              <CardContent>
                Implement two factor passcodes to enhance security for your
                users' accounts.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <SecurityLockIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Credential and OAuth Sign in</CardTitle>
              </CardHeader>
              <CardContent>
                Allow users to sign in using the methods they prefer. Account
                linking is supported!
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Link03Icon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Parallel and Intercepting Routes</CardTitle>
              </CardHeader>
              <CardContent>
                Take advantage of rendering multiple routes simultaneously and
                displaying routes as modals.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <RocketIcon className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Ready to Deploy</CardTitle>
              </CardHeader>
              <CardContent>
                Structured to serve as a solid foundation for your next project.
                Fork it and start building.
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
                Start building your next project!
              </h2>
              <p className="mx-auto max-w-[600px] text-purple-100 md:text-xl">
                Fork this project and start coding your next application with a
                solid authentication foundation.
              </p>
            </div>
            <div className="w-full max-w-sm items-center justify-center space-y-2 flex space-x-4">
              <a
                href="https://github.com/eric-mathison/an-authful-next"
                className="flex flex-col gap-2 items-center"
              >
                <Button variant="secondary">
                  <GithubIcon className="h-8 w-8" />
                  See it on Github
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
