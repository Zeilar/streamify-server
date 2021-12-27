import { GetServerSidePropsContext } from "next";
import axios from "axios";
import { Video } from "../../../@types/video";
import Head from "next/head";
import Player from "../../../components/Player";
import { ApiService } from "../../../services/ApiService";

interface VideoData {
    video?: Video;
    videoUrl?: string;
}

export default function SingleVideo({ video, videoUrl }: VideoData) {
    const url = `${videoUrl}.mp4`;
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
    const apiService = new ApiService();
    const { data } = await apiService.request<VideoData>(
        `/video/${context.params.id}`
    );
    return { props: data };
}
