/*
 * @Author: your name
 * @Date: 2020-06-04 14:26:19
 * @LastEditTime: 2020-06-05 15:37:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /购物车（源代码）ok/js/index.js
 */

window.onload = function () {

  // 获取元素
  var cartTable = document.getElementById('cartTable')

  // 获取所有的tr-所有的行
  var tr = cartTable.children[1].rows
  console.log(tr)
  // 所有选择框，包括全选
  var checkInputs = document.getElementsByClassName('check')

  // 全选框
  var checkAllInputs = document.getElementsByClassName('check-all')

  // 共选了多少件
  var selectedTotal = document.getElementById('selectedTotal')

  // 总价格
  var priceTotal = document.getElementById('priceTotal')

  // 选择的菜单
  var seleted = document.getElementById('selected')

  // foot 选择 向上弹的对话框
  var foot = document.getElementById('foot')


  // 要增加图片和span的那个div
  var selectedViewList = document.getElementById('selectedViewList')

  // 事件
  // 选择框的绑定事件-点击-遍历
  for (i = 0; i < checkInputs.length; i++){
    checkInputs[i].onclick = function (event) {

      console.log(event)

      if (this.className === 'check-all check') {
        for (j = 0; j < checkInputs.length; j++){
          //  this.checked ！= ‘true’
          checkInputs[j].checked = this.checked
        }
      }
      if (!this.checked) {
        for (k = 0; k < checkAllInputs.length; k++){
          checkAllInputs[k].checked = false
        }
      }

      getTotal()
    }
  }

  // 计算总价格
  function getTotal() {
    var seleted = 0
    var price = 0
    var htmlString = ''

    for (i = 0; i < tr.length; i++) {
      if (tr[i].getElementsByTagName('input')[0].checked) {
        tr[i].className = 'on'
        seleted += parseInt(tr[i].getElementsByTagName('input')[1].value)
        price += parseFloat(tr[i].cells[4].innerHTML)
        htmlString += '<div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index = "' + i + '">取消选择</span></div>'

        console.log(price)
      }
      else {
        tr[i].className = ''
      }
    }
    // 赋值
    selectedTotal.innerHTML = seleted
    priceTotal.innerHTML = price.toFixed(2)
    selectedViewList.innerHTML = htmlString

    if (seleted == 0) {
      foot.className = 'foot'
    }
  }

  // 小计
  function getSubTotal(tr) {
    // tr 是列表的一行 的对象
    var tds = tr.cells
    var price = parseFloat(tds[2].innerHTML)
    var count = parseInt(tr.getElementsByTagName('input')[1].value)
    var subTotal = parseFloat(count * price).toFixed(2)
    price = parseFloat(tds[2].innerHTML)
    tds[4].innerHTML = subTotal
  }


  // above 选择功能结束



  //
  seleted.onclick = function () {
    console.log(selectedTotal.innerHTML)
    if (foot.className == 'foot') {
      if (selectedTotal.innerHTML != 0) {
        foot.className = 'foot show'
      }
    }
    else {
      foot.className = 'foot'
    }
  }


  // 事件代理
  selectedViewList.onclick = function (event) {

    var el = event.srcElement
    if (el.className == 'del') {
      var index = el.getAttribute('index')
      var input = tr[index].getElementsByTagName('input')[0]
      input.checked = false
      console.log(input)
      input.onclick()
    }
  }




  // 加减购物车的数量 遍历中有两个事件
  for (i = 0; i < tr.length; i++){
    tr[i].onclick = function (e) {

      // console.log(this)
      // this 就是这个引发或者指向的实例化对象
      // console.log(e)

      var el = e.srcElement
      var cls = el.className

      var input = this.getElementsByTagName('input')[1]
      var val = parseInt(input.value)
      var reduce = this.getElementsByTagName('span')[1]

      // 时间代理与冒泡事件的体现
      // alert('dd')
      switch (cls) {
        case 'add':

          input.value = val + 1
          reduce.innerHTML = '-'

          getSubTotal(this)
          // this 依然是tr 的实例化，而非 case中的对象
          // console.log(this)
          break
        case 'reduce':
          // console.log(this)
          if (val > 1) {
            input.value = val - 1
          }
          if (input.value <= 1) {
            reduce.innerHTML = ''
          }
          getSubTotal(this)
          break
        case 'delete':
          var conf = confirm('确定删除吗？')
          if (conf) {
            this.parentNode.removeChild(this)
          }
          break
      }
    }

    tr[i].getElementsByTagName('input')[1].onkeyup = function () {
      // this指的是input 父类是td 爷是tr 我们必须传入tr
      // getSubTotal(this.parentNode.parentNode)


      var val = parseInt(this.value)
      var tr = this.parentNode.parentNode
      var reduce = tr.getElementsByTagName('span')[1]
      if (isNaN(val) || val < 1) {
        val = 1
      }
      this.value = val
      if (val <= 1) {
        reduce.innerHTML = ''
      }
      else {
        reduce.innerHTML = '-'
      }

      getSubTotal(tr)

      // 每次输入都需要计算一次
      getTotal()
    }
  }



// 全选事件
  deleteAll.onclick = function () {
    if (selectedTotal.innerHTML != '0') {
      var conf = confirm('确定删除全部内容吗？')
      if (conf) {
        for (i = 0; i < tr.length; i++){
          var input = tr[i].getElementsByTagName('input')[0]
          if (input.checked) {
            tr[i].parentNode.removeChild(tr[i])
            i--
          }
        }
      }
    }
    // 计算一下结算部分-修复bug
    getTotal()
  }


  // 默认全选
  checkAllInputs[0].checked = true
  checkAllInputs[0].onclick()

}