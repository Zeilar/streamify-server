import { GetServerSidePropsContext } from "next";
import { Video } from "../../../@types/video";
import Head from "next/head";
import Player from "../../../components/Player";
import { ApiService } from "../../../services/ApiService";
import { Flex, Text } from "@chakra-ui/react";
import Icon from "../../../components/Icon";

interface VideoData {
    video: Video;
    videoUrl: string;
}

export default function SingleVideo({ video, videoUrl }: VideoData) {
    const url = `${videoUrl}.mp4`;
    return (
        <div>
            <Head>
                <title>mp4 | {video.title}</title>
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
            <Flex mt="0.25rem">
                <Text>{video.title}</Text>
                <Flex ml="auto" alignItems="center" title="Views">
                    <Text textStyle="span" as="span">
                        {video.views.toLocaleString()}
                    </Text>
                    <Icon ml="0.5rem" icon="mdiEye" />
                </Flex>
            </Flex>
        </div>
    );
}

export async function getServerSideProps(
    context: GetServerSidePropsContext<{ id: string }>
) {
    if (!context.params?.id) {
        throw new Error("No id param provided.");
    }
    const apiService = new ApiService();
    const { data } = await apiService.request<VideoData>(
        `/video/${context.params.id}`
    );
    return { props: data };
}
