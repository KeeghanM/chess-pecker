const Center = (props) => (
        <div className="flex flex-grow p-5 space-y-4">
            <h1 className="text-primary">{props.name}</h1>
            <div>{props.children}</div>
        </div>
)

export default Center
