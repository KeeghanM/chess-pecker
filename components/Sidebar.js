import {
    HomeIcon,
    PuzzleIcon,
    EyeIcon,
    LightningBoltIcon
} from "@heroicons/react/outline"
import Logo from "./Logo"
import Link from 'next/link'

function Sidebar() {
    return (
        <div className="p-5 text-sm border-r shadow-lg shadow-accent-light overflow-y-scroll scrollbar-hide h-screen ">
            <div className="">
                <Logo />
                <h1 className="text-xl text-primary">ChessPecker</h1>
            </div>
            <div className="space-y-4">
                <hr />
                <Link href="/">
                    <button className="flex items-center space-x-3 hover:text-accent-light">
                        <HomeIcon className="h-5 w-5" />
                        <p>Home</p>
                    </button>
                </Link>
                <Link href="/puzzles">
                    <button className="flex items-center space-x-3 hover:text-accent-light">
                        <PuzzleIcon className="h-5 w-5" />
                        <p>Puzzles</p>
                    </button>
                </Link>
                <Link href="/visualise">
                    <button className="flex items-center space-x-3 hover:text-accent-light">
                        <EyeIcon className="h-5 w-5" />
                        <p>Visualise</p>
                    </button>
                </Link>
                <Link href="/knight">
                    <button className="flex items-center space-x-3 hover:text-accent-light">
                        <LightningBoltIcon className="h-5 w-5" />
                        <p>Knight Jumps</p>
                    </button>
                </Link>
                <hr />
                <Link href="/login">
                    <button className="flex items-center space-x-3 hover:text-accent-light">
                        <p>Log In</p>
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Sidebar


