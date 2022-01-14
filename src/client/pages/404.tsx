import ErrorPage from "../components/ErrorPage";

export default function NotFoundError() {
    return <ErrorPage code={404} message="That page could not be found" />;
}
