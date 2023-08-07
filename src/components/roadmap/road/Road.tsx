import { useRouteMatch } from "react-router-dom";
import CSList from "../CSList/CSList";
import Tech from "../tech/Tech";
import { ProgressBar, Rope, Wrapper, WrapperItem } from "./styles";
import RoadmapTechPage from "../../../pages/roadmapTech/RoadmapTechPage";
import RoadmapCoursePage from "../../../pages/roadmapCourse/RoadmapCoursePage";

function Road() {
  const techPageMatch = useRouteMatch("/roadmap/tmp");
  const coursePageMatch = useRouteMatch("/roadmap/tmp/tmp2");
  const col = 9;
  const data: (number | null)[] = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41,
  ];

  for (let i = col; i < data.length; i += col) {
    data.splice(i, 0, null);
  }

  //TODO - 마지막 row 덜 채워져서 오른쪽 정렬 안되는거 해결하자
  return (
    <Wrapper>
      {data.map((i, index) => {
        const row = Math.floor(index / col);
        const orderFlipped = col * (row + 2) - (col + 1) - (index % col); // NOTE - 역순 row에 있는 아이템에 order 지정
        return (
          <WrapperItem
            key={index}
            style={{
              order: row % 2 !== 0 ? orderFlipped : index,
            }}
          >
            {/* //TODO - 뷰포트 단위 대신 픽셀로 하드코딩하고, 화면 크기 별로 레이아웃을 여러 개 구현한 뒤, 미디어쿼리로 기기에 맞게 정해진 레이아웃을 띄우는 방식으로 구현하자 */}
            {/* 오른쪽 ㄷ자 progress bar */}
            {(index + 10) % (col * 2) === 0 ? (
              <>
                <ProgressBar style={{ left: "-5vw", width: "15vw" }} />
                <ProgressBar
                  style={{
                    width: "15px",
                    height: "34.1vh",
                    left: "auto",
                    right: "-3.6vw",
                  }}
                />
              </>
            ) : null}
            {(index + 9) % (col * 2) === 0 ? (
              <ProgressBar style={{ left: "-5vw", width: "15vw" }} />
            ) : null}

            {/* 왼쪽 ㄷ자 progress bar */}
            {(index + 1) % (col * 2) === 0 ? (
              <>
                <ProgressBar style={{ left: "-2vw", width: "17vw" }} />
                <ProgressBar
                  style={{
                    width: "15px",
                    height: "34.1vh",
                    left: "-3.5vw",
                  }}
                />
              </>
            ) : null}
            {index % (col * 2) === 0 ? (
              <ProgressBar style={{ left: "-2vw", width: "17vw" }} />
            ) : null}

            {i !== null ? (
              <>
                {/* 맨 처음 progress bar 따로 추가 */}
                {index === 1 ? <ProgressBar $isDone={i <= 3} /> : null}

                {/* ㄷ자 부분 제외하고 progress bar 렌더링하는 부분 */}
                {i % 2 !== 0 &&
                (index + 2) % (col * 2) !== 0 &&
                (index - 1) % (col * 2) !== 0 ? (
                  <ProgressBar $isDone={i <= 3} />
                ) : null}

                {/* 서버에서 받은 인덱스가 홀수면 기술과 CS, 짝수면 CS 단독 리스트임 */}
                {i % 2 !== 0 ? (
                  <Tech
                    techName={`기술${(i + 1) / 2}`}
                    $checkerType={i <= 2 ? 2 : i === 3 ? 1 : 0}
                  />
                ) : (
                  <Rope $marginTop="20px" />
                )}
                <Rope />
                <CSList CSName={`CS${i}`} />
              </>
            ) : null}
          </WrapperItem>
        );
      })}
      {techPageMatch?.isExact ? <RoadmapTechPage /> : null}
      {coursePageMatch?.isExact ? <RoadmapCoursePage /> : null}
    </Wrapper>
  );
}

export default Road;
