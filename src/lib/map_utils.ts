import { ReverseGeocodeAddress } from '@api/naver_map';

export const makeAddress = (item: ReverseGeocodeAddress) => {
  if (!item) {
    return;
  }

  let name = item.name,
    region = item.region,
    land = item.land,
    isRoadAddress = name === 'roadaddr';

  let sido = '', sigugun = '', dongmyun = '', ri = '', rest = '';


  sido = region.area1.name || '';

  sigugun = region.area2.name || '';

  dongmyun = region.area3?.name || '';

  ri = region.area4?.name || '';

  if (land) {
    console.log(land);
    if (land.number1) {
      if (land.type && land.type === '2') {
        rest += '산';
      }

      rest += land.number1;

      if (land.number2) {
        rest += ('-' + land.number2);
      }
    }

    if (isRoadAddress) {
      if (checkLastString(dongmyun, '면')) {
        ri = land.name || '';
      } else {
        dongmyun = land.name || '';
        ri = '';
      }

      if (hasAddition(land.addition0)) {
        rest += ' ' + land.addition0.value;
      }
    }
  }
  // TODO: 시, 군, 구 따로 내려주고,
  return [sido, sigugun, dongmyun, ri, rest].join(' ');
};

function checkLastString(word: string, lastString: string) {
  return new RegExp(lastString + '$').test(word);
}

function hasAddition(addition: { value: string }) {
  return !!(addition && addition.value);
}


// infoWindow 띄울떄 아래주석 해제
/**
 // const infoContent = [
 //   '<div style="padding:10px;min-width:200px;line-height:150%;">',
 //   '<h4 style="margin-top:5px;">검색 좌표</h4><br />',
 //   htmlAddresses.join('<br />'),
 //   '</div>',
 // ].join('\n');
 //
 // infoWindow.setContent(infoContent);
 // infoWindow.setOptions({
 //   maxWidth: 140,
 //   backgroundColor: '#eee',
 //   borderColor: '#2db400',
 //   borderWidth: 1,
 //   anchorSize: new naver.maps.Size(10, 10),
 //   anchorSkew: true,
 //   anchorColor: '#eee',
 // });
 // infoWindow.open(map, latlng);

 */