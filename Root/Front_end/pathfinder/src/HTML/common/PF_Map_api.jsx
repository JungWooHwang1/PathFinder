import { useEffect } from "react";

const PF_Map_api = () => {
  // 스크립트 파일 읽어오기
  const new_script = (src) => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.addEventListener("load", () => {
        resolve();
      });
      script.addEventListener("error", (e) => {
        reject(e);
      });
      document.head.appendChild(script);
    });
  };

  useEffect(() => {
    // 카카오맵 스크립트 읽어오기
    const my_script = new_script(
      "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c4a41bf411d48221a36238c0e2fab540"
    );

    // 스크립트 읽기 완료 후 카카오맵 설정
    my_script.then(() => {
      console.log("script loaded!!!");
      const kakao = window["kakao"];
      kakao.maps.load(() => {
        const mapContainer = document.getElementById("map");
        const options = {
          center: new kakao.maps.LatLng(37.40410395971753, 126.93064874219576), // 좌표 설정
          level: 3,
        };
        const map = new kakao.maps.Map(mapContainer, options); // 지도 생성

        // 마커 생성
        const marker = new kakao.maps.Marker({
          position: map.getCenter(), // 지도 중심 좌표에 마커 생성
        });
        marker.setMap(map);

        // 클릭 이벤트 등록
        kakao.maps.event.addListener(map, "click", function (mouseEvent) {
          // 클릭한 위도, 경도 정보를 가져옴
          const latlng = mouseEvent.latLng;

          // 마커 위치를 클릭한 위치로 옮김
          marker.setPosition(latlng);
        });
      });
    });
  }, []);
};

export default PF_Map_api;

//변경전 api코드
/*
const new_script = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = src;
    script.addEventListener("load", () => {
      resolve();
    });
    script.addEventListener("error", (e) => {
      reject(e);
    });
    document.head.appendChild(script);
  });
};

useEffect(() => {
  //카카오맵 스크립트 읽어오기
  const my_script = new_script(
    "https://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=c4a41bf411d48221a36238c0e2fab540"
  );

  //스크립트 읽기 완료 후 카카오맵 설정
  my_script.then(() => {
    console.log("script loaded!!!");
    const kakao = window["kakao"];
    kakao.maps.load(() => {
      const mapContainer = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.56000302825312, 126.97540593203321), //좌표설정
        level: 3,
      };
      const map = new kakao.maps.Map(mapContainer, options); //맵생성
      //마커설정
      const markerPosition = new kakao.maps.LatLng(
        37.56000302825312,
        126.97540593203321
      );
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });
      marker.setMap(map);
    });
  });
}, []);*/
