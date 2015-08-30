<%--
  Created by IntelliJ IDEA.
  User: hhl
  Date: 2015/8/30
  Time: 1:22
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
  <head>
    <title>2121</title>
    <script src="jquery-1.7.2.min.js"></script>
    <script src="jquery-ui-1.10.3.custom.min.js"></script>
    <script src="jquery.iframe-transport.js"></script>
    <script src="jquery.fileupload.js"></script>
        <script type="application/javascript">
            $(document).ready(function() {

                $("#fileupload_input").fileupload({
                    url:"upload",//文件上传地址，当然也可以直接写在input的data-url属性内
                    formData:{param1:"p1",param2:"p2"},//如果需要额外添加参数可以在这里添加
                    done:function(e,result){
                        //done方法就是上传完毕的回调函数，其他回调函数可以自行查看api
                        //注意result要和jquery的ajax的data参数区分，这个对象包含了整个请求信息
                        //返回的数据在result.result中，假设我们服务器返回了一个json对象
                        console.log(JSON.stringify(result.result));
                    }
                })

           });


        </script>
  </head>
  <body>

  <input type="file" name="file" id="fileupload_input" />


  </body>
</html>
