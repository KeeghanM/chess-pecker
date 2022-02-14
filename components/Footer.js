import Link from "next/link"

function Footer() {
  return (
    <div className="p-10 w-screen bg-black text-light flex flex-col md:flex-row items-center justify-center gap-4 mt-auto border-t-4 border-primary">
      <div className="px-4 py-2 bg-accent-light text-dark hover:bg-primary hover:text-light transition duration-200 hover:cursor-pointer">
        <Link href="/about">
          <p>Learn More About Us</p>
        </Link>
      </div>
      <div>
        <a href="https://www.buymeacoffee.com/KeeghanM" target="_blank">
          <button className="px-4 py-2 bg-accent-dark text-light hover:bg-primary hover:text-light transition duration-200">
            Support Us
          </button>
        </a>
      </div>
      <div className="px-4 py-2 bg-accent-light text-dark hover:bg-primary hover:text-light transition duration-200">
        <a href="mailto:contact@chesstraining.app">Contact Us</a>
      </div>
    </div>
  )
}

export default Footer
