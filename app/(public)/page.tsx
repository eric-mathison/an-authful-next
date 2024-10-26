import Link from "next/link"
import { Button } from "@/components/ui/button"
import { FeatureList } from "@/components/home/feature-list"

export default function Home() {
  return (
    <main className="flex flex-col h-full">
      <section className="flex flex-col py-28 items-center bg-[radial-gradient(farthest-corner_at_40px_40px,_var(--tw-gradient-stops))] from-green-400 to-emerald-500 space-y-12">
        <h1 className="drop-shadow-md font-semibold text-6xl text-white">
          🔐 Next <span className="text-4xl">v</span>14 + Auth{" "}
          <span className="text-4xl">v</span>5
        </h1>
        <h2 className="font-semibold text-2xl drop-shadow-sm text-white">
          Testing the latest Next.js features and integration with Auth.js
        </h2>
        <Link href="/dashboard">
          <Button variant={"default"}>Try to access the dashboard</Button>
        </Link>
      </section>
      <section className="bg-white py-14 flex h-full flex-col items-center space-y-8">
        <h3 className="font-bold text-gray-900 text-3xl">Features</h3>
        <FeatureList />
      </section>
    </main>
  )
}
