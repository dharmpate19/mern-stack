import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export function findMatchingDeliveryOption(cartItem) {
    //To store matching delivery otpion
    let matchingDeliveryOption;
      //To display delivery messages
      deliveryOptions.forEach((deliveryOption) => {
        if(deliveryOption.id === cartItem.deliveryOptionId){
        matchingDeliveryOption = deliveryOption
        }
      })

      return matchingDeliveryOption
}

export function calculateDeliveryDate(matchingDeliveryOption) {

         let deliveryDays = matchingDeliveryOption.deliveryDays;
          let deliveryDate = dayjs();

         while(deliveryDays > 0){
            deliveryDate = deliveryDate.add(1, 'days');
            if(deliveryDate.format('dddd') !== 'Saturday' && deliveryDate.format('dddd') !== 'Sunday'){
                deliveryDays--;
            }
         }
    
         

          return deliveryDate.format('dddd, MMMM D');;
}

// export function calculateDeliveryDate(matchingDeliveryOption) {

//     let deliveryDate = matchingDeliveryOption.deliveryDays

//     let date = dayjs();

//     while(deliveryDate > 0){
//         date = date.add(1, 'days');

//         if(date.format('dddd') === 'Saturday' || date.format('dddd') === 'Sunday'){
//             deliveryDate = deliveryDate;
//         }else{
//             deliveryDate--;
//         }
//     }

//     return date.format('MMMM, dddd D')
// }

export const deliveryOptions = [{
    id : '1',
    deliveryDays : 7,
    priceCents : 0
} , {
    id : '2',
    deliveryDays : 5,
    priceCents : 499
} , {
    id : '3',
    deliveryDays : 1,
    priceCents : 999
}]