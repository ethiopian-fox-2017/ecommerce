var input = new Vue({
  el:'#input',
  data:{
    item_id:'',
    picture_url:'',
    name:'',
    desc:'',
    stock:0
  },
  methods:{
    senddata:function(){
      axios.post('http://localhost:3000/api/item', {
              name:input.name,
              item_id: input.item_id,
              picture_url:input.picture_url,
              desc:input.desc,
              stock:input.stock
          })
          .then(function(response) {
             alert('insert data succes')
              //console.log('insert data succes' + response);
          })
          .catch(function(error) {
            alert(error)
          });

      console.log(name);
    }
  }
})
