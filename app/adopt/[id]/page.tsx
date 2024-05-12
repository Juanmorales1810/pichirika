interface Params {
    id: string;
}

export default function App({ params }: { params: Params }) {
    return (
        <div>
            <h1>{params.id}</h1>
        </div>
    )
}