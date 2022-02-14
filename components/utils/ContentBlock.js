export default function ContentBlock(props) {
  return (
    <div className={"w-full bg-" + props.color + " px-6 md:px-24"}>
      <div className="flex flex-col py-24 text-light w-full lg:w-1/2 mx-auto">
        <h2 className="mb-6 text-4xl font-bold">{props.title}</h2>
        <div className="relative space-y-6">{props.children}</div>
      </div>
    </div>
  )
}
