// window.onload = function() {
//   // document.getElementById('display-cart').style.display = "none";
//   // document.getElementById('cart').onclick = function(){
//   //   document.getElementById('display-cart').style.display = "";
//   // };
//
//
// }


window.fbAsyncInit = function() {
  FB.init({
    appId      : '1875080789436793',
    cookie     : true,
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });


};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));


function fbLogin() {
  FB.login(function(){
    window.location.reload();
  }, {scope: 'public_profile'});
  //

}

function checkLoginState() {
  FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
  });
}

function statusChangeCallback(response) {
  console.log('statusChangeCallback');
  console.log(response);
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === 'connected') {
    // Logged into your app and Facebook.
    testAPI();
  } else {
    console.log('please login');
    // fbLogin();
    // The person is not logged into your app or we are unable to tell.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
  }
}

function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me', function(response) {
    console.log('Successful login for: ' + response.name);
    axios.post('http://localhost:3000/customers',response)
         .then(function(res) {
           localStorage.setItem("token", res.data);
          //  console.log(res.data);
         })
         .catch(function(err) {
           console.log(err);
         })
    // document.getElementById('status').innerHTML =
    //   'Thanks for logging in, ' + response.name + '!';
  });
}


function clearLocalStorage() {
  FB.logout(function(response) {
   // Person is now logged out
   console.log(response);
   localStorage.removeItem('token');
   window.location.reload();
  });
}

var app = new Vue({
  el: '#app',
  data: {
    statusLogin: '',
    showCart: false,
    products: [],
    itemList: [],
    counter: 0
  },
  methods: {
    addCart: function(barang) {
      this.itemList.push(barang);
      this.counter += 1;
    },
    toggleCart: function() {
      this.showCart = !this.showCart
    },
    getData: function(){
      axios.get('http://localhost:3000/products')
      .then(function (response) {
        app.products = response.data
      })
      .catch(function (error) {
        console.log(error);
      });

    },
    getToken: function(){
      if(localStorage.getItem('token')){
        this.statusLogin = true
        // window.location.reload();
      } else {
        this.statusLogin = false
      }

      // console.log(status);
    }
  },
  mounted: function(){
    // console.log(this.status);
    this.getToken();
    this.getData();
  }

})