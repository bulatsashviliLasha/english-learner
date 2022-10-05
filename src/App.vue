<script setup>
import {onMounted, reactive, ref, watch, computed} from "vue";
import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

const notyf = new Notyf();

const getImg = (name) => { return new URL(`./assets/img/${name}.jpg`, import.meta.url).href};

const inputValue = ref('');
const stableWords = [
  {
    id: 1,
    english: 'hello',
    georgian: 'გამარჯობა',
    imgURL: 'hello'
  }, {
    id: 2,
    english: 'house',
    georgian: 'სახლი',
    imgURL: 'house'
  }, {
    id: 3,
    english: 'dog',
    georgian: 'ძაღლი',
    imgURL: 'dog'
  }, {
    id: 4,
    english: 'apple',
    georgian: 'ვაშლი',
    imgURL: 'apple'
  },
  {
    id: 5,
    english: 'tree',
    georgian: 'ხე',
    imgURL: 'tree'
  }, {
    id: 6,
    english: 'ice',
    georgian: 'ყინული',
    imgURL: 'ice'
  }, {
    id: 7,
    english: 'fire',
    georgian: 'ცეცხლი',
    imgURL: 'fire'
  }, {
    id: 8,
    english: 'water',
    georgian: 'წყალი',
    imgURL: 'water'
  }, {
    id: 9,
    english: 'lion',
    georgian: 'ლომი',
    imgURL: 'lion'
  }, {
    id: 10,
    english: 'book',
    georgian: 'წიგნი',
    imgURL: 'book'
  }, {
    id: 11,
    english: 'earth',
    georgian: 'დედამიწა',
    imgURL: 'earth'
  }, {
    id: 12,
    english: 'speed',
    georgian: 'სიჩქარე',
    imgURL: 'speedLimit'
  },
  {
    id: 13,
    english: 'happiness',
    georgian: 'სიხარული',
    imgURL: 'happy'
  }, {
    id: 14,
    english: 'beauty',
    georgian: 'სილამაზე',
    imgURL: 'nice'
  }, {
    id: 15,
    english: 'friend',
    georgian: 'მეგობარი',
    imgURL: 'friend'
  }, {
    id: 16,
    english: 'explosion',
    georgian: 'აფეთქება',
    imgURL: 'explosion'
  }, {
    id: 17,
    english: 'carrot',
    georgian: 'სტაფილო',
    imgURL: 'carrot'
  }, {
    id: 18,
    english: 'car',
    georgian: 'მანქანა',
    imgURL: 'car'
  }, {
    id: 19,
    english: 'soldier',
    georgian: 'ჯარისკაცი',
    imgURL: 'soldier'
  }, {
    id: 20,
    english: 'fear',
    georgian: 'შიში',
    imgURL: 'fear'
  },
];
const words = ref([...stableWords]);
const focusInput = ref(null);

const wordToGuess = ref(null)

const answers = reactive({
  right: [],
  wrong: []
});

const counter = ref(Math.floor(Math.random()*words.value.length));

const clearInputAndFocus = () => {
  inputValue.value = '';
  focusInput.value.focus();
}

const gameRestart = () => {
  words.value = [...stableWords];
  answers.wrong.length = 0;
  answers.right.length = 0;
  inputValue.value = '';
  counter.value = Math.floor(Math.random()*stableWords.length);
}

const separate = () => {
  if (answers.right.length !== 19) {
    if (inputValue.value.toLocaleLowerCase().trim() === words.value[counter.value].english) {
      answers.right.push(words.value[counter.value]);
      words.value = words.value.filter(item => item !== words.value[counter.value]);
      notyf.success('ყოჩაღ, პასუხი სწორია!');
      clearInputAndFocus();
    } else if(inputValue.value === ''){
      notyf.error('შეიყვანე სიტყვა!');
    } else {
      answers.wrong.push(words.value[counter.value])
      notyf.error('არასწორია პასუხი!');

      clearInputAndFocus();
    }
    counter.value = Math.floor(Math.random()*words.value.length);

  }else{
    gameRestart();
    notyf.success("გილოცავ , კიდევ სცადე!");
  }
  if(answers.wrong.length === 20){
    gameRestart();
    notyf.error("ეჰ, თავიდან!");
  }

  speak(words.value[counter.value].english)
};

