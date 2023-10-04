import { styled } from "styled-components";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useHistory } from "react-router-dom";

import TechHeader from "../../components/roadmapTech/techHeader/TechHeader";
import Overlay from "../../components/common/overlay/Overlay";
import { roadmapTechState } from "../../recoil/roadmapTechDetail/atom";
import { getRoadmapCourseDetail } from "../../services/apis";
import {
  IRoadmapCourseDetail,
  roadmapCourseState,
} from "../../recoil/roadmapCourseDetail/atom";
import { switchRoadmapDetailState } from "../../recoil/swtichRoadmapDetail/atom";
import { courseTitleState } from "../../recoil/courseTitle/atom";
import { isLoadingCoursePageState } from "../../recoil/isLoadingCoursePage/atom";
import { ApiMessage, ApiStatus, SwitchDetail } from "../../constants/enums";
import { accessTokenState } from "../../recoil/accessToken/atom";
import issueNewAccessTokenHook from "../../hooks/issueNewAccessTokenHook";
import { jobState } from "../../recoil/jobId/atom";
import { companyState } from "../../recoil/companyId/atom";
import { selectedDetailedPositionState } from "../../recoil/selectedDetailedPosition/atom";
import { switchLoginState } from "../../recoil/switchLogin/atom";

interface IOnClickTechButton {
  selectedCourseId: number;
  selectedCourseTitle: string;
}

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 3;
`;

const TechMenuWrapper = styled.div`
  overflow: auto;
  position: fixed;
  top: 50px;
  right: 20px;
  bottom: 0;
  margin: auto auto;
  padding: 20px;
  width: 40vw;
  max-width: 450px;
  min-width: 260px;
  height: 80vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};

  &::-webkit-scrollbar {
    display: none;
  }

  @media screen and (max-width: 767px) {
    left: 0;
    right: 0;
  }
`;

const GridButtons = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  justify-items: center;
  gap: 10px;
  margin-top: 50px;

  a {
    width: 100%;
  }
`;

const TechButton = styled.button`
  width: 100%;
  height: 100px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 10px;
  background-color: ${(props) => props.theme.bgColor};
  box-shadow: 1px 1px 3px 1px ${(props) => props.theme.greyColor};
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;

  @media screen and (max-width: 400px) {
    font-size: 16px;
  }
`;

const BlindArea = styled.div<{ $publicUrl: string }>`
  position: relative;
  width: 100%;
  height: 55vh;
  background-image: url("./assets/blindCourseDetail2.PNG");
  background-size: contain;
`;

const LoginWrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto auto;
  width: max-content;
  height: max-content;
`;

const LoginDescription = styled.h3`
  margin-bottom: 20px;
  text-align: center;
  font-weight: bold;
  line-height: 130%;
  color: ${(props) => props.theme.textColor};
  cursor: default;
`;

const LoginButton = styled.button`
  padding: 10px;
  width: 100%;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.mainColor};
  color: white;
  font-size: 18px;
  text-decoration: none;
  cursor: pointer;
`;

function RoadmapTechPage() {
  const history = useHistory();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  //NOTE - 로그인 모달 창 스위칭 아톰
  const setSwitchLogin = useSetRecoilState(switchLoginState);

  const onClickedLogin = () => {
    setSwitchLogin(true);
  };

  const setSwitchRoadmapDetail = useSetRecoilState(switchRoadmapDetailState);
  const setSelectedCourseTitle = useSetRecoilState(courseTitleState);
  const setRoadmapCourseState = useSetRecoilState(roadmapCourseState);
  const setIsLoadingCoursePage = useSetRecoilState(isLoadingCoursePageState);

  const selectedTechState = useRecoilValue(roadmapTechState);
  const jobId = useRecoilValue(jobState);
  const companyId = useRecoilValue(companyState);
  const selectedDetailedPosition = useRecoilValue(
    selectedDetailedPositionState
  );

  const onClickTechButton = async ({
    selectedCourseId, //NOTE - 세부 기술 선택 화면에서 고른 세부 기술
    selectedCourseTitle,
  }: IOnClickTechButton) => {
    setIsLoadingCoursePage(true);
    setSwitchRoadmapDetail(SwitchDetail.COURSE);

    const data: IRoadmapCourseDetail = await getRoadmapCourseDetail({
      selectedCourseId,
      jobId,
      companyId,
      selectedDetailedPosition,
      accessToken,
    });

    if (data.status === ApiStatus.error) {
      if (data.message === ApiMessage.course_detail) {
        alert("관련 강의 및 도서가 존재하지 않습니다.");
        history.push("/");
        return;
      } else if (data.message === ApiMessage.login_required) {
        alert("다시 로그인 해주세요.");
        history.push("/");
        return;
      } else {
        const newAccessToken: string = await issueNewAccessTokenHook();
        if (newAccessToken === "/") {
          history.push("/");
          return;
        } else {
          setAccessToken(newAccessToken);
          onClickTechButton({ selectedCourseId, selectedCourseTitle });
          return;
        }
      }
    }

    setRoadmapCourseState(data);
    setSelectedCourseTitle(selectedCourseTitle);
    setIsLoadingCoursePage(false);
  };

  return (
    <Wrapper>
      <Overlay />
      <TechMenuWrapper>
        <TechHeader />
        {selectedTechState.message === ApiMessage.login_required ? (
          <BlindArea $publicUrl={process.env.PUBLIC_URL}>
            <LoginWrapper>
              <LoginDescription>
                내용을 확인하려면
                <br />
                로그인이 필요합니다.
              </LoginDescription>
              <LoginButton onClick={onClickedLogin}>로그인</LoginButton>
            </LoginWrapper>
          </BlindArea>
        ) : (
          <GridButtons>
            {selectedTechState.data!.courseDetails.map((courseDetail) => (
              <TechButton
                onClick={() =>
                  onClickTechButton({
                    selectedCourseId: courseDetail.id,
                    selectedCourseTitle: courseDetail.name,
                  })
                }
                key={courseDetail.id}
              >
                {courseDetail.name}
              </TechButton>
            ))}
          </GridButtons>
        )}
      </TechMenuWrapper>
    </Wrapper>
  );
}

export default RoadmapTechPage;
