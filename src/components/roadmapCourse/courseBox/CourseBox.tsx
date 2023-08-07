import {
  CourseActions,
  CourseLikeBtn,
  CourseLikeLabel,
  CourseLikeSvg,
  CourseLikeWrapper,
  CourseLogo,
  CourseLogoWrapper,
  CourseThumbnail,
  CourseThumbnailWrapper,
  CourseTitle,
  CourseTitleWrapper,
  CourseWrapper,
} from "./styles";

function CourseBox() {
  return (
    <CourseWrapper>
      <CourseThumbnailWrapper>
        <CourseThumbnail
          src="https://media.istockphoto.com/id/1046046242/ko/%EC%82%AC%EC%A7%84/%EC%9D%B4%EC%A7%84%EB%B2%95-%EB%B0%B0%EA%B2%BD%EA%B8%B0%EC%88%A0.webp?b=1&s=612x612&w=0&k=20&c=29LE-XvwrK8OQKqNZU13mJigUp6CCGqfT9eKWmkLra0="
          alt="example"
        />
      </CourseThumbnailWrapper>
      <CourseTitleWrapper>
        <CourseLogoWrapper>
          <CourseLogo
            xmlns="http://www.w3.org/2000/svg"
            height="1em"
            viewBox="0 0 576 512"
          >
            {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
            <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
          </CourseLogo>
        </CourseLogoWrapper>
        <CourseTitle>함수형 프로그래밍과 Javascript 문법</CourseTitle>
      </CourseTitleWrapper>
      <CourseActions>
        <CourseLikeWrapper>
          <CourseLikeBtn>
            <CourseLikeSvg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              {/* <!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --> */}
              <path d="M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z" />
            </CourseLikeSvg>
          </CourseLikeBtn>
          <CourseLikeLabel>123</CourseLikeLabel>
        </CourseLikeWrapper>
      </CourseActions>
    </CourseWrapper>
  );
}

export default CourseBox;
