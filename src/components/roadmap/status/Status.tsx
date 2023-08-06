import { Checker, StatusCircle } from "./styles";

interface IStatus {
  width?: string;
  height?: string;
  $checkerType?: number;
}

function Status({
  width = "35px",
  height = "35px",
  $checkerType = 0,
}: IStatus) {
  return (
    <StatusCircle width={width} height={height} $checkerType={$checkerType}>
      <Checker
        xmlns="http://www.w3.org/2000/svg"
        height="1em"
        viewBox="0 0 448 512"
        $checkerType={$checkerType}
      >
        {/* <!--! Font Awesome Free 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
        <path
          d={
            $checkerType === 1
              ? "M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
              : "M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
          }
        />
      </Checker>
    </StatusCircle>
  );
}

export default Status;
