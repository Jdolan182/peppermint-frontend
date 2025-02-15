import { defineStore } from 'pinia'
import { useAxios } from "@/composables/request.js";

export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      //background colour
      bgColour:     localStorage.getItem("bgColour") ?? 'bg-gray-900',
      bgTextColour: localStorage.getItem("bgTextColour") ?? 'text-gray-900',
      //second bg colour
      secondBgColour:      localStorage.getItem("secondBgColour") ?? 'bg-gray-800',
      secondBgHoverColour: localStorage.getItem("secondBgHoverColour") ?? 'hover:bg-gray-800',
      secondColour:        localStorage.getItem("secondColour") ?? 'bg-indigo-600',
      secondBgTextColour:  localStorage.getItem("secondBgTextColour") ?? 'border-indigo-600 text-indigo-600',
      secondFocusColour:   localStorage.getItem("secondFocusColour") ?? 'focus:border-indigo-600 focus:ring-indigo-600',
      secondHoverColour:   localStorage.getItem("secondHoverColour") ?? 'hover:bg-indigo-700',
      //text colour
      textColour:        localStorage.getItem("textColour") ?? 'text-white',
      textHoverColour:   localStorage.getItem("textHoverColour") ?? 'hover:text-white',
      textBgHoverColour: localStorage.getItem("textBgHoverColour") ?? 'hover:bg-gray-200',
      //second text colour
      secondTextColour:  localStorage.getItem("secondTextColour") ?? 'text-gray-900',
      secondTextHoverColour: localStorage.getItem("secondTextHoverColour") ?? 'hover:text-gray-200',
      //third text colour
      thirdTextColour: localStorage.getItem("thirdTextColour") ?? 'text-gray-400',
      //button colour
      mainButtonColour:      localStorage.getItem("mainButtonColour") ?? 'bg-white',
      mainButtonHoverColour: localStorage.getItem("mainButtonHoverColour") ?? 'hover:bg-white/70',
    }
  },
  getters: {
    getBgColour: (state)     => state.bgColour,
    getBgTextColour: (state) => state.bgTextColour,
    //
    getSecondBgColour: (state)      => state.secondBgColour,
    getSecondBgHoverColour: (state) => state.secondBgHoverColour,
    getSecondColour: (state)        => state.secondColour,
    getSecondBgTextColour: (state)  => state.secondBgTextColour,
    getSecondFocusColour: (state)   => state.secondFocusColour,
    getSecondHoverColour: (state)   => state.secondHoverColour,
    //
    getTextColour: (state)      => state.textColour,
    getTextHoverColour: (state) => state.textHoverColour,
    getTextBgHoverColour: (state) => state.textBgHoverColour,
    //
    getSecondTextColour: (state) => state.secondTextColour,
    getSecondTextHoverColour: (state)    => state.secondTextHoverColour,
    //
    getThirdTextColour: (state)      => state.thirdTextColour,
    //
    getMainButtonColour: (state)      => state.mainButtonColour,
    getMainButtonHoverColour: (state) => state.mainButtonHoverColour,

  }, 
  actions: {
    async setTheme() {

        const res = await useAxios.get('api/theme/getTheme')
        let data = res.data.data
    
        this.bgColour     = data.bgColour;
        this.bgTextColour = data.bgTextColour;
        localStorage.setItem("bgColour", data.bgColour);
        localStorage.setItem("bgTextColour", data.bgTextColour);
        //
        this.secondBgColour      = data.secondBgColour;
        this.secondBgHoverColour = data.secondBgHoverColour;
        this.secondColour        = data.secondColour;
        this.secondBgTextColour  = data.secondBgTextColour;
        this.secondFocusColour   = data.secondFocusColour;
        this.secondHoverColour   = data.secondHoverColour;
        localStorage.setItem("secondBgColour", data.secondBgColour);
        localStorage.setItem("secondBgHoverColour", data.secondBgHoverColour);
        localStorage.setItem("secondColour", data.secondColour);
        localStorage.setItem("secondBgTextColour", data.secondBgTextColour);
        localStorage.setItem("secondFocusColour", data.secondFocusColour);
        localStorage.setItem("secondHoverColour", data.secondHoverColour);
        //
        this.textColour      = data.textColour;
        this.textHoverColour = data.textHoverColour;
        this.textBgHoverColour = data.textBgHoverColour;
        localStorage.setItem("textColour", data.textColour);
        localStorage.setItem("textHoverColour", data.textHoverColour);
        localStorage.setItem("textBgHoverColour", data.textBgHoverColour);
        //
        this.secondTextColour = data.secondTextColour;
        this.secondTextHoverColour = data.secondTextHoverColour;
        localStorage.setItem("secondTextColour", data.secondTextColour);
        localStorage.setItem("secondTextHoverColour", data.secondTextHoverColour);
        //
        this.thirdTextColour   = data.thirdTextColour;
        localStorage.setItem("thirdTextColour", data.thirdTextColour);
        //
        this.mainButtonColour      = data.mainButtonColour;
        this.mainButtonHoverColour = data.mainButtonHoverColour;
        localStorage.setItem("mainButtonColour", data.mainButtonColour);
        localStorage.setItem("mainButtonHoverColour", data.mainButtonHoverColour);
    },
  }
})