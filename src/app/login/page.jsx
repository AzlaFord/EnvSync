import Image from "next/image"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/login" className="flex items-center gap-2 font-medium">
            <div
              className="text-primary-foreground flex size-11 items-center justify-center rounded-md">
              <Image 
                src="/file.svg" 
                alt="icon" 
                width={60}   
                height={50}  
              />
            </div>
            EnvSync.
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/ri1f4oQ.jpeg"
          alt="Background"
          fill
          className="object-cover object-center dark:brightness-[0.2] dark:grayscale"
        />

      </div>
    </div>
  );
}
