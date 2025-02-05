// 1. 네이버 서비스의 상태(Status) 타입 정의
export interface ServiceStatus {
  code: number;    // API 요청 결과 코드 (예: 0은 성공)
  name: string;    // 상태 이름 (예: "OK")
  message: string; // 상태에 대한 설명 메시지
}

export interface ReverseGeocodeResponse {
  status: ServiceStatus; // API 호출 상태 정보
  v2: {
    results: ReverseGeocodeAddress[]; // 주소 정보 배열
    // 필요에 따라 meta 정보나 추가 필드가 있을 수 있음
  };
}

type AddtionType = {
  type: string,
  value: string
}

type AreaType = {
  name: string; // 시,군,구 명
  coords: {
    center: {
      x: number;
      y: number;
    }

  }
}

// 2. 앞서 정의한 역지오코딩 주소 정보 타입
export interface ReverseGeocodeAddress {
  code: {
    id: string;
    type: string; // L: 법정동, A: 행정동, S: 동일법정동
    mappingId: string[];
  };
  region: {
    area0: AreaType
    area1: AreaType
    area2: AreaType
    area3?: AreaType
    area4?: AreaType

  };
  // 지번/도로명주소
  land: {
    addition0: AddtionType
    addition1: AddtionType
    addition2: AddtionType
    addition3?: AddtionType
    addition4?: AddtionType
    coords: {
      center: {
        x: number;
        y: number;
      }
    }
    number1?: string; // 도로명주소, 지번주소 사용 (ex. 257)
    number2?: string; // 도로명주소, 지번주소 사용 (ex.33)
    type?: string; // 지번주소만 사용(지번주소 타입:1)
    name?: string; // 도로명주소만 사용 (ex. 신반포로)
  };
  address: {
    jibunAddress: string;   // 지번 주소
    roadAddress: string;    // 도로명 주소
  };
  name: 'addr' | 'roadaddr';
}