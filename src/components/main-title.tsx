interface Props {
    title: string;
    marginTop?: number;
}

export default function MainTitle({ title, marginTop }: Props) {
    return (
        <h2
            className="text-2xl text-gray-800 font-semibold w-full mb-3"
            style={{ marginTop: marginTop }}
        >
            {title}
        </h2>
    );
}
