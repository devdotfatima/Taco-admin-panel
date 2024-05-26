import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error: unknown = useRouteError();
  function isErrorWithStatusText(
    error: unknown
  ): error is { statusText: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "statusText" in error &&
      typeof (error as any).statusText === "string"
    );
  }

  function isErrorWithMessage(error: unknown): error is { message: string } {
    return (
      typeof error === "object" &&
      error !== null &&
      "message" in error &&
      typeof (error as any).message === "string"
    );
  }

  return (
    <div className="flex flex-col w-full h-screen justify-center items-center">
      <h1 className="text-xl font-semibold">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i className="text-xl ">
          {isErrorWithStatusText(error)
            ? error.statusText
            : isErrorWithMessage(error)
            ? error.message
            : "Unknown error"}
        </i>
      </p>
    </div>
  );
};
export default ErrorPage;
