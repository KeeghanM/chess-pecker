import Link from "next/link"

export default function FeatureCard(props) {
  return (
    <div>
      <div className="text-dark bg-light w-full lg:max-w-sm md:max-w-lg p-6 border-primary border-b-8 mt-[-50px] mb-6">
        <h3 className="font-bold text-xl pb-6">{props.title}</h3>
        <div className="space-y-4 pb-6">{props.children}</div>
        <Link href={props.target}>
          <button className="px-4 py-2 bg-accent-dark text-light hover:bg-primary hover:text-light transition duration-200">
            {props.cta}
          </button>
        </Link>
      </div>
    </div>
  )
}