const speak = (text) => {
    const msg = new SpeechSynthesisUtterance();

    msg.text = text;
    msg.volume = 1;
    msg.rate = 0.6;
    msg.pitch = 2;

    msg.voice = speechSynthesis.getVoices().filter(voice => voice.name == "Microsoft Zira - English (United States)")[0];

    window.speechSynthesis.speak(msg);

}

onMounted(()=>{

})
</script>

<template>
  <main class="bg-[#FF6700] flex flex-col items-center pb-[81px] px-[50px] sm:px-[16px]">

    <div class=" my-[20px] lg:scale-[0.7] md:mt-[43px] md:mb-[30px]">
      <h1 class="text-[35px] text-white">English Learner</h1>
    </div>

    <div class="wrapper sm:px-[20px] md:py-[20px] lg:pt-[50px]  lg:pb-[33px] bg-white pt-[25px] pb-[50px] max-w-[1280px] w-full relative rounded-[10px] flex flex-col items-center">
      <img class="main-img sm:h-[205px] lg:max-w-[400px] lg:h-[265px] sm:order-2 rounded-[10px] w-full h-[464px] max-w-[700px] object-cover"
           :src="getImg(words[counter].imgURL)"
           :alt="words[counter].english"/>

      <div class="answer flex gap-2 lg:text-[20px] sm:text-[16px] sm:order-3 mb-[25px] lg:my-[20px] font-semibold leading-7  text-[24px] text-[#222222]">
        <span ref="wordToGuess">{{ words[counter].georgian }}</span>
        <svg class="cursor-pointer" @click="speak(words[counter].english)"  id="Uploaded to svgrepo.com" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
               width="32px" height="32px" viewBox="0 0 32 32" style="enable-background:new 0 0 32 32;" xml:space="preserve">
<path class="linesandangles_een" d="M4,11v10h5l10,6V5L9,11H4z M17,8.532v14.935L9.554,19H6v-6h3.554L17,8.532z M21.657,21.657
	l-1.414-1.414c2.339-2.34,2.339-6.146,0-8.486l1.414-1.414C24.775,13.462,24.775,18.538,21.657,21.657z M24.485,24.485l-1.414-1.414
	c3.899-3.899,3.899-10.243,0-14.143l1.414-1.414C29.164,12.193,29.164,19.807,24.485,24.485z"/>
</svg>
      </div>
      <input
          @keyup.enter="separate"
          v-model="inputValue"
          ref="focusInput"
          class="outline-none border-solid border border-black sm:order-4 sm:h-[36px] sm:mb-[30px] md:w-[208px] lg:w-[500px] lg:h-[40px] w-[700px] h-[50px] pl-1 mb-[15px] rounded-[10px]"
          type="text"
          placeholder="ჩაწერე სიტყვა"
          autofocus
      >
      <button
          @click="separate"
          class="sm:order-5 sm:px-[72px] sm:py-[10px] sm:mb-0 lg:text-[20px] sm:text-[16px] lg:px-[85px] lg:py-[14px] bg-[#FF6700] font-black leading-7  text-[24px] py-[16px] px-[115px] rounded-[10px] text-white cursor-pointer mb-[25px]">შემოწმება
      </button>

      <div class="sm:mb-[20px] sm:gap-0 sm:w-full sm:justify-between sm:order-1 flex gap-[239px] lg:gap-[175px] sm:gap-[149px]">
        <div class="flex gap-[10px] items-center">
          <img class="w-[24px] h-[24px]" src="./assets/like.png" alt="like">
          <div class="text-[#FF6700] text-[20px] font-light lg:text-[16px]"> {{ answers.right.length }} / 20</div>
        </div>
        <div class="flex gap-[10px] items-center">
          <img class="w-[24px] h-[24px]" src="./assets/dislike.png" alt="dislike">
          <div class="text-[#FF6700] text-[20px] font-light lg:text-[16px]">{{ answers.wrong.length }} / 20</div>
        </div>
      </div>
    </div>

  </main>
</template>

<style>
.wrapper{
  box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.16);
}
.circle{
  width: 739.16px;
  height: 465.13px;
  left: 111px;
  top: 109px;
}
.answer{

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

}

.main-img{
  filter: drop-shadow(-6px 6px 10px rgba(255, 103, 0, 0.12));
}
@media only screen and (max-width: 1280px) {
  .circle {
    top: 28px;
    scale: 1.12;
    left: 135px;
  }
}
</style>
