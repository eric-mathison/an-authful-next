import { cn } from "@/lib/utils"

type FooterProps = {
  transparent?: boolean
}

export function Footer({ transparent = false }: FooterProps) {
  return (
    <footer
      className={cn(
        "flex items-center flex-col p-4 bg-emerald-500 drop-shadow-sm text-white",
        transparent && "bg-transparent"
      )}
    >
      Created with a 💻
    </footer>
  )
}
