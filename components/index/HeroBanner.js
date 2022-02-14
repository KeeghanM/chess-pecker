import Link from "next/link"
import Image from "next/image"

export default function HeroBanner() {
  return (
    <header className="h-[650px] text-light flex flex-col justify-center items-center relative text-center">
      <div className="space-y-2 z-10 w-full">
        <h1 className="text-3xl md:text-5xl font-bold text-primary">
          ChessTraining.app
        </h1>
        <p className="max-w-md font-bold pb-12 mx-auto">
          Are you ready to bring your chess to the next level?
        </p>
        <p className="max-w-md text-lg italic pb-12 mx-auto">
          Use our powerful training tools, backed by science and Grand Master
          training methods, to shape up your chess and bring in the wins!
        </p>
        <Link href="/login">
          <p className="px-4 py-2 bg-primary w-fit text-light hover:bg-accent-light hover:text-dark transition duration-200 mx-auto">
            Sign Up Now
          </p>
        </Link>
      </div>
      <Image
        src="/chessBackground.jpg"
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Lone king chess piece, placed on a chessboard, against a dark background"
        className="z-0"
      />
    </header>
  )
}
