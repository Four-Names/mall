import Vue from 'vue'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(Element)

Vue.prototype.$message = function (msg) {
    Element.Message({
        message: msg,
        duration: 1000,
        center: true,
        offset: 0,
        showClose: true,
    })
}

Vue.prototype.$message.success = function (msg) {
    Element.Message.success({
        message: msg,
        duration: 1000,
        center: true,
        offset: 0,
        showClose: true,
    })
}


Vue.prototype.$message.warning = function (msg) {
    Element.Message.warning({
        message: msg,
        duration: 1000,
        center: true,
        offset: 0,
        showClose: true,
    })
}


Vue.prototype.$message.error = function (msg) {
    Element.Message.error({
        message: msg,
        duration: 1000,
        center: true,
        offset: 0,
        showClose: true,
    })
}



Vue.prototype.$confirm = function (...msg) {
    let {
        cancelButtonText,
        confirmButtonText,
        type,
    } = msg[2]
    return Element.MessageBox.confirm(msg[0], msg[1],{
        cancelButtonText,
        confirmButtonText,
        type,
        center: true,
    })
}