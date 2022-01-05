import Link from 'next/link'

function Footer() {
  return (
    <div className="p-10 w-screen bg-dark text-light flex items-center justify-between">
      <div className="">
        <a href="https://www.buymeacoffee.com/KeeghanM" target="_blank">
          <button className="inline-block text-sm md:text-lg py-1 px-2 md:py-2 md:px-4 text-dark font-bold bg-accent-light hover:bg-accent-dark hover:text-light rounded-full transition duration-200">
            Buy me a coffee!
          </button>
        </a>
      </div>
      <div className="text-lg hover:text-primary">
        <Link href="/about">
          <p>Learn more about us</p>
        </Link>
      </div>
    </div>
  )
}

export default Footer
