import { styled } from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { useEffect, useState } from "react";

import RoadmapTitle from "../../components/roadmap/roadmapTitle/RoadmapTitle";
import Road from "../../components/roadmap/road/Road";
import Footer from "../../components/common/footer/Footer";
import {
  getDetailedPositions,
  getRoadmap,
  getUserInfo,
} from "../../services/apis";
import { IRoadmap, IUserInfo } from "../../services/types";
import Overlay from "../../components/common/overlay/Overlay";
import Loader from "../../components/common/loader/Loader";
import { jobState } from "../../recoil/jobId/atom";
import { companyState } from "../../recoil/companyId/atom";
import { LoaderWrapper } from "../../components/common/loaderPageWrapper/styles";
import { selectedDetailedPositionState } from "../../recoil/selectedDetailedPosition/atom";
import {
  IDetailedPositions,
  detailedPositionsState,
} from "../../recoil/detailedPostions/atom";
import {
  ApiMessage,
  ApiStatus,
  StudyStatusMessage,
} from "../../constants/enums";
import { roadmapState } from "../../recoil/roadmap/atom";
import { isLoadingRoadmapPageState } from "../../recoil/isLoadingRoadmapPage/atom";
import Legend from "../../components/roadmap/legend/Legend";
import { accessTokenState } from "../../recoil/accessToken/atom";
import issueNewAccessTokenHook from "../../utils/issueNewAccessTokenHook";
import useAdaptiveWidth from "../../hooks/useAdaptiveWidth";
import DownCaretSvg from "../../components/common/downCaretSvg/DownCaretSvg";
import useOnClickedProfileOuter from "../../hooks/useOnClickedProfileOuter";
import { isLoginState } from "../../recoil/isLogin/atoms";
import ChannelService from "../../services/ChannelService";
import setMetaTags from "../../utils/setMetaTags";
import GoogleAdsense from "../../components/common/adsense/GoogleAdsense";
import {
  IRoadmapStudyStatusCodes,
  roadmapStudyStatusCodesState,
} from "../../recoil/roadmapStudyStatusCodes/atoms";
import { userInfoState } from "../../recoil/userInfo/atoms";

interface IParams {
  job: string;
  company: string;
}

interface IOnClickedDropdownOption {
  optionId: number;
  optionText: string;
}

interface IHandleRoadmapApi {
  accessToken: string | null;
  recursionCount: number;
}

const Wrapper = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  flex-direction: column;
  margin-top: 50px;
  margin-bottom: 100px;
  min-height: calc(100% - 50px);
`;

const SelectDetailedPositionWrapper = styled.div``;

const SelectDetailedPositionText = styled.span`
  margin-right: 10px;
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => props.theme.textColor};
`;

const SelectDetailedPosition = styled.select`
  padding: 5px;
  min-width: 150px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
  font-size: 16px;
  font-family: ${(props) => props.theme.contentFont};
  color: rgba(0, 0, 0, 0.8);
`;

const OptionDetailedPosition = styled.option``;

const DropdownDetailedPositionWrapper = styled.div`
  display: flex;
`;

const DropdownDescription = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  height: 30px;
  font-weight: bold;
`;

const DropdownListWrapper = styled.div`
  position: relative;
  width: 150px;
`;

const DropdownLable = styled.label<{ $isDropdownOptions: boolean }>`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
  padding: 8px 13px;
  width: 100%;
  border: 1px solid
    ${(props) =>
      props.$isDropdownOptions ? props.theme.mainColor : props.theme.greyColor};
  color: ${(props) =>
    props.$isDropdownOptions ? props.theme.mainColor : props.theme.textColor};
  font-weight: ${(props) => (props.$isDropdownOptions ? "bold" : "normal")};
  border-radius: 5px;
`;

const DropdownOptionList = styled.ul`
  overflow: auto;
  position: absolute;
  top: 40px;
  padding: 8px;
  width: 150px;
  height: fit-content;
  max-height: 150px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 5px;
  background-color: ${(props) => props.theme.bgColor};
  z-index: 3;

  &::-webkit-scrollbar {
    /* display: none; */
  }
`;

const DropdownOption = styled.li`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 8px;
  border-radius: 5px;

  &:hover {
    background-color: ${(props) => props.theme.mainColorLighter};
    color: ${(props) => props.theme.mainColor};
    font-weight: bold;
  }
`;

const DropdownCaretWrapper = styled.div`
  position: absolute;
  right: 10px;

  svg {
    fill: ${(props) => props.theme.greyColor};
  }
`;

