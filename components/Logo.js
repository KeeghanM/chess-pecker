import Image from 'next/image'

const Logo = (props) => (
  <div className="flex items-center space-x-5">
    <Image
      src="/chesstrainingapplogo.png"
      alt="ChessTraining.app Logo"
      width="90px"
      height="90px"
    />
    <p
      className="text-light text-xl font-bold hidden md:block"
      style={{ visibility: props.text ? 'visible' : 'hidden' }}
    >
      ChessTraining.app{props.text && ' - ' + props.text}
    </p>
  </div>
)

export default Logo
