export enum MediaType {
  "normal" = "normal",
  "normalReverse" = "normalReverse",
  "rightTop" = "rightTop",
  "rightMid" = "rightMid",
  "rightBot" = "rightBot",
  "leftTop" = "leftTop",
  "leftMid" = "leftMid",
  "leftBot" = "leftBot",
}

export enum SwitchDetail {
  "BLIND" = "BLIND",
  "TECH" = "TECH",
  "COURSE" = "COURSE",
}

export enum LoginErrorMessage {
  "UNMATCHED_EMAIL_AND_PROVIDER" = "unmatched_email_and_provider",
  "UNSUPPORTED_PROVIDER" = "unsupported_provider",
  "SERVER_ERROR" = "server_error",
}

export enum ApiStatus {
  "error" = "error",
  "success" = "success",
}

export enum ApiMessage {
  "roadmap" = "회사, 직무, 서비스에 일치 하는 회사 정보가 없습니다.",
  "course_detail" = "해당하는 세부코스가 없습니다.",
  "login_required" = "Login required",
}

export enum MatchingFlag {
  "YES" = "YES",
  "NO" = "NO",
}

export enum ErrorMessageNewAccessToken {
  "verification" = "Token verification failed",
  "expired" = "Token has expired",
}

export enum StudyStatusMessage {
  "BEFORE_STUDYING" = "BEFORE_STUDYING",
  "STUDYING" = "STUDYING",
  "STUDY_END" = "STUDY_END",
}

export enum UserLike {
  "YES" = "YES",
  "NO" = "NO",
}
