import { Button } from "@/components/ui/button"
import Image from "next/image"

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-5xl mx-auto flex items-center justify-center h-full">
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/gb.svg" alt="Great Britain" height={32} width={40} className="mr-4 rounded-md"/>
          Английский
        </Button>
        <Button size="lg" variant="ghost" className="w-full">
          <Image src="/es.svg" alt="Spain" height={32} width={40} className="mr-4 rounded-md"/>
          Испанский
        </Button>
      </div>
    </footer>
  )
}