import { Html5Icon, Disability01Icon } from "hugeicons-react"
import { Feature } from "@/components/home/feature"

export function FeatureList() {
  return (
    <div className="grid grid-cols-3 max-w-4xl gap-8">
      <Feature>
        <Feature.Icon className="text-orange-400">
          <Html5Icon size={72} />
        </Feature.Icon>
        <Feature.Title text="Semantic HTML" />
        <Feature.Details text="Examples of where to use semantic html on every page" />
      </Feature>
      <Feature>
        <Feature.Icon className="text-emerald-400">
          <Disability01Icon size={72} />
        </Feature.Icon>
        <Feature.Title text="Web Accessibility" />
        <Feature.Details text="Accessibility at its core using libraries like Shadcn and RadixUI" />
      </Feature>
    </div>
  )
}
