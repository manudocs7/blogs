type Props = {
    id: string;
};

export function YouTube({ id }: Props) {
    return (
        <div className="my-6 max-w-3xl mx-auto">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-800">
                <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    className="absolute inset-0 w-full h-full"
                    allowFullScreen
                />
            </div>
        </div>
    );
}
