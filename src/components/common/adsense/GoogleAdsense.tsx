import { useEffect } from "react";
import { styled } from "styled-components";

declare const window: any;

interface IGoogleAdsense {
  className: string;
  client: string;
  slot: string;
  format: string;
  responsive: string;
  $isAside: boolean;
}

const Ins = styled.ins<{ $isAside: boolean }>`
  position: ${(props) => (props.$isAside ? "fixed" : "absolute")};
  top: ${(props) => (props.$isAside ? 0 : "auto")};
  left: ${(props) => (props.$isAside ? "10px" : 0)};
  right: ${(props) => (props.$isAside ? "auto" : 0)};
  bottom: 0;
  margin: ${(props) => (props.$isAside ? "auto 0" : "0 auto")};
  width: ${(props) => (props.$isAside ? "140px" : "80vw")};
  height: ${(props) => (props.$isAside ? "70vh" : "100px")};
  min-height: ${(props) => (props.$isAside ? "500px" : "100px")};
  transform: ${(props) => (props.$isAside ? "none" : "translateY(20px)")};

  @media screen and (max-height: 670px) {
    transform: ${(props) => (props.$isAside ? "none" : "translateY(150px)")};
  }

  @media screen and (max-height: 670px) {
    transform: ${(props) => (props.$isAside ? "none" : "translateY(20px)")};
  }

  @media screen and (max-width: 520px) {
    height: ${(props) => (props.$isAside ? "70vh" : "80px")};
    transform: ${(props) => (props.$isAside ? "none" : "translateY(80px)")};
  }
`;

const TestDiv = styled.ins<{ $isAside: boolean }>`
  position: ${(props) => (props.$isAside ? "fixed" : "absolute")};
  top: ${(props) => (props.$isAside ? 0 : "auto")};
  left: ${(props) => (props.$isAside ? "10px" : 0)};
  right: ${(props) => (props.$isAside ? "auto" : 0)};
  bottom: 0;
  margin: ${(props) => (props.$isAside ? "auto 0" : "0 auto")};
  width: ${(props) => (props.$isAside ? "140px" : "80vw")};
  height: ${(props) => (props.$isAside ? "70vh" : "100px")};
  min-height: ${(props) => (props.$isAside ? "500px" : "100px")};
  transform: ${(props) => (props.$isAside ? "none" : "translateY(20px)")};

  @media screen and (max-height: 670px) {
    transform: ${(props) => (props.$isAside ? "none" : "translateY(150px)")};
  }

  @media screen and (max-height: 670px) {
    transform: ${(props) => (props.$isAside ? "none" : "translateY(20px)")};
  }

  @media screen and (max-width: 520px) {
    height: ${(props) => (props.$isAside ? "70vh" : "80px")};
    transform: ${(props) => (props.$isAside ? "none" : "translateY(80px)")};
  }
`;

function GoogleAdsense({
  className,
  client,
  slot,
  format,
  responsive,
  $isAside,
}: IGoogleAdsense) {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      console.log("Advertise is pushed");
    } catch (e) {
      if (process.env.NODE_ENV !== "production") {
        console.error("AdvertiseError", e);
      }
    }
  }, []);

  if (process.env.NODE_ENV !== "production") {
    return (
      <TestDiv
        style={{
          backgroundColor: "yellow",
        }}
        $isAside={$isAside}
      >
        광고 표시 영역
      </TestDiv>
    );
  }

  return (
    <Ins
      className={className}
      data-ad-client={client}
      data-ad-slot={slot}
      data-ad-format={format}
      data-full-width-responsive={responsive}
      $isAside={$isAside}
    />
  );
}

export default GoogleAdsense;
