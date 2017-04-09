var app = new Vue({
    el: '#app',
    data: {
        items: [],
        carts: [],
        item: {}
    },
    mounted() {
        this.loaddata() //method1 will execute at pageload
    },
    computed: {
        total: function() {
            let total = 0
            for (var i = 0; i < this.carts.length; i++) {
                total += Number(this.carts[i].price)
            }
            return total
        }
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
                //console.log(response);
                axios.post('http://localhost:3000/api/login', {
                        username: response.name,
                        facebookid: response.id,
                        gender: response.gender,
                        email: response.email
                    })
                    .then(function(response) { //console.log(response);
                        localStorage.setItem('token', response.data);
                        //console.log(localStorage);
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
        loaddata: function() {
            let thisapp = this;
            let loaddata1 = new Promise(function(res, rej) {
                axios.get('http://localhost:3000/api/item')
                    .then(function(data) {
                        res(data);
                    })
                    .catch(function(err) {
                        rej(err)
                    })
            });
            loaddata1.then(function(data) {
                thisapp.items = data.data;
            })
        },
        cek: function() {
            console.log(this.cart);
        },
        addtocart: function(item) {
            this.carts.push(item)
        },
        checkout: function() {
          let thisapp=this;
            axios.post('http://localhost:3000/api/checkout', {
                    data:thisapp.carts
                },{
                  headers:{
                    token:localStorage.getItem('token')
                  }
                })
                .then(function(response) {
                    console.log(response);
                })
                .catch(function(error) {
                    console.log(error);
                });
        }
    }


})
