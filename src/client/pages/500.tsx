import ErrorPage from "../components/ErrorPage";

export default function ServerError() {
    return <ErrorPage code={500} message="Something went wrong" />;
}
