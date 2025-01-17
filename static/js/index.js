$(function(){

	$("#upload_file").mousemove(function(){
		$(".ufimg").css({
			"border": "1px solid #FFB700"
		});
	});

	$("#upload_file").mouseout(function(){
		$(".ufimg").css({
			"border": "1px solid transparent"
		});
	});

	var options = {
		success:function(html) {
			handleHTML(html);
		},
		uploadProgress: function(event, position, total, percentComplete) { //on progress
			$(".bar").css("width", percentComplete+"%");
		},
		beforeSubmit: function(arr, $form, options) {
			localStorage.setItem("filesize", $('#upload_file')[0].files[0].size);
			if ($('#upload_file')[0].files.length > 0) {
				// 限制文件大小， 3M =3 * 1024 * 1024
				if($('#upload_file')[0].files[0].size <= 3145728)
				{
					$('#myModal').modal('show');
				}
				else{
					$('#oversize').modal('show');
					return false;
				}
			}
		}
	};

	// ================================
	// 	响应表单提交
	// ================================
	$("#submit").click(function(){
		if(document.getElementById("upload_file").value == null || document.getElementById("upload_file").value == ""){
			$('#nofile').modal('show');
			 return false;
		}
		else{
			$('#myModal').modal('show');
		}
		
	})
	$('#myForm').ajaxForm(options);
	function handleHTML(html){
		console.log(html['session_flag'])
		if(html['session_flag'] == 1){
			window.location.href="outcount";
		}
		else{
			setTimeout(function(){ window.location.href="upload" }, 3000);
		}
	}


	function startRead() {
		var file = document.getElementById('upload_file').files[0];
		if (file != null) {
			return file.size;
		}
		else{
			return 0;
		}
	}

	// 设置主容器最小高度
	$(".continer").css("min-height", $(document.body).height()-165);
})