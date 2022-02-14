import Link from 'next/link'

function Footer() {
  return (
    <div className="p-10 w-screen bg-dark text-light flex items-center justify-center space-x-4">
      <div className="px-4 py-2 bg-accent-light text-dark hover:bg-primary hover:text-light transition duration-200">
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
