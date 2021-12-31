import ErrorPage from "../components/ErrorPage";

export default function CustomError() {
    return <ErrorPage code={404} message="That page could not be found" />;
}
