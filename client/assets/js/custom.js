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
    appId      : '1671060306528826',
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
    console.log(app.statusLogin);
    console.log('please login');
    // fbLogin();
    // The person is not logged into your app or we are unable to tell.
    // document.getElementById('status').innerHTML = 'Please log ' +
    //   'into this app.';
  }
}

function testAPI() {
  console.log('Welcome!  Fetching your information.... ');
  FB.api('/me',{fields: 'name, email, link, picture.type(large) ,gender'}, function(response) {
    console.log(response);
    app.datauser = response
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

  FB.getLoginStatus(function(response) {
    if (response.status === 'connected') {
      // the user is logged in and has authenticated your
      // app, and response.authResponse supplies
      // the user's ID, a valid access token, a signed
      // request, and the time the access token
      // and signed request each expire
      var uid = response.authResponse.userID;
      var accessToken = response.authResponse.accessToken;

      FB.api('/'+uid+'/permissions', 'delete', function(response){
        localStorage.removeItem('token');
        window.location.reload();
      });

    } else if (response.status === 'not_authorized') {
      // the user is logged in to Facebook,
      // but has not authenticated your app
    } else {
      // the user isn't logged in to Facebook.
    }
   });
  // FB.logout(function(response) {
  //  // Person is now logged out
  //  FB.Auth.setAuthResponse(null, 'unknown');
  //  console.log(response);
  //  localStorage.removeItem('token');
  //  window.location.reload();
  // });
}

var app = new Vue({
  el: '#app',
  data: {
    datauser: null,
    statusLogin: false,
    showCart: false,
    products: [],
    itemList: [],
    counter: 0,
    subtotal:0,
    statusTransaksi: ''
  },
  methods: {
    addCart: function(barang) {
      this.itemList.push(barang);
      this.counter += 1;
      this.subtotal +=  +(barang.price);
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
    },
    checkout: function(){
      let newList = this.itemList.map(function(item) {
        return item._id
      })
      let checkoutData = {
        listItem: newList,
        subtotal: this.subtotal,
        iduser: this.datauser.id
      }
      axios.post('http://localhost:3000/transactions',checkoutData)
           .then(function(res) {
             app.statusTransaksi = res.data

           })
           .catch(function(err) {
             app.statusTransaksi = err.message
           })

    }
  },
  mounted: function(){
    // console.log(this.status);
    this.getData();
    this.getToken();
  }

})