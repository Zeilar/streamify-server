import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { Video } from "../../../@types/video";

interface VideoData {
    video: Video;
    videoUrl: string;
}

export default function SingleVideo({ video, videoUrl }: VideoData) {
    console.log("hello world", video, videoUrl);
    return <div>Video</div>;
}

export async function getServerSideProps(
    context: GetServerSidePropsContext<{ id: string }>
) {
    let data: VideoData | {} = {};
    try {
        const response = await axios.get<VideoData>(
            `${process.env.API_BASE_URL}/video/${context.params.id}`
        );
        data = response.data;
    } catch (error) {
        console.error(error);
    } finally {
        return { props: data };
    }
}
