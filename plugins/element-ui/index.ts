import Vue from 'vue'
import {Button, Menu, MenuItem, Row, Col, Header, Footer, Container, Main, Card} from "element-ui"
import locale from 'element-ui/lib/locale'
import en from 'element-ui/lib/locale/lang/en'

// Vue.use(Element, { locale })

locale.use(en)

Vue.use(Button)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Header)
Vue.use(Main)
Vue.use(Footer)
Vue.use(Container)
Vue.use(Row)
Vue.use(Col)
Vue.use(Card)

