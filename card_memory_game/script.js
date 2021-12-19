const ulCards = document.querySelector('.ul-cards');
const cards = document.querySelectorAll('.li-card');
const congrat = document.querySelector('.cont-congrat');
const replayBtn = document.querySelector('.btn-replay');

const cardIdx = [1, 2, 3, 4, 5, 1, 2, 3, 4, 5];
let preSelectIdx = undefined;
let currSelectIdx = undefined;
let preSelectCard = undefined;
let matchingPairCnt = 0;

cards.forEach((card, i) => {
  card.addEventListener('click', cardClickHandler, true);
});

replayBtn.addEventListener('click', function () {
  document.location.reload();
});


function cardClickHandler(e) {
  const card = e.target;

  // 카드가 뒷면인 경우에만 이벤트 리스너가 발동
  if (!card.classList.contains('on')) {
    const idx = getIndex(card);

    // 하나만 선택 되면
    // pre의 인덱스 업데이트
    // 둘 다 선택 되면
    // curr 인덱스 업데이트
    // 둘 다 이미 있다?
    // curr에 존재 하던거 지우고
    // pre 업데이트
    if (preSelectIdx && currSelectIdx) {
      preSelectIdx = cardIdx[idx];
      preSelectCard = card;
      currSelectIdx = undefined;
    } else if (preSelectIdx && !currSelectIdx) {
      currSelectIdx = cardIdx[idx];
    } else if (!preSelectCard) {
      preSelectIdx = cardIdx[idx];
      preSelectCard = card;
    }


    // 카드를 앞면으로 교체
    card.style.backgroundImage = `url(./images/card_${cardIdx[idx]}.png)`;
    card.classList.add('on');

    // 선택된 2개의 카드가 같은 카드인지 확인
    if (preSelectIdx && currSelectIdx) {
      if (preSelectIdx === currSelectIdx) {
        setTimeout(function () {
          // card.style.backgroundImage = 'none';
          // preSelectCard.style.backgroundImage = 'none';

          preSelectCard.removeEventListener('click', cardClickHandler, true);
          card.removeEventListener('click', cardClickHandler, true);
          
          preSelectCard = undefined;
          preSelectIdx = undefined;
          currSelectIdx = undefined;

          matchingPairCnt += 1;

          if (cardIdx.length / 2 === matchingPairCnt) {
            congrat.classList.add('on');
            ulCards.classList.add('off');
          }
        }, 500);
      } else {
        setTimeout(function () {
          card.style.backgroundImage = "url('./images/card_back.png')";
          preSelectCard.style.backgroundImage = "url('./images/card_back.png')";

          card.classList.remove('on');
          preSelectCard.classList.remove('on');

          preSelectCard = undefined;
          preSelectIdx = undefined;
          currSelectIdx = undefined;
        }, 800);
      }
    }
  }

}


function getIndex(elem) {
  let idx = undefined;
  const siblings = elem.parentElement.children;
  for (let i = 0; i < siblings.length; i++) {
    if (siblings[i] === elem) {
      idx = i;
      break;
    }
  }

  return idx;
}