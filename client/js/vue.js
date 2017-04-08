var app = new Vue({
    el: '#app',
    data:{
      items:[]
    },
    mounted(){
      this.loaddata() //method1 will execute at pageload
    },
    methods: {
        fblogin: function() {
            FB.login(function(response) {
                if (response.authResponse) {
                    app.getfb();
                }
            }, {
                scope: 'publish_actions,email,public_profile'
            });
        },
        getfb: function() {
            FB.api('/me', {
                fields: "name,email,gender"
            }, function(response) {
                console.log(response);
                axios.post('http://localhost:3000/api/login', {
                        username:response.name,
                        facebookid: response.id,
                        gender:response.gender,
                        email:response.email
                    })
                    .then(function(response) {
                        localStorage.setItem(response.data);
                    })
                    .catch(function(error) {
                        console.log(error);
                    });

            });
        },
        fblogout: function() {
            FB.logout(function(response) {
                window.location.reload()
                console.log(response);
            });
        },
        loaddata:function(){
          let thisapp=this;
          let loaddata1= new Promise (function(res,rej){
            axios.get('http://localhost:3000/api/item')
            .then(function(data){
              //console.log(data);
              res(data);
            })
            .catch(function(err) {
            rej(err)
            })
          });
          loaddata1.then(function(data){
            thisapp.items=data.data;
          })
        },
        cek:function(){
          console.log(this.items);
        }
    }


})
