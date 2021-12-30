import Image from "next/image"

const Logo = (props) => (
        <div className="flex items-center space-x-5">
            <Image src="/CHESSPECKER_LOGO.svg" alt="ChessPecker Logo" width="100px" height="130px" />
            <p className="text-light text-4xl font-bold" style={{display: props.text ?"block":"none"}}>ChessPecker</p>
        </div>
    )

export default Logo
