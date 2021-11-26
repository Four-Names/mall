   //防抖函數
   function debounce(fun, delay = 350) {
       let timer = null;

       return function (...args) {

           timer && clearTimeout(timer);

           timer = setTimeout(() => {
               fun.apply(this, args);
           }, delay);

       };
   }

   

   module.exports = {
       debounce,
   }