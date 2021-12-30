import {
    HomeIcon,
    PuzzleIcon,
    EyeIcon,
    LightningBoltIcon
} from "@heroicons/react/outline"
import Logo from "./Logo"

function Sidebar() {
    return (
        <div className="text-light p-5 text-sm border-r border-accent-dark">
            <div className="">
                <Logo />
                <h1 className="text-xl">ChessPecker</h1>
            </div>
            <div className="space-y-4">
                <hr />
                <button className="flex items-center space-x-3 hover:text-accent-light">
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className="flex items-center space-x-3 hover:text-accent-light">
                    <PuzzleIcon className="h-5 w-5" />
                    <p>Puzzles</p>
                </button>
                <button className="flex items-center space-x-3 hover:text-accent-light">
                    <EyeIcon className="h-5 w-5" />
                    <p>Visualise</p>
                </button>
                <button className="flex items-center space-x-3 hover:text-accent-light">
                    <LightningBoltIcon className="h-5 w-5" />
                    <p>Knight Jumps</p>
                </button>
                <hr />
                <button className="flex items-center space-x-3 hover:text-accent-light">
                    <p>Log In</p>
                </button>
                <button className="flex items-center space-x-3 hover:text-accent-light">
                    <p>Log Out</p>
                </button>
            </div>
        </div>
    )
}

export default Sidebar


