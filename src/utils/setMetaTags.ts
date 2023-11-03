interface ISetMetaTags {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
}

function setMetaTags({
  title = "DEVRIDGE - 개발자 취업 중심 로드맵 서비스",
  description = "개발자가 원하는 회사에 취업하기 위한 다리를 놓아주는 서비스입니다. 채용 정보를 기반으로 한 개발 학습 로드맵을 만나보세요.",
  ogTitle = "DEVRIDGE",
  ogDescription = "개발자 취업 중심 로드맵 서비스",
}: ISetMetaTags) {
  document.querySelector("title")!.innerHTML = title;
  document.querySelector('meta[name="description"]')!.innerHTML = description;
  document
    .querySelector('meta[property="og:title"]')
    ?.setAttribute("content", ogTitle);
  document
    .querySelector('meta[property="og:description"]')
    ?.setAttribute("content", ogDescription);
}

export default setMetaTags;
