export default function Home({ articles }: any) {
    console.log(articles);
    return <div>Test</div>;
}

export async function getServerSideProps() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
    return {
        props: { articles: data },
    };
}
