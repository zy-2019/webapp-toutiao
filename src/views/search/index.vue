<template>
    <div class="container">
        <!-- 搜索栏 -->
        <form action="/" class="SearchForm">
            <van-search
            v-model="searchContent"
            placeholder="请输入搜索关键词"
            show-action
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow = false"
            />
        </form>

          <!-- 搜索结果组件 -->
        <SearchResults v-if="isResultShow"></SearchResults>

            <!-- 联想建议 -->
        <van-cell-group v-else-if="searchContent">
            <van-cell title="单元格" icon="search" />
            <van-cell title="单元格" icon="search" />
        </van-cell-group>

        <van-cell-group v-else>
            <!-- 历史记录 -->
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
export default {
  data () {
    return {
      searchContent: '', // 搜索内容
      isResultShow: false
    }
  },
  components: {
    SearchResults
  },
  methods: {
    onSearch () {
      this.isResultShow = true
    },
    onCancel () {
      this.$router.push('/')
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
