<template>
    <div class="container">
        <!-- 搜索栏 -->
        <form action="/" class="SearchForm">
            <van-search
            v-model="searchContent"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch(searchContent)"
            @cancel="$router.back()"
            @focus="isResultShow = false"
            @input="searchChange"
            />
        </form>

          <!-- 搜索结果组件 -->
        <SearchResults v-if="isResultShow" :query='searchContent'></SearchResults>

            <!-- 联想建议 -->
        <van-cell-group v-else-if="searchContent">
            <van-cell @click="onSearch(item)" icon="search" v-for="(item,index) in suggestion" :key="index">
                <div slot="title" v-html="highLight(item)">
                    <!-- 高亮显示替换 -->
                </div>
            </van-cell>

            <!-- <van-cell title="单元格" icon="search"/> -->
        </van-cell-group>

        <!-- 历史记录 -->
        <van-cell-group v-else>
            <van-cell title="历史记录">
                <template v-if="isDeleteShow">
                    <span @click="histories = []">全部删除</span>
                    &nbsp; &nbsp;
                    <span @click="isDeleteShow = false">完成</span>
                </template>
                <van-icon name="delete" v-else @click="isDeleteShow = true"></van-icon>
            </van-cell>
            <van-cell @click="onSearch(item)" :title="item" icon="search" v-for="(item,index) in histories" :key="index">
                <van-icon name="close" @click="histories.splice(index,1)"></van-icon>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import SearchResults from './components/searchResult'
import { getSuggestion } from '../../api/search'
import { getItem, setItem } from '../../utils/storage'
import { debounce } from 'lodash'
export default {
  data () {
    return {
      isDeleteShow: false,
      searchContent: '', // 搜索内容
      isResultShow: false,
      suggestion: [], // 接收联想建议列表
      histories: getItem('search-history') || [] // 接收历史记录的列表  如果本地存储有就用本地的 如果没在获取
    }
  },
  watch: {
    // 监视 =====> 持久化
    histories () {
      setItem('search-history', this.histories)
    }
  },
  components: {
    SearchResults
  },
  methods: {

    // 点击联想建议也可以搜索  让输入框内容变一样  然后进行搜索  以优化
    // searchToo (str) {
    //   this.searchContent = str
    //   this.isResultShow = true
    // },
    onSearch (a) {
      // 同样一个方法可以让三个功能使用 因为逻辑是一样的    老高==>重复的事情不做第二次
    // 每次传来的参数是不同的
      this.searchContent = a

      // 判断历史记录有无重复
      const index = this.histories.indexOf(this.searchContent)
      if (index !== -1) {
        // 不等于-1 说明已经找到要删除
        this.histories.splice(index, 1)
      }
      // 最新的放在前面
      this.histories.unshift(this.searchContent)

      // 打开搜索结果
      this.isResultShow = true
    },

    // 联想建议防抖优化方法  根据input内容改变而改变
    searchChange: debounce(async function () {
      const searchText = this.searchContent

      // 先判断不能为空
      if (!searchText) {
        return
      }
      let { data } = await getSuggestion(searchText)
      //   console.log(data)
      this.suggestion = data.data.options
    }, 200),

    // // 联想建议的方法  根据input内容改变而改变
    // async searchChange () {
    //   const searchText = this.searchContent

    //   // 判断不能为空才行
    //   if (!searchText) {
    //     return
    //   }
    //   let { data } = await getSuggestion({ q: searchText })
    //   //   console.log(data)
    //   this.suggestion = data.data.options
    // },

    // 联想建议高亮显示
    highLight (str) {
      // 转小写  通过v-html 用replace把对应的文本替换掉
      return str.toLowerCase().replace(this.searchContent.toLowerCase(), `<span style="color:red">${this.searchContent}</span>`)
    }
  }
}
</script>

<style scoped lang='less'>
    .container{
        padding-top: 54px;
        .SearchForm{
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 1
        }
    }
</style>
