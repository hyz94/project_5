<template>
    <div class="consult">
        <div class="consultForm">
            <h6>我要咨询</h6>
            <div class="cont">
                <textarea class="contBox" cols="30" rows="10" placeholder="您输入的字数不要超过60字"></textarea>
            </div>
            <div class="sub">
                <a class="subButton">提交</a>
            </div>
        </div>

        <ul class="consultList">
            <li>
                <div class="consultQue">问：请问身高180cm，体重100kg，该选什么尺码</div>
                <p class="nameTime">
                    <span>来自：金刚狼</span><span>2018-1-2</span> 
                </p>
                <div class="consultAns">
                    亲爱的客户，您好，根据你的情况，建议您选购XL码的衣服（注：推荐仅供参考），祝您生活愉快
                </div>
            </li>
        </ul>
        

    </div>

</template>

<script>

import './pro_consult.scss'
export default{
    
}
</script>