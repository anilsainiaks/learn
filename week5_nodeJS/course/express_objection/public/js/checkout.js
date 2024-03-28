const stripe = Stripe('pk_test_51OzCkBSBx2YpACrtgzYwGI1NAblVgJAHtfrldI0cIx4KOb3adkikHuONZJ4XPZrduGTRROlHxh2jD7Vx8iLoWPE8004GiDFB0u');

const orderButton = document.getElementById('orderButton');

orderButton.addEventListener('click',function(){
    stripe.redirectToCheckout({
        sessionId:'<%= sessionId %>'
    })
})