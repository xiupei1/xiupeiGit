<template>
    <div class="hello">
        <h1>{{ msg }}</h1>
        <div>
            <el-upload
                    action="/upload"
                    :on-change="handleFileChange"
            >
                <el-button slot="trigger" size="mini" type="primary">选择文件</el-button>
            </el-upload>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    props: {
        msg: String
    },
    methods: {
        handleFileChange(file) {
            // 使用文件流进行后续操作
            console.log('文件流', file);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
    margin: 40px 0 0;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}</style>
