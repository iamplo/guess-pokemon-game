import { PropsWithChildren } from "react";

type Props = {
  isError: boolean;
  errorMsg?: string;
};

function ErrorBoundary({
  children,
  errorMsg,
  isError,
}: PropsWithChildren<Props>) {
  if (isError) {
    return <div>{errorMsg}</div>;
  }
  return <>{children}</>;
}

export default ErrorBoundary;
