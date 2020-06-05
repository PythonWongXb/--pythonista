/*
 * @Author: your name
 * @Date: 2020-06-05 09:09:41
 * @LastEditTime: 2020-06-05 21:11:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /购物车（源代码）ok/js/cart.js
 */

window.onload = function () {

  var tables = document.getElementsByTagName('tbody')[0]
  var tr = tables.getElementsByTagName('tr')
  var all_check = document.getElementsByClassName('check_all')
  var checkInputs = document.getElementsByClassName('check')
  var in_cart = document.getElementsByClassName('in_cart')[0]
  var selectlist = document.getElementsByClassName('select_list')[0]



  // this.console.log(select_list)

  // console.log(checkInputs.length)
  for (i = 0; i < checkInputs.length; i++) {
    checkInputs[i].onclick = function () {
        if (this.className == 'check check_all') {
          for (j = 0; j < checkInputs.length; j++) {
            checkInputs[j].checked = this.checked
          }
        }

        if (!this.checked) {
          for (k = 0; k < all_check.length; k++) {
            all_check[k].checked = false
          }
        }




        getTotal()
    }
    // 清除合计与结算
    function clear() {
      document.getElementsByClassName('total_money')[0].innerHTML = 0
      document.getElementsByClassName('total_num')[0].innerHTML = 0
    }


    function getTotal() {
      // 清除所有展示图片
      del_all()

      var price = 0
      var num = 0

      for (i = 0; i < tr.length; i++){
        if (tr[i].getElementsByTagName('input')[0].checked) {
          // console.log(tr[i])
          num += parseInt(tr[i].getElementsByTagName('input')[1].value)
          price += parseFloat(tr[i].getElementsByClassName('sum_m')[0].innerHTML)
          // console.log(tr[i].getElementsByClassName('sum_m')[0].innerHTML)


          add_child(tr[i], i)
        }



      }
      document.getElementsByClassName('total_money')[0].innerHTML = price.toFixed(2)
      document.getElementsByClassName('total_num')[0].innerHTML = num
      if (num == 0) {

        document.getElementsByClassName('select_list')[0].className = 'select_list'
      }

    }

    function add_child(ele, i) {
      var div = document.createElement('div')
      var img = document.createElement('img')
      var span = document.createElement('span')

      img.src = ele.getElementsByTagName('img')[0].src
      span.innerHTML = '取消选择'
      span.setAttribute('index', i)
      span.className = 'cancel'

      div.appendChild(img)
      div.appendChild(span)
      console.log(div)
      document.getElementsByClassName('select_list')[0].appendChild(div)
    }


    function del_all() {
      var all_divs = document.getElementsByClassName('select_list')[0]
      var n = all_divs.childNodes.length
      // console.log(n)
      if (n > 0) {
        for (i = 0; i < n; i++) {
          all_divs.removeChild(all_divs.childNodes[0])
        }
      }

    }



  }

  in_cart.onclick = function (e) {
    if (document.getElementsByClassName('select_list')[0].className == 'select_list' && document.getElementsByClassName('total_num')[0].innerHTML != 0) {
      document.getElementsByClassName('select_list')[0].className = 'select_list show'
    }
  }


  // 以下的判断已经写好，取消展示图片的时候只需要对接选择框的取消选择
  // 非常关键！！！
  // 事件代理1 - 取消选择的显示框
  selectlist.onclick = function (e) {
    el = e.srcElement
    if (el.className == 'cancel') {
      var index = el.getAttribute('index')
      var input = tr[index].getElementsByTagName('input')[0]
      input.checked = false
      getTotal()
      input.onclick()
    }
  }



  // 事件代理2 - 数量加减

  for (i = 0; i < tr.length; i++){
    tr[i].onclick = function (e) {
      var number = parseInt(this.getElementsByTagName('input')[1].value)
      // console.log(number)
      el = e.srcElement
      // console.log(number)
      if (isNaN(number) || number < 1) {
        number = 1

      }

      if (el.className == 'minus') {
        number--
      }
      if (el.className == 'plus') {
        number++
      }
      this.getElementsByTagName('input')[1].value = number
      var sum = parseFloat(this.getElementsByClassName('single_m')[0].innerHTML)
      var total = sum * number
      this.getElementsByClassName('sum_m')[0].innerHTML = total.toFixed(2)
      // console.log(to)


      if (el.className == 'd') {
        var conf = confirm('删除此行吗？')
        if (conf) {
          this.parentNode.removeChild(this)
        }
      }
      getTotal()
    }
  }


  var del = document.getElementsByClassName('del_many')[0]
  del.onclick = function () {
    for (i = 0; i < tr.length; i++){
      if (tr[i].getElementsByTagName('input')[0].checked) {
        tr[i].parentNode.removeChild(tr[i])
        i--
      }

    }
    getTotal()
  }

}