const CloseDescription = styled.p`
  margin-top: 30px;
  font-size: 24px;
  font-weight: bold;
`;

const EmployAndDetailedPositionWrapper = styled.div`
  position: relative;

  @media screen and (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

const EmploymentInfoLink = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: -350px;
  bottom: 0;
  margin: auto auto;
  width: 150px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.greyColor};
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  text-decoration: none;
  cursor: pointer;

  @media screen and (max-width: 1024px) {
    right: -250px;
  }

  @media screen and (max-width: 767px) {
    position: relative;
    top: auto;
    right: auto;
    bottom: auto;
    margin: 0;
    margin-top: 20px;
  }

  &:hover {
    background-color: ${(props) => props.theme.mainColorLighter};
    color: ${(props) => props.theme.mainColor};
    font-weight: bold;
  }
`;

function RoadmapPage() {
  const currentWidth = useAdaptiveWidth();

  const history = useHistory();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  //NOTE - 쿼리스트링 파라미터 가져오는 부분
  const qs = require("querystring");
  const location = useLocation();
  const params: IParams = qs.parse(location.search.slice(1));

  const setJob = useSetRecoilState(jobState);
  const setCompany = useSetRecoilState(companyState);
  const [selectedDetailedPosition, setSelectedDetailedPosition] =
    useRecoilState(selectedDetailedPositionState);
  const [detailedPositions, setDetailedPositions] = useRecoilState(
    detailedPositionsState
  );
  const [roadmap, setRoadmap] = useRecoilState(roadmapState);
  const [isLoadingRoadmapPage, setIsLoadingRoadmapPage] = useRecoilState(
    isLoadingRoadmapPageState
  );
  const [isFirstRendering, setIsFirstRendering] = useState(true);
  const setIsLogin = useSetRecoilState(isLoginState);
  const setRoadmapStudyStatusCodes = useSetRecoilState(
    roadmapStudyStatusCodesState
  );
  const setUserInfo = useSetRecoilState(userInfoState);

  const onClickedProfileOuter = useOnClickedProfileOuter();

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDetailedPosition(+event.target.value);
  };

  const [selectedDropdownLabelText, setSelectedDropdownLabelText] =
    useState("");
  const [isDropdownOptions, setIsDropdownOptions] = useState(false);
  const onClickedDropdownLabel = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsDropdownOptions((prev) => !prev);
  };
  const onClickedDropdownOption = ({
    optionId,
    optionText,
  }: IOnClickedDropdownOption) => {
    setIsDropdownOptions((prev) => !prev);
    setSelectedDropdownLabelText(optionText);
    setSelectedDetailedPosition(optionId);
  };
  const onClickedWrapper = (event: React.MouseEvent<HTMLElement>) => {
    setIsDropdownOptions(false);
    onClickedProfileOuter();
  };
  const initRoadmapStudyStatusCodes = (roadmapApiData: IRoadmap) => {
    // let roadmapStudyStatusCodes: IRoadmapStudyStatusCodes =
    //   roadmapApiData.data!.courseList.map((course) => {
    //     if (course?.courses.length === 0) {
    //       return {};
    //     } else {
    //       let roadmapColumn: IRoadmapStudyStatusCodes = {};
    //       for (let i = 0; i < course!.courses.length; i++) {
    //         const coursesItem = course!.courses[i];
    //         if (coursesItem.studyStatus === StudyStatusMessage.STUDYING) {
    //           roadmapColumn[coursesItem.id] = 1;
    //         } else if (
    //           coursesItem.studyStatus === StudyStatusMessage.STUDY_END
    //         ) {
    //           roadmapColumn[coursesItem.id] = 2;
    //         } else {
    //           roadmapColumn[coursesItem.id] = 0;
    //         }
    //       }
    //       return roadmapColumn;
    //     }
    //   });
    let roadmapStudyStatusCodes: IRoadmapStudyStatusCodes = {};

    for (let i = 0; i < roadmapApiData.data!.courseList.length; i++) {
      const course = roadmapApiData.data!.courseList[i];
      if (course?.courses.length === 0) {
        roadmapStudyStatusCodes[i] = new Map<string, number>();
      } else {
        let roadmapColumn = new Map<string, number>();
        for (let i = 0; i < course!.courses.length; i++) {
          const coursesItem = course!.courses[i];
          if (coursesItem.studyStatus === StudyStatusMessage.STUDYING) {
            roadmapColumn.set(coursesItem.id.toString(), 1);
          } else if (coursesItem.studyStatus === StudyStatusMessage.STUDY_END) {
            roadmapColumn.set(coursesItem.id.toString(), 2);
          } else {
            roadmapColumn.set(coursesItem.id.toString(), 0);
          }
        }
        roadmapStudyStatusCodes[i] = roadmapColumn;
      }
    }

    setRoadmapStudyStatusCodes(roadmapStudyStatusCodes);
  };

  useEffect(() => {
    const channelTalk = new ChannelService();
    channelTalk.boot({ pluginKey: "879e637c-369e-44e8-a44e-21b8fd3d0f63" });

    if (localStorage.getItem("refreshToken")) {
      setIsLogin(true);
    }

    // const handleRefreshPageIssueToken = async () => {
    //   const newAccessToken: string | null = await issueNewAccessTokenHook();
    //   if (newAccessToken === "/") {
    //     setIsLogin(false);
    //     setAccessToken(null);
    //     history.push("/");
    //   } else {
    //     setAccessToken(newAccessToken);
    //   }
    //   return;
    // };

    // if (!accessToken && localStorage.getItem("refreshToken")) {
    //   handleRefreshPageIssueToken();
    // }

    setMetaTags({
      title: "채용 정보 기반 로드맵 - DEVRIDGE",
      description: "원하는 직무, 회사, 부서에 맞는 맞춤형 로드맵을 만나보세요.",
      ogTitle: "채용 정보 기반 로드맵 - DEVRIDGE",
      ogDescription:
        "원하는 직무, 회사, 부서에 맞는 맞춤형 로드맵을 만나보세요.",
    });

    return () => {
      setMetaTags({});
    };
  }, []);

  //NOTE - 디테일 포지션 API, 로드맵 API 순차적 호출
  useEffect(() => {
    let firstDetailedPosition: number = selectedDetailedPosition;
    setJob(+params.job);
    setCompany(+params.company);
    setIsLoadingRoadmapPage(true);

    const handleDetailedPositionsApi = async () => {
      const detailedPositionApiData: IDetailedPositions =
        await getDetailedPositions({
          companyId: +params.company,
          jobId: +params.job,
        });

      if (detailedPositionApiData.status === ApiStatus.error) {
        alert("예기치 않은 오류가 발생하였습니다. 관리자에게 문의해주세요.");
        history.push("/");
        return;
      } else {
        setSelectedDropdownLabelText(
          detailedPositionApiData.data!.detailedPositionDtos[0].name || "error"
        );
        setDetailedPositions(detailedPositionApiData);
        setSelectedDetailedPosition(
          detailedPositionApiData.data!.detailedPositionDtos[0].id || -1
        );
        firstDetailedPosition =
          detailedPositionApiData.data!.detailedPositionDtos[0].id || -1;
      }
    };

    const handleRoadmapApi = async ({
      accessToken,
      recursionCount,
    }: IHandleRoadmapApi) => {
      const roadmapApiData: IRoadmap = await getRoadmap({
        jobId: +params.job,
        companyId: +params.company,
        detailedPosition: firstDetailedPosition,
        accessToken: accessToken,
      });
      if (recursionCount > 3) {
        alert("과도한 통신량 발생. 관리자에게 문의해주세요.");
        setIsLogin(false);
        setAccessToken(null);
        localStorage.removeItem("refreshToken");
        history.push("/");
        return;
      }

      if (roadmapApiData.status === ApiStatus.error) {
        if (roadmapApiData.message === ApiMessage.roadmap) {
          alert("예기치 않은 오류가 발생하였습니다. 관리자에게 문의해주세요.");
          history.push("/");
          return;
        } else if (roadmapApiData.message === ApiMessage.login_required) {
          alert("로그인이 필요한 서비스입니다.");
          setIsLogin(false);
          setAccessToken(null);
          localStorage.removeItem("refreshToken");
          history.push("/");
          return;
        } else {
          const newAccessToken: string | null = await issueNewAccessTokenHook();

          if (newAccessToken === "/") {
            setIsLogin(false);
            setAccessToken(null);
            history.push("/");
            return;
          } else {
            setAccessToken(newAccessToken);
            handleRoadmapApi({
              accessToken: newAccessToken,
              recursionCount: recursionCount + 1,
            });
            return;
          }
        }
      } else {
        setRoadmap(roadmapApiData);
        setIsLoadingRoadmapPage(false);
        initRoadmapStudyStatusCodes(roadmapApiData);
        return;
      }
    };

    const handleRefreshPageIssueToken = async () => {
      const newAccessToken: string | null = await issueNewAccessTokenHook();
      if (newAccessToken === "/") {
        setIsLogin(false);
        setAccessToken(null);
        history.push("/");
        return null;
      } else {
        setAccessToken(newAccessToken);
        if (newAccessToken !== null) {
          const userInfo: IUserInfo = await getUserInfo({
            accessToken: newAccessToken,
          });
          setUserInfo(userInfo.data);
        }
      }
      return newAccessToken;
    };

    const handleGoRoadmap = async () => {
      let accessTokenChecked: string | null = accessToken;
      if (!accessToken && localStorage.getItem("refreshToken")) {
        accessTokenChecked = await handleRefreshPageIssueToken();
        if (accessTokenChecked === null) {
          return;
        }
      }
      if (selectedDetailedPosition === -1 || isFirstRendering) {
        await handleDetailedPositionsApi();
      }
      await handleRoadmapApi({
        accessToken: accessTokenChecked,
        recursionCount: 0,
      });
    };

    handleGoRoadmap();
    setIsFirstRendering(false);
  }, [selectedDetailedPosition]);

  return (
    <Wrapper onClick={onClickedWrapper}>
      {!isLoadingRoadmapPage ? (
        <>
          <RoadmapTitle
            $jobName={roadmap.data?.jobName ?? "error"}
            $companyName={roadmap.data?.companyName ?? "error"}
          />
          <Legend />
          <EmployAndDetailedPositionWrapper>
            {currentWidth < 768 ? (
              <SelectDetailedPositionWrapper>
                <SelectDetailedPositionText>부서</SelectDetailedPositionText>
                <SelectDetailedPosition
                  onChange={handleSelect}
                  value={selectedDetailedPosition}
                >
                  {detailedPositions.data!.detailedPositionDtos.map(
                    (detailedPosition) => (
                      <OptionDetailedPosition
                        key={detailedPosition.id}
                        value={detailedPosition.id}
                      >
                        {detailedPosition.name}
                      </OptionDetailedPosition>
                    )
                  )}
                </SelectDetailedPosition>
              </SelectDetailedPositionWrapper>
            ) : (
              <DropdownDetailedPositionWrapper>
                <DropdownDescription>부서</DropdownDescription>
                <DropdownListWrapper>
                  <DropdownLable
                    onClick={onClickedDropdownLabel}
                    $isDropdownOptions={isDropdownOptions}
                  >
                    {selectedDropdownLabelText}
                    <DropdownCaretWrapper>
                      <DownCaretSvg />
                    </DropdownCaretWrapper>
                  </DropdownLable>
                  {isDropdownOptions ? (
                    <DropdownOptionList>
                      {detailedPositions.data!.detailedPositionDtos.map(
                        (detailedPosition) => (
                          <DropdownOption
                            key={detailedPosition.id}
                            onClick={() =>
                              onClickedDropdownOption({
                                optionId: detailedPosition.id,
                                optionText: detailedPosition.name,
                              })
                            }
                          >
                            {detailedPosition.name}
                          </DropdownOption>
                        )
                      )}
                    </DropdownOptionList>
                  ) : null}
                </DropdownListWrapper>
              </DropdownDetailedPositionWrapper>
            )}
            {roadmap.data?.companyInfoUrl ? (
              <EmploymentInfoLink
                href={roadmap.data.companyInfoUrl}
                target="_blank"
              >
                채용 정보 보기
              </EmploymentInfoLink>
            ) : null}
          </EmployAndDetailedPositionWrapper>

          {/* <GoogleAdsense
            className="adsbygoogle"
            client="ca-pub-5067775298991229"
            slot="8977744885"
            format="auto"
            responsive="true"
            $isAside={currentWidth > 1370 ? true : false}
          /> */}
        </>
      ) : null}
      {!isLoadingRoadmapPage ? (
        <>
          {roadmap.data?.courseList.length ? (
            <Road roadmapApiData={roadmap} />
          ) : (
            <CloseDescription>준비 중입니다.</CloseDescription>
          )}
          <Footer $isRoadmapPage={true} />
        </>
      ) : (
        <>
          <Overlay />
          <LoaderWrapper>
            <Loader width={100} height={100} />
          </LoaderWrapper>
        </>
      )}
    </Wrapper>
  );
}

export default RoadmapPage;
