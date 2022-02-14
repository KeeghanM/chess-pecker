import Image from "next/image"
import { useRouter } from "next/router"

export default function Logo(props) {
  const router = useRouter()
  return (
    <div className="flex items-center">
      <Image
        src="/chesstrainingapplogo.png"
        alt="ChessTraining.app Logo"
        width="90px"
        height="90px"
      />
      <p
        className="text-light text-xl font-bold hidden md:block"
        style={{
          display: props.text && router.pathname != "/" ? "block" : "none",
        }}
      >
        ChessTraining.app{props.text && " - " + props.text}
      </p>
    </div>
  )
}
