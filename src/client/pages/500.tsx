import ErrorPage from "../components/ErrorPage";

export default function CustomError() {
    return <ErrorPage code={500} message="Something went wrong" />;
}
