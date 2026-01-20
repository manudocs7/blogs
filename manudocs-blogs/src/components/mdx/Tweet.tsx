import { Tweet as ReactTweet } from "react-tweet";

type Props = {
    id: string;
};

export function Tweet({ id }: Props) {
    return (
        <div className="my-6 max-w-md mx-auto scale-[0.9]">
            <ReactTweet id={id} />
        </div>
    );
}
