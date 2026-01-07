import { Button } from "@/components/ui/button";
import { ClerkLoaded, ClerkLoading, SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="max-w-247 mx-auto flex-1 w-full flex flex-col lg:flex-row items-center justify-center pd-4 gap-2">
      <div className="relative w-60 h-60 lg:w-106 lg:h-106 mb-8 lg:mb-0">
        <Image src="/hero.png" fill alt="Hero"/>
      </div>
      <div className="flex flex-col items-center gap-y-8 ">
        <h1 className="text-xl lg:text-3xl font-bold text-neutral-600 max-w-120 text-center">Изучай, практикуй и совершенствуй новые языки вместе с Lang</h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          <ClerkLoading>
            <Loader className="h-5 w-5 text-muted-foreground animate-spin"/>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedOut>
              <SignUpButton
                mode="modal"
                forceRedirectUrl="/learn"
                signInForceRedirectUrl="/learn"
              >
                <Button size="lg" variant="secondary" className="w-full">
                  Начать
                </Button>
              </SignUpButton>
              <SignInButton
                mode="modal"
                forceRedirectUrl="/learn"
                signUpForceRedirectUrl="/learn"
              >
                <Button size="lg" variant="primaryOutline" className="w-full">
                  У меня уже есть аккаунт
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Button size="lg" variant="secondary" className="w-full" asChild>
                <Link href="/learn">
                  Продолжить
                </Link>
              </Button>
            </SignedIn>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  )
}
