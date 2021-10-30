   //防抖函數
   export function debounce(fun, delay = 150) {
       let timer = null;
       
       return function (...args) {

           timer && clearTimeout(timer);

           timer = setTimeout(() => {
               fun.apply(this, args);
           }, delay);

       };
   }