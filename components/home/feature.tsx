type FeatureProps = {
  children: React.ReactNode
}

export function Feature({ children }: FeatureProps) {
  return <div className="flex flex-col items-center gap-2">{children}</div>
}

interface FeatureIconProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}
Feature.Icon = function FeatureIcon({ children, ...props }: FeatureIconProps) {
  return <figure {...props}>{children}</figure>
}

Feature.Title = function FeatureTitle({ text }: { text: string }) {
  return <h4 className="text-lg text-gray-900 font-semibold">{text}</h4>
}

Feature.Details = function FeatureDetails({ text }: { text?: string }) {
  return text && <p className="text-gray-500 text-center">{text}</p>
}
