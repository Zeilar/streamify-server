import ErrorPage from "../components/ErrorPage";

export default function NotFoundError() {
    return <ErrorPage code={404} message="Not Found" />;
}
