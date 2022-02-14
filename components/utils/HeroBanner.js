import Link from "next/link"
import Image from "next/image"

export default function HeroBanner(props) {
  return (
    <header className="h-[650px] text-light flex flex-col justify-center items-center relative text-center">
      <div className="space-y-2 z-10 w-full px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-primary">
          {props.title}
        </h1>
        {props.children}
        {props.cta && (
          <Link href={props.target}>
            <p className="px-4 py-2 bg-primary w-fit text-light hover:bg-accent-light hover:text-dark transition duration-200 mx-auto">
              {props.cta}
            </p>
          </Link>
        )}
      </div>
      <Image
        src={props.image}
        layout="fill"
        objectFit="cover"
        objectPosition="center"
        alt="Lone king chess piece, placed on a chessboard, against a dark background"
        className="z-0"
        priority
      />
    </header>
  )
}
