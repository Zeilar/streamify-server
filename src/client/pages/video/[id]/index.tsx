import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { Video } from "../../../@types/video";
import Head from "next/head";
import Player from "../../../components/Player";

interface VideoData {
    video?: Video;
    videoUrl?: string;
}

export default function SingleVideo({ video, videoUrl }: VideoData) {
    // console.log("hello world", video, videoUrl);
    const url = `${videoUrl}.mp4`;
    // const url =
    //     "https://thumbs.gfycat.com/MessyWavyInexpectatumpleco-mobile.mp4";
    // const url =
    //     "https://firebasestorage.googleapis.com/v0/b/mp4watch-3192e.appspot.com/o/videos%2FkpHBxQ?alt=media&amp;token=1b3cd468-880d-4e0e-af50-78c5e4b185ef.mp4";
    return (
        <div>
            <Head>
                <meta property="og:title" content={video.title} />
                <meta property="og:url" content={url} />
                <meta property="og:site_name" content="mp4" />
                <meta property="og:type" content="video" />
                <meta property="og:video" content={url} />
                <meta property="og:video:url" content={url} />
                <meta property="og:video:secure_url" content={url} />
                <meta property="og:video:type" content="video/mp4" />
                <meta property="og:video:width" content="1280" />
                <meta property="og:video:height" content="720" />
            </Head>
            <Player src={url} />
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
