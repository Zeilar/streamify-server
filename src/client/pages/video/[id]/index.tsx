import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { Video } from "../../../@types/video";
import Head from "next/head";

interface VideoData {
    video?: Video;
    videoUrl?: string;
}

export default function SingleVideo({ video, videoUrl }: VideoData) {
    console.log("hello world", video, videoUrl);
    return (
        <div>
            <Head>
                <meta property="og:title" content={video.title} />
                <meta property="og:type" content="video.other" />
                <meta property="og:video" content={videoUrl} />
                <meta property="og:video:secure_url" content={videoUrl} />
                <meta property="og:video:type" content="video/mp4" />
                <meta property="og:video:width" content="1280" />
                <meta property="og:video:height" content="720" />
            </Head>
        </div>
    );
}

export async function getServerSideProps(
    context: GetServerSidePropsContext<{ id: string }>
) {
    let data: VideoData = {};
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
