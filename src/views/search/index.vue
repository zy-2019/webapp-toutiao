<template>
    <div class="container">
        <!-- 搜索栏 -->
        <form action="/" class="SearchForm">
            <van-search
            v-model="searchContent"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch"
            @cancel="$router.back()"
            @focus="isResultShow = false"
            @input="searchChange"
            />
        </form>

          <!-- 搜索结果组件 -->
        <SearchResults v-if="isResultShow"></SearchResults>

            <!-- 联想建议 -->
        <van-cell-group v-else-if="searchContent">
            <van-cell icon="search" v-for="(item,index) in suggestion" :key="index">
                <div slot="title" v-html="highLight(item)">
                    <!-- 高亮显示替换 -->
                </div>
            </van-cell>

            <!-- <van-cell title="单元格" icon="search"/> -->
        </van-cell-group>

        <!-- 历史记录 -->
        <van-cell-group v-else>
            <van-cell title="历史记录">
                <van-icon name="delete"></van-icon>
                <span>全部删除</span>
                &nbsp; &nbsp;
                <span>完成</span>
            </van-cell>
            <van-cell title="单元格" icon="search">
                <van-icon name="close"></van-icon>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import SearchResults from './components/searchResult'
import { getSuggestion } from '../../api/search'
export default {
  data () {
    return {
      searchContent: '', // 搜索内容
      isResultShow: false,
      suggestion: [] // 接收联想建议列表
    }
  },
  components: {
    SearchResults
  },
  methods: {
    onSearch () {
      // 判断输入框是否为空
      if (!this.searchContent) {
        this.$toast('请输入内容搜索')
        return
      }
      this.isResultShow = true
    },

    // 联想建议的方法  根据input内容改变而改变
    async searchChange () {
      const searchText = this.searchContent

      // 判断不能为空才行
      if (!searchText) {
        return
      }
      let { data } = await getSuggestion({ q: searchText })
      //   console.log(data)
      this.suggestion = data.data.options
    },
    // 联想建议高亮显示
    highLight (str) {
      // 转小写  通过v-html 用replace把对应的文本替换掉
      return str.toLowerCase().replace(this.searchContent.toLowerCase(), `<span style="color:red">${this.searchContent}</span>`)
    }

  },
  watch: {

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
